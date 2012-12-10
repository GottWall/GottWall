#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.app
~~~~~~~~~~~~

Gottwall main loop

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details.
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


from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker


class HTTPApplication(Application):
    """Base application
    """

    def __init__(self, config):
        self.dirty_handlers = [
            (r"/login", LoginHandler),
            (r"/dashboard", DashboardHandler),
            (r"/(?P<project>.+)/api/stats", StatsHandler),
            (r"/(?P<project>.+)/api/metrics", MetricsHandler),
            # Default HTTP backend
            (r"/(?P<project>.+)/api/store", HTTPBackendHandler),
            (r"/", HomeHandler)]

        self.config = config
        self.db = self.configure_db()

        tornado.web.Application.__init__(self, self.dirty_handlers, **config)

    def configure_db(self):
        return None
        engine = create_engine("{ENGINE}://{USER}:{PASSWORD}@{HOST}:{PORT}/{NAME}".\
                                    format(**self.config['DATABASE']), echo=False)
        return scoped_session(sessionmaker(bind=engine))

    def configure_app(self, io_loop=None):
        """Configure application backends and storages
        """
        self.configure_storage(self.config['STORAGE'])
        self.configure_backends(self.config['BACKENDS'], io_loop, self.config)

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

    @staticmethod
    def configure_backends(backends, io_loop, config):
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
            backend.setup_backend(io_loop, config)

        return True


if __name__ == "__main__":

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
    ioloop = tornado.ioloop.IOLoop.instance()

    application.configure_app(ioloop)

    http_server = httpserver.HTTPServer(application)
    http_server.listen(options.port)
    autoreload.start(io_loop=ioloop, check_time=100)
    ioloop.start()
