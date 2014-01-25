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
import json
from base64 import b64decode

import tornado.gen
from tornado.web import HTTPError
from logging import getLogger

from gottwall.backends.base import BaseBackend
from gottwall.handlers import BaseHandler
from gottwall.utils import parse_dict_header
from tornado import httpserver
from tornado.web import Application, URLSpec


logger = getLogger("gottwall.backends.http")


class HTTPBackend(httpserver.HTTPServer, BaseBackend):

    def __init__(self, application, io_loop, config, storage, tasks, *args, **kwargs):
        self.io_loop = io_loop
        self.config = config
        self.storage = storage
        self.tasks = tasks
        self.application = application
        self.working = True
        self.current_in_progress = 0

        super(HTTPBackend, self).__init__(*args, **kwargs)

    @classmethod
    def setup_backend(cls, application, io_loop, config, storage, tasks):
        """Install backend to ioloop

        :param ioloop: :class:`tornadoweb.ioloop.IOLoop` instance
        :param config: :class:`~gottwall.config.Config` instance
        """
        server = cls(application, io_loop, config, storage, tasks)

        port = server.backend_settings.get('PORT', "8890")
        host = server.backend_settings.get('HOST', "127.0.0.1")
        server.listen(str(port), host)
        logger.info("GottWall HTTP transport listen {host}:{port}".format(port=port, host=host))

        return server

    def add_handlers(self, application):
        """Add handlers to application

        :param application: application instance
        """
        dirty_handlers = [
            # Default HTTP backend
            (r"{0}/api/v1/(?P<project>.+)/(?P<action>.+)".format(self.config['PREFIX']),
             HTTPBackendHandler, {"config": application.config, "app": application}, 'api-v1-store')]

        application.add_handlers(".*$", [URLSpec(*x) for x in dirty_handlers])



class HTTPBackendHandler(BaseBackend, BaseHandler):

    def initialize(self, config, app):
        self.config = config
        self.application = app
        self.current_in_progress = 0
        self.working = True

    ## def __init__(self, io_loop, config, storage, *args, **kwargs):
    ##     self.io_loop = io_loop
    ##     self.config = config
    ##     self.storage = storage
    ##     super(HTTPBackend, self).__init__(*args, **kwargs)

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
        self.application.add_task(action, data)

    @tornado.gen.engine
    def post(self, project, action, *args, **kwargs):
        self.storage = self.application.storage

        if not self.validate_project(project):
            raise HTTPError(404, "Invalid project")

        if not self.validate_content_type():
            raise HTTPError(400, "Invalid content type")

        if not self.validate_action(action):
            raise HTTPError(404, "Invalid action")

        if not self.check_auth(project):
            raise HTTPError(403, "Forbidden")

        self.process_data(project, action, self.parse_data(self.request.body, project))

        self.finish("OK")

    def validate_action(self, action):
        return action in ['incr', 'decr']

    def validate_project(self, project):
        """Validate projects name
        """
        return project in self.config['PROJECTS']

    def validate_content_type(self):
        return self.request.headers['content-type'] == 'application/json'

    def check_auth(self, project):
        """Check authorization headers
        """

        header = self.request.headers.get("Authorization", None)
        gottwall_header = self.request.headers.get("X-GottWall-Auth", None)

        if gottwall_header:
            return self.check_gottwall_auth(gottwall_header, project)

        if not header:
            return False

        if header.startswith('Basic '):
            header = header[6:].strip()

        return self.check_basic_auth(header, project)

    def check_basic_auth(self, header, project):
        """Parse basic authorization header

        :param header: authorization header value
        """
        auth_info = header.split(None, 1)

        public_key, private_key = b64decode(auth_info[0]).split(":")

        return self.check_key(private_key, public_key, project)

    def check_gottwall_auth(self, header, project):
        """Check X-GottWall-Auth

        :param header: header string value
        :param project: project name
        """
        if header.startswith('GottWall'):
            header = header[8:]

        params = parse_dict_header(header)
        return self.check_key(params.get('private_key'),
                              params.get('public_key'), project)
