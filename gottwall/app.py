#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.app
~~~~~~~~~~~~

Gottwall main loop

:copyright: (c) 2012 by Alexandr Lispython (alex@obout.ru).
:license: BSD, see LICENSE for more details.
:github: http://github.com/Lispython/gottwall
"""
import imp

import os
import importlib
import os.path
import tornado.ioloop
from tornado.web import Application
from tornado.options import define, options
from tornado import httpserver
from tornado import autoreload
from utils import rel
from config import Config, default_settings

from handlers import BaseHandler, DashboardHandler, LoginHandler, HomeHandler,\
     StatsHandler, MetricsHandler
from backends import HTTPBackend as HTTPBackendHandler

define("port", default=8889, help="run HTTP on the given port", type=int)
define("ssl_port", default=8890, help="run HTTPS on the given port", type=int)
define("config", help="Configuration file", type=str)


class HTTPApplication(Application):
    """Base application
    """

    def __init__(self, config):
        self.dirty_handlers = [
            (r"/login", LoginHandler),
            (r"/dashboard", DashboardHandler),
            (r"/(?P<project>.+)/api/stats", StatsHandler),
            (r"/(?P<project>.+)/api/metrics", MetricsHandler),
            (r"/", HomeHandler)]

        self.config = config

        tornado.web.Application.__init__(self, self.dirty_handlers, **config)


    def configure_app(self):
        """Configure application backends and storages
        """
        self.configure_backends(self.config['BACKENDS'])
        self.configure_storage(self.config['STORAGE'])

    def configure_storage(self, storage_path):
        """Configure data storage by path

        :param storage: storage path
        """
        module_path, name = storage_path.rsplit('.', 1)
        try:
            module = importlib.import_module(module_path, name)
            storage = getattr(module, name)
        except (ImportError, AttributeError), e:
            raise Exception("Invalid storage: {0}".format(e))
        storage.setup(self)

    def configure_backends(self, backends):
        """Configture data receive backends

        :param backends: list of backends
        """

        for backend_path in backends:
            module_path, name = backend_path.rsplit('.', 1)
            try:
                backend_module = importlib.import_module(module_path, name)

                backend = getattr(backend_module, name)
            except (ImportError, AttributeError), e:
                raise Exception("Invalid backend: {0}".format(e))
            backend.setup_backend(self)

        return backend


if __name__ == "__main__":
    tornado.options.parse_command_line()

    default_settings.update(
        dict(
            site_title=u"GottWall - statistics aggregator",
            login_url="/login",
            template_path=os.path.join(os.path.dirname(__file__), "templates"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            xsrf_cookies=False,
            cookie_secret="fkewrlhfwhrfweiurbweuybfrweoubfrowebfioubweoiufbwbeofbowebfbwup2XdTP1o/Vo=",
            autoescape=None))

    default_settings.from_file(options.config)

    application = HTTPApplication(default_settings)
    application.configure_app()

    http_server = httpserver.HTTPServer(application)
    http_server.listen(options.port)
    ioloop = tornado.ioloop.IOLoop.instance()
    autoreload.start(io_loop=ioloop, check_time=100)
    ioloop.start()
