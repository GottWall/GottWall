#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.backends.base
~~~~~~~~~~~~~~~~~~~~~~

Base backends for metric calculation

:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""
import hashlib
import hmac
from base64 import b64decode
from logging import getLogger

import tornado.gen
import tornado.web
from fast_utils.fstring import extract_if_startswith
from gottwall.backends.base import BaseBackend
from gottwall.handlers import SERVER_NAME
from tornado import httpserver, httputil
from tornado.web import HTTPError, URLSpec, RequestHandler, Application
from gottwall.utils import memo_decorator
from fast_utils.cache import memo

logger = getLogger("gottwall.backends.http")


class HTTPBackendApplication(Application):


    def __init__(self, config, aggregator, backend):

        dirty_handlers = [
            # Default HTTP backend
            (r"{0}/api/v1/(?P<project>.+)/(?P<action>.+)".format(config['PREFIX']),
             HTTPBackendHandler,
             {"config": config,
              "app": self,
              "aggregator": aggregator,
             "backend": backend},
            'api-v1-store')]

        tornado.web.Application.__init__(
            self, [URLSpec(*x) for x in dirty_handlers], **config)

class HTTPBackend(httpserver.HTTPServer, BaseBackend):

    def __init__(self, aggregator, io_loop, config, storage, tasks, *args, **kwargs):
        self.io_loop = io_loop
        self.config = config
        self.storage = storage
        self.tasks = tasks
        self.aggregator = aggregator
        self.working = True
        self.current_in_progress = 0
        self.count = 0
        self.web_application = self.get_application()
        self.request_callback = self.web_application

        super(HTTPBackend, self).__init__(self.web_application, *args, **kwargs)

    def get_application(self):
        return HTTPBackendApplication(self.config, self.aggregator, self)

    @classmethod
    def setup_backend(cls, aggregator, io_loop, config, storage, tasks):
        """Install backend to ioloop

        :param ioloop: :class:`tornadoweb.ioloop.IOLoop` instance
        :param config: :class:`~gottwall.config.Config` instance
        """

        server = cls(aggregator, io_loop, config, storage, tasks)

        port = server.backend_settings.get('PORT', "8890")
        host = server.backend_settings.get('HOST', "127.0.0.1")

        server.listen(str(port), host)

        logger.info("GottWall HTTP transport listen {host}:{port}".format(port=port, host=host))
        return server


class HTTPBackendHandler(BaseBackend, RequestHandler):


    def initialize(self, config, app, backend, aggregator):

        self.config = config
        self.application = app
        self.aggregator = aggregator
        self.current_in_progress = 0
        self.working = True
        self.backend = backend

    ## def __init__(self, io_loop, config, storage, *args, **kwargs):
    ##     self.io_loop = io_loop
    ##     self.config = config
    ##     self.storage = storage
    ##     super(HTTPBackend, self).__init__(*args, **kwargs)

    def clear(self):
        """Resets all headers and content for this response."""
        self._headers = httputil.HTTPHeaders({
            "Server": SERVER_NAME})
        self.set_default_headers()
        if (not self.request.supports_http_1_1() and
            getattr(self.request, 'connection', None) and
                not self.request.connection.no_keep_alive):
            conn_header = self.request.headers.get("Connection")
            if conn_header and (conn_header.lower() == "keep-alive"):
                self._headers["Connection"] = "Keep-Alive"
        self._write_buffer = []
        self._status_code = 200
        self._reason = httputil.responses[200]

    def light_flush(self, callback=None):
        """Flushes the current output buffer to the network.

        The ``callback`` argument, if given, can be used for flow control:
        it will be run when all flushed data has been written to the socket.
        Note that only one flush callback can be outstanding at a time;
        if another flush occurs before the previous flush's callback
        has been run, the previous callback will be discarded.
        """
        self._write_buffer = []
        if not self._headers_written:
            self._headers_written = True
            # No need to apply any transforms
            headers = self._generate_headers()
        else:
            headers = b""

        if self.request.method == "HEAD" and headers:
            self.request.write(headers, callback=callback)
        else:
            self.request.write(headers + "OK", callback=callback)


    def light_finish(self):
        """Finishes this response, ending the HTTP request."""
        if self._finished:
            raise RuntimeError("finish() called twice.  May be caused "
                               "by using async operations without the "
                               "@asynchronous decorator.")

        if self.request.method != "HEAD":
            self.set_header("Content-Length", 2)

        if hasattr(self.request, "connection"):
            # Now that the request is finished, clear the callback we
            # set on the HTTPConnection (which would otherwise prevent the
            # garbage collection of the RequestHandler when there
            # are keepalive connections
            self.request.connection.set_close_callback(None)

        self.light_flush()
        self.request.finish()
        self._log()
        self._finished = True
        self.on_finish()
        # Break up a reference cycle between this handler and the
        # _ui_module closures to allow for faster GC on CPython.
        self.ui = None

    @staticmethod
    def merge_handlers(app):
        """Merge hosts handlers in application handler
        """
        hosts = {}
        handlers = app.handlers
        for host, patterns in handlers:
            if host not in hosts.keys():
                hosts[host] = []
            hosts[host] += patterns
        app.handlers = [(host, patterns) for host, patterns in hosts.items()]

    def process_data(self, project, action, data, callback=None):
        """Process `data`
        """
        self.aggregator.add_task(self.aggregator.process_data, project, action, data, callback)

    @tornado.web.asynchronous
    def post(self, project, action, *args, **kwargs):
        self.storage = self.aggregator.storage

        if not self.validate_project(project):
            raise HTTPError(404, "Invalid project")

        if not self.validate_action(action):
            raise HTTPError(404, "Invalid action")

        if not self.check_auth(project):
            raise HTTPError(403, "Forbidden")

        self.backend.count += 1

        self.process_data(project, action, self.parse_data(self.request.body, project))

        self.light_finish()

    def validate_action(self, action):
        return action in ['incr', 'decr']

    def validate_project(self, project):
        """Validate projects name
        """
        return project in self.config['PROJECTS']

    def check_auth(self, project):
        """Check authorization headers

        :param project: project name
        """

        gottwall_header = self.request.headers.get("X-GottWall-Auth", None)

        if gottwall_header:
            return self.check_gottwall_auth(gottwall_header, project)

        header = self.request.headers.get("Authorization", None)

        if header:
            return self.check_basic_auth(header, project)

        return False

    def check_basic_auth(self, header, project):
        """Parse basic authorization header

        :param header: authorization header value
        """
        header = extract_if_startswith(header, "Basic")

        if not header:
            return False

        public_key, private_key = b64decode(header.strip()).split(":")
        return self.check_key(private_key, public_key, project)

    def check_gottwall_auth(self, header, project):
        """Check X-GottWall-Auth

        :param header: header string value
        :param project: project name
        """

        header = extract_if_startswith(header, "GottWallS1")
        if not header:
            return False

        ts, sign, base = header.split()
        return self.check_sign(project, sign, ts, base)

    def check_sign(self, project, sign, ts, base):
        private_key = self.config['SECRET_KEY']

        return sign == self.aggregator.cache(self.get_hash,
            private_key, self.get_sign_msg(project, ts, base))

    def get_sign_solt(self, ts, base):
        return int(round(ts / base) * base)

    def get_sign_msg(self, project, ts, base):
        return str(self.config['PROJECTS'][project]) + str(self.get_sign_solt(int(ts), int(base)))

    def get_hash(self, private_key, sign_msg):
        return hmac.new(key=private_key, msg=sign_msg,
                        digestmod=hashlib.md5).hexdigest()
