#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.aggregator
~~~~~~~~~~~~~~~~~~~

Gottwall main loop

:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""
import importlib
import time
from logging import getLogger

import tornado.ioloop
from tornado import gen
from tornado.web import Application, URLSpec

from backends import HTTPBackend as HTTPBackendHandler
from processing import PeriodicProcessor, Tasks, StatusPeriodicCallback


## from sqlalchemy import create_engine
## from sqlalchemy.orm import scoped_session, sessionmaker

logger = getLogger()


class AggregatorApplication(Application):
    """Base application
    """

    def __init__(self, config):
        self.config = config
        self.data_processor = None
        self.status_processor = None
        self.tasks = Tasks()
        self.backends = []

        params = {"config": self.config,
                  "app": self}

        self.dirty_handlers = [
            # Default HTTP backend
            (r"{0}/api/v1/(?P<project>.+)/(?P<action>.+)".format(self.config['PREFIX']),
             HTTPBackendHandler, params, 'api-v1-store')]

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

        self.status_processor = StatusPeriodicCallback(self, self.get_status, io_loop=io_loop)
        self.status_processor.start()

    def get_status(self):
        logger.info("{0} tasks".format(len(self.tasks)))
        self.storage.get_status()

        for backend in self.backends:
            backend.get_backend_status()

    def add_task(self, task_type, data):
        """Add new task to tasks deque
        :param task_type: task type (incr, decr)
        :param data: (type parameters)
        """
        self.tasks.append((task_type, data))


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

    def configure_backends(self, backends, io_loop, config, storage, tasks):
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
            self.backends.append(backend.setup_backend(self, io_loop, config, storage, tasks))

        return True

    def shutdown(self):
        """Shutdown application
        """
        for backend in self.backends:
            backend.shutdown()

    def check_ready_to_stop(self, callback=None):
        """Check that all backends flush data
        """
        io_loop = tornado.ioloop.IOLoop.instance()

        if all([backend.ready_to_stop() for backend in self.backends]) and not self.tasks:
            logger.info("All backends ready to stop")
            io_loop.add_timeout(time.time() + 2, io_loop.stop)
            return True

        logger.info("Not all backend ready to stop, tasks in progress {0}".format(len(self.tasks)))
        for backend in self.backends:
            logger.info("Backend {0} has {1} tasks in progress".format(repr(backend), backend.current_in_progress))

        io_loop.add_timeout(time.time() + 2, self.check_ready_to_stop)

    @gen.engine
    def process_data(self, project, action, data, callback=None):
        """Process `data`
        """
        res = False

        if action not in ['incr', 'decr']:
            res = False
        else:
            res = (yield gen.Task(getattr(self.storage, action), project, *data[1:]))

        if callback:
            callback(res)
