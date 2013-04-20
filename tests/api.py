#!/usr/bin/env python
# -*- coding:  utf-8 -*-
"""
gottwall.tests.api
~~~~~~~~~~~~~~~~~~

Unittests for gottwall api

:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""
import datetime
import json

from dateutil.relativedelta import relativedelta

import gottwall.default_config
from base import AsyncHTTPBaseTestCase
from gottwall.app import HTTPApplication
from gottwall.config import Config
from gottwall.handlers import BaseHandler
from gottwall.settings import PERIODS
from gottwall.utils import MagicDict


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
        metric_name = "test_stats_metric_name"
        now = datetime.datetime.now()
        from_date = now - relativedelta(years=3)
        to_date = now + relativedelta(years=1)

        data = self.build_data(from_date, to_date,
                               project_name, metric_name,
                               filters={"filter1": True,
                                        "filter2": ["web", "iphone", "android"]})

        for x in data:
            storage.incr(project=x['project'], name=x['name'], timestamp=x['timestamp'],
                         filters={x['filter_name']: x['filter_value']}, value=x['value'])

        # Get statistics by weeks
        for period in PERIODS:
            response = self.fetch("/gottwall/api/v1/{0}/stats?from_date={1}&to_date={2}&period={3}".format(
                project_name, from_date.strftime("%Y-%m-%d"), to_date.strftime("%Y-%m-%d"), period),
                                  method="GET")

            self.assertEquals(response.code, 400)
            self.assertTrue('You need specify name and period' in response.body)

        response = self.fetch("/gottwall/api/v1/{0}/stats?from_date={1}&to_date={2}&period={3}&name={4}".format(
            project_name, to_date.strftime("%Y-%m-%d"), from_date.strftime("%Y-%m-%d"), period, metric_name),
                              method="GET")

        self.assertEquals(response.code, 400)
        self.assertTrue("Invalid date range" in response.body)


        for period in ['month', 'year', "day", "week", "hour", "minute"]:
            response = self.fetch("/gottwall/api/v1/{0}/stats?from_date={1}&to_date={2}&period={3}&name={4}".format(
                project_name, from_date.strftime("%Y-%m-%d"), to_date.strftime("%Y-%m-%d"), period, metric_name),
                              method="GET")
            self.assertEquals(response.code, 200)

            response_data = json.loads(response.body)

            self.assertTrue('avg' in response_data)
            self.assertEquals(response_data['filter_name'], None)
            self.assertEquals(response_data['filter_value'], None)
            self.assertTrue('max' in response_data)
            self.assertTrue('min' in response_data)
            self.assertEquals(response_data['name'], metric_name)
            self.assertEquals(response_data['period'], period)
            self.assertEquals(response_data['project'], project_name)
            self.assertTrue(isinstance(response_data['range'], list))


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
        self.assertEquals(response.code, 200)

        response_data = json.loads(response.body)

        self.assertEquals(response_data,
                          {"metric_name": {"filter1": [filters['filter1']],
                                           "filter2": ["value1", "value2"]}})


    def test_stats_dataset(self):
        storage = self.app.storage
        storage._metrics = {}
        storage._store =  MagicDict()


        project_name = "test_project"
        metric_name = "test_stats_metric_name"
        now = datetime.datetime.now()
        from_date = now - relativedelta(years=3)
        to_date = now + relativedelta(years=1)

        data = self.build_data(from_date, to_date,
                               project_name, metric_name,
                               filters={"filter1": True,
                                        "filter2": ["web", "iphone", "android"]})

        for x in data:
            storage.incr(project=x['project'], name=x['name'], timestamp=x['timestamp'],
                         filters={x['filter_name']: x['filter_value']}, value=x['value'])

        response = self.fetch("/gottwall/api/v1/{0}/stats_dataset?from_date={1}&to_date={2}&period={3}&name={4}".format(
            project_name, from_date.strftime("%Y-%m-%d"), to_date.strftime("%Y-%m-%d"), "month", metric_name),
                              method="GET")
        self.assertEquals(response.code, 400)

        for period in ['month', 'year', "day", "week"]:
            response = self.fetch("/gottwall/api/v1/{0}/stats_dataset?from_date={1}&to_date={2}&period={3}&name={4}&filter_name={5}".format(
                project_name, from_date.strftime("%Y-%m-%d"), to_date.strftime("%Y-%m-%d"), period, metric_name, "filter2"),
                              method="GET")
            self.assertEquals(response.code, 200)

            response_data = json.loads(response.body)

            for key, value in response_data['data'].items():
                test_etalon_range = list(self.get_range(data, from_date, to_date,
                                                        period, "filter2", key))

                for k1, k2 in zip(value['range'], test_etalon_range):
                    self.assertEquals(k1[0], k2[0])
                    self.assertEquals(k1[1], k2[1])

                self.assertEquals(self.get_max(test_etalon_range), value['max'])
                self.assertEquals(self.get_min(test_etalon_range), value['min'])
                self.assertEquals(self.get_avg(test_etalon_range), value['avg'])

            self.assertEquals(response_data['filter_name'], 'filter2')
            self.assertEquals(response_data['name'], 'test_stats_metric_name')
            self.assertEquals(response_data['period'], period)
            self.assertEquals(response_data['project'], 'test_project')
