#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall.processing
~~~~~~~~~~~~~~~~~~~

GottWall dataprocessing

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/Lispython/GottWall
"""

from collections import deque
import tornado.ioloop

from gottwall.settings import PERIODIC_PROCESSOR_TIME, TASKS_CHUNK
from gottwall.log import logger

def process_bucket(processor, app, data, callback=None):
    """Process bucket
    :param processor: :class:`gottwall.processing.PeriodicProcessor` instance
    :param app: :class:`tornado.web.Application` instance
    :param data: bucket data dict
    :param callback: success callback
    """

    result = app.storage.incr(data.pop('project'), **data)
    return result


TASK_TYPES = {"bucket": process_bucket}


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

    def callback(self):
        """Periodic processor callback

        :param application: application instance
        """
        logger.info("Periodic processor callback")
        try:
            i = 0
            while i < self._deque_chunk_len:
                task_type, data = self.application.tasks.pop()
                self.process_task(task_type, data)
                i += 1
        except IndexError:
            pass
        except Exception, e:
            logger.error(e)

    def process_task(self, task_type, data):
        f = TASK_TYPES.get(task_type, None)

        if f:
            return f(self, self.application, data)
        logger.error("Invalid task type: {0}".format(task_type))


class RedisBackendPeriodicProcessor(PeriodicProcessor):

    def __init__(self, backend, callback_time=None, io_loop=None,
                 tasks_chunk=None, config={}):
        self.backend = backend
        self.config = config
        self.callback_time = int(callback_time or self.backend.backend_settings.get('PERIODIC_PROCESSOR_TIME', None) or \
                                 config.get('PERIODIC_PROCESSOR_TIME', PERIODIC_PROCESSOR_TIME))
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
