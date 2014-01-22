#!/usr/bin/env python
# -*- coding:  utf-8 -*-
"""
gottwall.tests
~~~~~~~~~~~~~~~~

Unittests for gottwall

:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""

import datetime
from uuid import UUID

import tornado.gen
import tornado.ioloop

from gottwall.app import HTTPApplication
from gottwall.config import Config
import gottwall.default_config
from gottwall.utils.tests import async_test
from tornado.gen import Task
from dateutil.relativedelta import relativedelta

from gottwall.utils.tests import BaseTestCase, AsyncBaseTestCase

from gottwall.storages import MemoryStorage, BaseStorage
from gottwall.utils import MagicDict

class UtilsMixin(object):

    def get_embedded_metrics(self):

        return [{"metric_name": "test_metric_name1"},
                {"metric_name": "test_metric_name2",
                 "filter_name": "test_filter_name2",
                 "filter_value": "test_fitler_value2"}]

    @tornado.gen.engine
    def metric_meta_tests(self, storage):
        filters = {"filter1": "value",
                   "filter2": ["value1", "value2", "value2"]}

        res = yield Task(storage.save_metric_meta, "memory_storage", "metric_name",
                         filters=filters)

        self.assertTrue(res)

        self.assertEquals(storage._metrics["memory_storage"]["metric_name"]["filter1"], ["value"])
        self.assertEquals(storage._metrics["memory_storage"]["metric_name"]["filter2"],
                          ["value1", "value2"])

        metrics_res = (yield Task(storage.metrics, "memory_storage"))

        self.assertEquals(metrics_res,
                          {"metric_name": {"filter1": [filters['filter1']],
                                           "filter2": ["value1", "value2"]}})

    @tornado.gen.engine
    def methods_tests(self, storage):

        res = (yield Task(storage.make_embedded, project="test_project1", period="month",
                         metrics=self.get_embedded_metrics()))

        self.assertTrue(isinstance(res, UUID))

        embedded_res = (yield Task(storage.get_embedded, res))
        self.assertEquals(embedded_res['project'], "test_project1")
        self.assertEquals(embedded_res['period'], "month")
        self.assertEquals(len(embedded_res['metrics']), len(self.get_embedded_metrics()))


    @tornado.gen.engine
    def storage_tests(self, storage):

        project_name = self.random_str(10)
        metric_name = self.random_str(10)
        now = datetime.datetime.now()
        from_date = now - relativedelta(years=1)
        to_date = now + relativedelta(years=1)
        filters = {"filter1": True,
                   "filter2": ["web", "iphone", "android"]}

        data = self.build_data(from_date, to_date,
                               project_name, metric_name,
                               filters=filters)

        for item in data:
            storage.incr(project=project_name, name=metric_name,
                         timestamp=item['timestamp'],
                         filters={item['filter_name']: item['filter_value']},
                         value=item['value'])

        metrics_list = (yield Task(storage.get_metrics_list, project_name))

        self.assertTrue(metric_name in metrics_list)
        self.assertEquals(len(metrics_list), 1)

        filters_list = (yield Task(storage.get_filters, project_name, metric_name))

        self.assertTrue("filter1" in filters_list)
        self.assertTrue("filter2" in filters_list)
        self.assertEquals(len(filters), len(filters_list))

        self.assertTrue(1, len((yield Task(storage.get_filter_values,
                                           project_name, metric_name, "filter1"))))

        self.assertTrue(3, len((yield Task(storage.get_filter_values,
                                           project_name, metric_name, "filter2"))))

        metrics = yield Task(storage.metrics, project_name)
        self.assertEquals(metrics[metric_name]['filter1'], [True])
        self.assertEquals(sorted(metrics[metric_name]['filter2']), sorted(['android', 'iphone', 'web']))

        self.methods_tests(storage)

        # Test storage.query
        for period in ["year", "month", "day", "week", "hour", "minute"]:
            for filter_name, filter_value in (("filter1", True),
                                              ("filter2", "web"),
                                              ("filter2", "iphone"),
                                              (None, None)):

                d = (yield Task(storage.query, project_name,
                                metric_name, period,
                                from_date=from_date,
                                to_date=to_date,
                                filter_name=filter_name,
                                filter_value=filter_value))

                test_etalon_range = list(self.get_range(data, from_date, to_date,
                                                        period, filter_name, filter_value))

                for k1, k2 in zip(d['range'], test_etalon_range):
                    self.assertEquals(k1, k2)

                self.assertEquals(self.get_max(test_etalon_range), d['max'])
                self.assertEquals(self.get_min(test_etalon_range), d['min'])
                self.assertEquals(self.get_avg(test_etalon_range), d['avg'])

        # Test queryset
        for period in ["year", "month", "day", "week", "hour", "minute"]:
            for filter_name, filter_values in (("filter1", [True]),
                                               ("filter2", ['android', 'iphone', 'web'])):
                d = (yield Task(storage.query_set, project_name,
                                metric_name, period,
                                from_date=from_date,
                                to_date=to_date,
                                filter_name=filter_name))

                for value in filter_values:
                    test_etalon_range = list(self.get_range(data, from_date, to_date,
                                                            period, filter_name, value))
                    for k1, k2 in zip(d[value]['range'], test_etalon_range):
                        self.assertEquals(k1[0], k2[0])
                        self.assertEquals(k1[1], k2[1])

                    self.assertEquals(self.get_max(test_etalon_range), d[value]['max'])
                    self.assertEquals(self.get_min(test_etalon_range), d[value]['min'])
                    self.assertEquals(self.get_avg(test_etalon_range), d[value]['avg'])



class StorageTestCase(BaseTestCase, UtilsMixin):

    def test_base_storage(self):
        config = Config()
        config.from_object(gottwall.default_config)

        app = HTTPApplication(config)
        app.configure_storage("gottwall.storages.BaseStorage")

        self.assertTrue(isinstance(app.storage, BaseStorage))

        params = {"project": "project_name",
                  "name": "orders",
                  "timestamp": datetime.datetime.now(),
                  "filters": {"clearing": True,
                              "device": "web"}}

        self.assertRaises(NotImplementedError,
                          app.storage.incr, **params)
        self.assertRaises(NotImplementedError,
                          app.storage.decr, **params)


        self.assertRaises(NotImplementedError,
                          app.storage.metrics, "project_name")

        res = app.storage.make_embedded("project", "month", self.get_embedded_metrics())
        self.assertTrue(isinstance(res[0], UUID))
        self.assertEquals(res[1]['project'], "project")
        self.assertEquals(res[1]['period'], "month")
        self.assertEquals(len(res[1]['metrics']), len(self.get_embedded_metrics()))

        self.assertRaises(NotImplementedError, app.storage.query,
                          "test_project", "test_metric", "month")
        self.assertRaises(NotImplementedError, app.storage.metrics, "test_project")
        self.assertRaises(NotImplementedError, app.storage.get_filters,
                          "test_project", "test_metric")
        self.assertRaises(NotImplementedError, app.storage.get_filter_values,
                          "test_project", "test_metric", "filter1")


class MemoryStorageTestCase(AsyncBaseTestCase, UtilsMixin):

    def get_app(self):
        config = Config()
        config.from_module(gottwall.default_config)
        config.update()
        self.app = HTTPApplication(config)
        self.app.configure_app(tornado.ioloop.IOLoop.instance())

        return self.app


    @async_test
    @tornado.gen.engine
    def test_methods(self):
        storage = MemoryStorage(None)

        self.assertTrue(isinstance(storage, MemoryStorage))
        self.assertTrue(isinstance(storage._store, MagicDict))
        self.assertTrue(isinstance(storage._metrics, dict))

        self.methods_tests(storage)
        self.metric_meta_tests(storage)

        self.stop()

    @async_test
    @tornado.gen.engine
    def test_storage(self):
        app = self.get_app()
        app.configure_storage("gottwall.storages.MemoryStorage")
        storage = app.storage
        self.storage_tests(storage)
        self.stop()
