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

from processing import PeriodicProcessor, Tasks, StatusPeriodicCallback
from utils import pretty_timedelta, Cache

## from sqlalchemy import create_engine
## from sqlalchemy.orm import scoped_session, sessionmaker

logger = getLogger()


class AggregatorApplication(object):
    """Base application
    """

    def __init__(self, config):
        self.config = config
        self.data_processor = None
        self.status_processor = None
        self.tasks = Tasks()
        self.backends = []
        self.start_time = time.time()
        self.cache = Cache()


    def configure_app(self, io_loop=None):
        """Configure application backends and storages
        """
        storage = self.configure_storage(self.config['STORAGE'])

        self.configure_backends(self.config['BACKENDS'], io_loop, self.config,
                                storage, self.tasks)

        # Add periodic processing
        self.data_processor = PeriodicProcessor(self, io_loop=io_loop)
        self.data_processor.start()

        self.status_processor = StatusPeriodicCallback(self, io_loop=io_loop)
        self.status_processor.start()

    def add_task(self, f, *args, **kwargs):
        """Add new task to tasks deque

        :param task_type: task type (incr, decr)
        :param data: (type parameters)
        """

        self.tasks.append((f, args, kwargs))

    def summary(self):
        logger.info("Aggregator running {0}".format(pretty_timedelta(time.time() - self.start_time)))

        for backend in self.backends:
            backend.log_backend_status()

        self.data_processor.summary()
        self.storage.get_status()


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

        if not backends:
            raise Exception("Need configure one ore more transport backends")

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
        logger.info("Stoping...")
        for backend in self.backends:
            backend.shutdown()

    def check_ready_to_stop(self):
        """Check that all backends flush data
        """
        io_loop = tornado.ioloop.IOLoop.instance()

        for backend in self.backends:
            if backend.ready_to_stop():
                logger.info("{0} ready to stop".format(backend))
                backend.shutdown()

            logger.info("Backend {0} has {1} tasks in progress".format(repr(backend), backend.current_in_progress))

        if self.tasks:
            logger.warning("Not all tasks completed: {0}".format(len(self.tasks)))
            self.data_processor.callback()

            io_loop.add_timeout(time.time() + 0.01, self.check_ready_to_stop)

            return False

        if all([backend.is_down for backend in self.backends]) and not self.tasks:
            logger.info("All backends and tasks ready to stop")
            self.summary()
            io_loop.add_timeout(time.time() + 0.1, io_loop.stop)
            return True


    def process_data(self, project, action, data, callback=None):
        """Process `data`
        """
        res = False

        if action not in ['incr', 'decr']:
            res = False
        else:
            pass
            #res = (yield gen.Task(getattr(self.storage, action), project, *data[1:]))

        if callback:
            callback(res)


    def log_request(self, handler):
        if self.config.get('LOG_REQUEST', True):
            super(AggregatorApplication, self).log_request(handler)
