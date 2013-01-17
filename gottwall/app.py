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
import importlib

import tornado.ioloop
from jinja2 import Environment, FileSystemLoader
from tornado.web import Application, URLSpec

from handlers import DashboardHandler, LoginHandler, HomeHandler,\
     StatsHandler, MetricsHandler, LogoutHandler
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
            (r"{0}/(?P<project>.+)/api/stats".format(self.config['PREFIX']), StatsHandler, params, 'api-stats'),
            (r"{0}/(?P<project>.+)/api/metrics".format(self.config['PREFIX']), MetricsHandler, params, 'api-metrics'),
            (r"{0}/".format(self.config['PREFIX']), HomeHandler, params, 'home')]

        config['login_url'] = config['PREFIX'] + config['login_url']

        tornado.web.Application.__init__(
            self, [URLSpec(*x) for x in self.dirty_handlers], **config)

    def configure_env(self):
        """Configure template env
        """
        searchpath = list(self.config.get("TEMPLATES_PATH", 'templates'))

        env = Environment(loader=FileSystemLoader(searchpath),
                          auto_reload=self.config.get('TEMPLATE_DEBUG', False),
                          cache_size=self.config.get('JINJA2_CACHE_SIZE', 50),
                          extensions=self.config.get('JINJA2_EXTENSIONS', ()))
        filters = self.config.get('JINJA2_FILTERS', ())
        globals = self.config.get('JINJA2_GLOBALS', ())

        env.filters.update(load_filters(filters))
        env.globals.update(load_globals(globals))

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
