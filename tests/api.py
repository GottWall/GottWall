#!/usr/bin/env python
# -*- coding:  utf-8 -*-
"""
gottwall.tests.api
~~~~~~~~~~~~~~~~~~

Unittests for gottwall api

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
"""

import datetime
import json

from tornado.web import Application, RequestHandler

from gottwall.app import HTTPApplication
from gottwall.config import Config, default_settings
import gottwall.default_config
from base import BaseTestCase, AsyncHTTPBaseTestCase
from gottwall.utils import MagicDict


class APITestCase(AsyncHTTPBaseTestCase):

    def get_app(self):
        config = Config()
        config.from_module(gottwall.default_config)

        config.update({"BACKENDS": []})

        self.app = HTTPApplication(config)
        self.app.configure_app(self.io_loop)
        return self.app

    def test_stats(self):
        storage = self.app.storage
        storage._metrics = {}
        storage._store = MagicDict()

        project_name = "test_project"
        timestamp = datetime.datetime(2012, 12, 21)

        for x in xrange(100):
            storage.incr(project_name, "metric_name",
                         timestamp, filters={"filter1": True,
                                             "filter2": ["web", "iphone", "android"]})


        # Get statistics by weeks
        response = self.fetch("/gottwall/test_project/api/stats?from_date=2012-01-20&to_date=2012-12-31&period=week",
                              method="GET")

        self.assertEquals(response.code, 400)
        self.assertTrue('You need specify name and period' in response.body)

        response = self.fetch("/gottwall/test_project/api/stats?from_date=2012-01&to_date=2012-12-31&period={0}&name=metric_name".format(x),
                              method="GET")

        self.assertEquals(response.code, 400)
        self.assertTrue("Invalid date range params" in response.body)

        for x in ['month', 'day', 'year', 'week', 'minute', 'all']:
            response = self.fetch("/gottwall/test_project/api/stats?from_date=2011-01-20&to_date=2013-12-31&period={0}&name=metric_name".format(x),
                              method="GET")
            self.assertEquals(response.code, 200)

            response_data = json.loads(response.body)
            self.assertTrue(isinstance(response_data['range'], (list, tuple)))
            self.assertEquals(response_data['range'][0][1], 100)


    def test_metrics(self):
        storage = self.app.storage

        storage._metrics = {}
        storage._store = MagicDict()

        filters = {"filter1": "value",
                   "filter2": ["value1", "value2", "value2"]}


        storage.save_metric_meta("test_project", "metric_name",
                                 filters=filters)

        # Get statistics by weeks
        response = self.fetch("/gottwall/test_project/api/metrics",
                              method="GET")

        response_data = json.loads(response.body)

        self.assertEquals(response_data,
                          {"metric_name": {"filter1": [filters['filter1']],
                                           "filter2": ["value1", "value2"]}})
        self.assertEquals(response.code, 200)

