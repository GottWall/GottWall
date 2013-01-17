#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall.tests.app
~~~~~~~~~~~~~~~~~~

Application test case

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/Lispython/gottwall
"""
import datetime

import tornado.ioloop

import gottwall.default_config
from base import AsyncBaseTestCase
from gottwall.config import Config
from gottwall.aggregator import AggregatorApplication
from gottwall.processing import PeriodicProcessor
from utils import async_test


class ProcessorTestCase(AsyncBaseTestCase):

    def get_app(self):
        config = Config()
        config.from_module(gottwall.default_config)
        config.update({"TASKS_CHUNK": 15})
        app = AggregatorApplication(config)
        app.configure_app(tornado.ioloop.IOLoop().instance())
        return app

    def get_message(self, i):
        return ("bucket",
                {"name": "processor_metric_{0}".format(i),
                 "timestamp": datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S"),
                 "filters": {"filter_name1": "flter_value1"},
                 "action": "incr",
                 "value": 2,
                 "project": "test_processor_project"})

    @async_test
    @tornado.gen.engine
    def test_process(self):
        app = self.get_app()
        processor = app.data_processor

        self.assertTrue(isinstance(processor, PeriodicProcessor))
        self.assertEquals(processor._deque_chunk_len, 15)

        # Add messages
        for x in xrange(20):
            app.tasks.append(self.get_message(x))

        self.assertEquals(len(app.tasks), 20)

        processor.callback()

        self.assertEquals(len(app.tasks), 5)

        processor.callback()

        self.assertEquals(len(app.tasks), 0)

        self.stop()

        for x in xrange(20):
            self.assertTrue("processor_metric_{0}".format(x) in
                            app.storage._store["test_processor_project"])
