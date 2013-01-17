#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.aggregator
~~~~~~~~~~~~~~~~~~~

Gottwall main loop

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/gottwall/gottwall
"""
import importlib

import tornado.ioloop
from tornado.web import Application, URLSpec

from backends import HTTPBackend as HTTPBackendHandler
from processing import PeriodicProcessor, Tasks


## from sqlalchemy import create_engine
## from sqlalchemy.orm import scoped_session, sessionmaker


class AggregatorApplication(Application):
    """Base application
    """

    def __init__(self, config):
        self.config = config
        self.data_processor = None
        self.tasks = Tasks()

        params = {"config": self.config}

        self.dirty_handlers = [
            # Default HTTP backend
            (r"{0}/(?P<project>.+)/api/store".format(self.config['PREFIX']),
             HTTPBackendHandler, params, 'store')]

        tornado.web.Application.__init__(
            self, [URLSpec(*x) for x in self.dirty_handlers], **config)

    def configure_app(self, io_loop=None):
        """Configure application backends and storages
        """
        storage = self.configure_storage(self.config['STORAGE'])
        self.configure_backends(self.config['BACKENDS'], io_loop, self.config,
                                storage, self.tasks)

        # Add periodic processing
        self.data_processor = PeriodicProcessor(self, io_loop=io_loop)
        self.data_processor.start()

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

    @staticmethod
    def configure_backends(backends, io_loop, config, storage, tasks):
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
            backend.setup_backend(io_loop, config, storage, tasks)

        return True
