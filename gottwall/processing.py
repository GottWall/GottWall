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

from gottwall.settings import PERIODIC_PROCESSOR_TIME, TASKS_CHUNK, STATUS_PROCESSOR_TIME
from gottwall.log import logger


@gen.engine
def process_bucket(processor, app, action, data, callback=None):
    """Process bucket
    :param processor: :class:`gottwall.processing.PeriodicProcessor` instance
    :param app: :class:`tornado.web.Application` instance
    :param data: bucket data dict
    :param callback: success callback
    """
    result = (yield Task(app.process_data, data[0], action, data))

    if callback:
        callback(result)


class StatusPeriodicCallback(tornado.ioloop.PeriodicCallback):
    def __init__(self, app, callback_time=None, io_loop=None):
        self.application = app
        self.callback_time = app.config.get("STATUS_PROCESSOR_TIME", STATUS_PROCESSOR_TIME)
        self.io_loop = io_loop or tornado.ioloop.IOLoop.instance()

        logger.debug("{0} configured with STATUS_PROCESSOR_TIME={1} ms".format(
            self.__class__.__name__, self.callback_time))

    def _run(self):
        if not self._running:
            return
        try:
            self.callback()
        except Exception:
            logger.error("Error in periodic callback", exc_info=True)
        self._schedule_next()

    def callback(self):
        self.application.summary()


## class PeriodicStreamReadProcessor(tornado.ioloop.PeriodicCallback):


##     def __init__(self, app, backend, callback_time=None, io_loop=None):
##         self.application = app
##         self.callback_time = callback_time
##         self.backend = backend
##         self.io_loop = io_loop or tornado.ioloop.IOLoop.instance()

##         logger.debug("{0} configured with STATUS_PROCESSOR_TIME={1} ms".format(
##             self.__class__.__name__, self.callback_time))


##     def _run(self):
##         if not self._running:
##             return
##         try:
##             self.callback()
##         except Exception:
##             logger.error("Error in periodic callback", exc_info=True)
##         self._schedule_next()


##     def callback(self):
##         for i, conn in self.backend.connections.items():
##             if conn.closed():
##                 self.backend.remove_connection(conn)
##             print("Read from {0}".format(conn.stream))
##             conn.read_until()


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
        logger.debug("{0} configured with PERIODIC_PROCESSOR_TIME={1} ms | TASKS_CHUNK={2}".format(
            self.__class__.__name__, self.callback_time, self._deque_chunk_len))
        self._total_processed = 0
        self._start_time = self.io_loop.time()


    def _run(self):
        if not self._running:
            return
        try:
            self.callback()
        except Exception:
            logger.error("Error in periodic status callback", exc_info=True)
        self._schedule_next()

    def callback(self):
        """Periodic processor callback

        :param application: application instance
        """
        if self.application.tasks.length <= 0:
            return

        try:
            i = 0
            while i < self._deque_chunk_len and self.application.tasks.length > 0:
                f, args, kwargs = self.application.tasks.pop()

                if f:
                    f(*args, **kwargs)

                i += 1
        except Exception as e:
            self.io_loop.handle_callback_exception(self.callback)
            #logger.error(e)

        self._total_processed += i


    def summary(self):
        logger.info("{0} processed:[{1}] in_queue:[{2}]".format(self.__class__.__name__, self._total_processed,
                                                                 self.application.tasks.length))
        return {"processed": self._total_processed,
                "in_queue": self.application.tasks.length}


class Tasks(deque):
    """Custom wrapper for deque
    """

    def __init__(self, *args, **kwargs):
        self.length = 0

    def append(self, *args, **kwargs):
        super(Tasks, self).append(*args, **kwargs)
        self.length += 1

    def pop(self, *args, **kwargs):
        r = super(Tasks, self).pop(*args, **kwargs)
        self.length -= 1
        return r
