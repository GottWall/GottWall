#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.app
~~~~~~~~~~~~

Gottwall main loop

:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""
import importlib

import tornado.ioloop
from jinja2 import Environment, FileSystemLoader
from tornado.web import Application, URLSpec

from handlers import DashboardHandler, LoginHandler, HomeHandler,\
     NotFoundHandler, LogoutHandler
from api_v1 import (StatsHandlerV1, MetricsHandlerV1, StatsDataSetHandlerV1,
                    HTMLEmbeddedHandlerV1, JSONEmbeddedHandlerV1,
                    JSEmbeddedHandlerV1, EmbeddedCreateHandlerV1)
from jinja_utils import load_filters, load_globals
from processing import Tasks


## from sqlalchemy import create_engine
## from sqlalchemy.orm import scoped_session, sessionmaker


class HTTPApplication(Application):
    """Base application
    """

    def __init__(self, config):
        self.config = config
        self.db = self.configure_db()
        self.jinja_env = self.configure_env()
        self.data_processor = None
        self.tasks = Tasks()

        params = {"config": self.config,
                  "db": self.db,
                  "env": self.jinja_env}

        self.dirty_handlers = [
            (r"{0}/login".format(self.config['PREFIX']), LoginHandler, params, 'login'),
            (r"{0}/logout".format(self.config['PREFIX']), LogoutHandler, params, 'logout'),
            (r"{0}/dashboard".format(self.config['PREFIX']), DashboardHandler, params, 'dashboard'),
            (r"{0}/api/v1/(?P<project>.+)/stats".format(self.config['PREFIX']),
             StatsHandlerV1, params, 'api-v1-stats'),
            (r"{0}/api/v1/(?P<project>.+)/stats_dataset".format(self.config['PREFIX']),
             StatsDataSetHandlerV1, params, 'api-v1-stats-dataset'),
            (r"{0}/api/v1/(?P<project>.+)/metrics".format(self.config['PREFIX']),
             MetricsHandlerV1, params, 'api-v1-metrics'),
            (r"{0}/api/v1/(?P<project>.+)/embedded/".format(self.config['PREFIX']),
             EmbeddedCreateHandlerV1, params, 'api-v1-embedded-create'),
            (r"{0}/api/v1/embedded/(?P<uid>.+).html".format(self.config['PREFIX']),
             HTMLEmbeddedHandlerV1, params, 'api-v1-html-embedded'),
            (r"{0}/api/v1/embedded/(?P<uid>.+).json".format(self.config['PREFIX']),
             JSONEmbeddedHandlerV1, params, 'api-v1-json-embedded'),
            (r"{0}/api/v1/embedded/(?P<uid>.+).js".format(self.config['PREFIX']),
             JSEmbeddedHandlerV1, params, 'api-v1-js-embedded'),
            (r"{0}/".format(self.config['PREFIX']), HomeHandler, params, 'home'),
            (r"{0}.*".format(self.config['PREFIX']), NotFoundHandler, params, 'not_found'),
            ]

        config['login_url'] = config['PREFIX'] + config['login_url']

        tornado.web.Application.__init__(
            self, [URLSpec(*x) for x in self.dirty_handlers], **config)

    def configure_env(self):
        """Configure template env
        """
        searchpath = list(self.config.get("TEMPLATES_PATH", 'templates'))

        env = Environment(loader=FileSystemLoader(searchpath),
                          auto_reload=self.config.get('TEMPLATE_DEBUG_RELOAD', False),
                          cache_size=self.config.get('JINJA2_CACHE_SIZE', 50),
                          extensions=self.config.get('JINJA2_EXTENSIONS', ()))
        filters = self.config.get('JINJA2_FILTERS', ())
        globals = self.config.get('JINJA2_GLOBALS', ())

        env.filters.update(load_filters(filters))
        env.globals.update(load_globals(globals))

        try:
            env.install_gettext_translations()
        except Exception:
            env.install_null_translations()

        return env

    def configure_db(self):
        return None
        # engine = create_engine("{ENGINE}://{USER}:{PASSWORD}@{HOST}:{PORT}/{NAME}".\
        #                             format(**self.config['DATABASE']), echo=False)
        # return scoped_session(sessionmaker(bind=engine))

    def configure_app(self, io_loop=None):
        """Configure application backends and storages
        """
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
        return storage.setup(self)
