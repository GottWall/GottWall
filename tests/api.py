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

import gottwall.default_config
from base import AsyncHTTPBaseTestCase
from gottwall.app import HTTPApplication
from gottwall.config import Config
from gottwall.utils import MagicDict
from gottwall.handlers import BaseHandler


BaseHandler.get_current_user = lambda s: "Test user"


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
        response = self.fetch("/gottwall/api/v1/test_project/stats?from_date=2012-01-20&to_date=2012-12-31&period=month",
                              method="GET")

        self.assertEquals(response.code, 400)
        self.assertTrue('You need specify name and period' in response.body)

        response = self.fetch("/gottwall/api/v1/test_project/stats?from_date=2012-01&to_date=2012-12-31&period={0}&name=metric_name".format(x),
                              method="GET")

        self.assertEquals(response.code, 400)
        self.assertTrue("Invalid date range" in response.body)

        for x in ['month', 'day', 'year']:
            response = self.fetch("/gottwall/api/v1/test_project/stats?from_date=2012-01-20&to_date=2013-12-31&period={0}&name=metric_name".format(x),
                              method="GET")

            self.assertEquals(response.code, 200)

            response_data = json.loads(response.body)
            self.assertTrue(isinstance(response_data['range'], (list, tuple)))
            self.assertTrue(100 in [x[1] for x in response_data['range']])


    def test_metrics(self):
        storage = self.app.storage

        storage._metrics = {}
        storage._store = MagicDict()

        filters = {"filter1": "value",
                   "filter2": ["value1", "value2", "value2"]}


        storage.save_metric_meta("test_project", "metric_name",
                                 filters=filters)

        # Get statistics by weeks
        response = self.fetch("/gottwall/api/v1/test_project/metrics",
                              method="GET")

        response_data = json.loads(response.body)

        self.assertEquals(response_data,
                          {"metric_name": {"filter1": [filters['filter1']],
                                           "filter2": ["value1", "value2"]}})
        self.assertEquals(response.code, 200)

