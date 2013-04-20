#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall.tests.app
~~~~~~~~~~~~~~~~~~

Application test case

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""
import time
import datetime
import tornado.ioloop

import gottwall.default_config
from gottwall.config import Config
from gottwall.aggregator import AggregatorApplication
from gottwall.processing import PeriodicProcessor
from utils import async_test
from base import AsyncBaseTestCase


class ProcessorTestCase(AsyncBaseTestCase):

    def get_app(self):
        config = Config()
        config.from_module(gottwall.default_config)
        config.update({"TASKS_CHUNK": 15})
        app = AggregatorApplication(config)
        app.configure_app(tornado.ioloop.IOLoop().instance())
        return app

    def get_message(self, i):
        return ("incr",
                ("test_processor_project", # project name
                 "processor_metric_{0}".format(i), # metric name
                 int(time.mktime(datetime.datetime.utcnow().timetuple())), # timestatmp
                 2, # increment value
                 (("filter_name1", "flter_value1"),), # filters
                 ))

    @async_test
    @tornado.gen.engine
    def test_process(self):
        app = self.get_app()
        processor = app.data_processor

        self.assertTrue(isinstance(processor, PeriodicProcessor))
        self.assertEquals(processor._deque_chunk_len, 15)

        # Add messages
        for x in xrange(20):
            app.add_task(*self.get_message(x))

        self.assertEquals(len(app.tasks), 20)

        processor.callback()

        self.assertEquals(len(app.tasks), 5)

        processor.callback()

        self.assertEquals(len(app.tasks), 0)

        self.stop()

        for x in xrange(20):
            self.assertTrue("processor_metric_{0}".format(x) in
                            app.storage._store["test_processor_project"])
