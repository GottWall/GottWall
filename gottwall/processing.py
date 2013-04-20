#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall.processing
~~~~~~~~~~~~~~~~~~~

GottWall dataprocessing

:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""

from collections import deque
import tornado.ioloop
from tornado.gen import Task
from tornado import gen

from gottwall.settings import PERIODIC_PROCESSOR_TIME, TASKS_CHUNK
from gottwall.log import logger

@gen.engine
def process_bucket(processor, app, action, data, callback=None):
    """Process bucket
    :param processor: :class:`gottwall.processing.PeriodicProcessor` instance
    :param app: :class:`tornado.web.Application` instance
    :param data: bucket data dict
    :param callback: success callback
    """

    method = getattr(app.storage, action, None)
    if not method:
        callback(False)

    result = (yield Task(method, *data))

    if callback:
        callback(result)


TASK_TYPES = {"incr": process_bucket,
              "decr": process_bucket}


class PeriodicProcessor(tornado.ioloop.PeriodicCallback):
    """Periodic data processing
    """

    def __init__(self, app, callback_time=None, io_loop=None, tasks_chunk=None):
        self.application = app
        self.callback_time = callback_time or \
                             app.config.get('PERIODIC_PROCESSOR_TIME', PERIODIC_PROCESSOR_TIME)
        self.io_loop = io_loop or tornado.ioloop.IOLoop.instance()
        self._running = False
        self._timeout = None
        self._deque_chunk_len = app.config.get('TASKS_CHUNK', TASKS_CHUNK)


    def _run(self):
        if not self._running:
            return
        try:
            self.callback()
        except Exception:
            logger.error("Error in periodic callback", exc_info=True)
        self._schedule_next()

    @gen.engine
    def callback(self):
        """Periodic processor callback

        :param application: application instance
        """
        logger.info("Periodic processor callback")
        try:
            i = 0
            while i < self._deque_chunk_len:
                task_type, data = self.application.tasks.pop()
                f = TASK_TYPES.get(task_type, None)

                if not f:
                    continue

                (yield Task(f, self, self.application, task_type, data))
                i += 1
        except IndexError, e:
            logger.error(e)
        except Exception, e:
            logger.error(e)


class RedisBackendPeriodicProcessor(PeriodicProcessor):

    def __init__(self, backend, callback_time=None, io_loop=None,
                 tasks_chunk=None, config={}):
        self.backend = backend
        self.config = config
        self.callback_time = int(float(callback_time or self.backend.backend_settings.get('PERIODIC_PROCESSOR_TIME', None) or \
                                 config.get('PERIODIC_PROCESSOR_TIME', PERIODIC_PROCESSOR_TIME)))
        self.io_loop = io_loop or tornado.ioloop.IOLoop.instance()
        self._running = False
        self._timeout = None

    def callback(self):
        """Periodic processor callback

        :param application: application instance
        """
        for project in self.config['PROJECTS'].keys():
            self.backend.load_buckets(project)

class Tasks(deque):
    """Custom wrapper for deque
    """
