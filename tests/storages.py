#!/usr/bin/env python
# -*- coding:  utf-8 -*-
"""
gottwall.tests
~~~~~~~~~~~~~~~~

Unittests for gottwall

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
"""

import datetime
import json
from random import choice, randint

from tornado.web import Application
import tornado.gen
import tornado.ioloop

from gottwall.app import HTTPApplication
from gottwall.config import Config, default_settings
import gottwall.default_config
from utils import async_test
import tornadoredis
from tornado.gen import Task

from base import BaseTestCase, AsyncBaseTestCase, RedisTestCaseMixin

from gottwall.storages import MemoryStorage, BaseStorage, RedisStorage
from gottwall.utils import MagicDict


class StorageTestCase(BaseTestCase):

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

        self.assertRaises(NotImplementedError, app.storage.metrics, "project_name")


class MemoryStorageTestCase(AsyncBaseTestCase):

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

        filters = {"filter1": "value",
                   "filter2": ["value1", "value2", "value2"]}

        res = yield Task(storage.save_metric_meta, "memory_storage", "metric_name",
                         filters=filters)

        self.assertTrue(res)

        self.assertEquals(storage._metrics["memory_storage"]["metric_name"]["filter1"], ["value"])
        self.assertEquals(storage._metrics["memory_storage"]["metric_name"]["filter2"],
                          ["value1", "value2"])


        metrics_res = yield Task(storage.metrics, "memory_storage")

        self.assertEquals(metrics_res,
                          {"metric_name": {"filter1": [filters['filter1']],
                                           "filter2": ["value1", "value2"]}})
        self.stop()


    @async_test
    @tornado.gen.engine
    def test_storage(self):
        app = self.get_app()
        app.configure_storage("gottwall.storages.MemoryStorage")

        storage = app.storage

        self.assertTrue(isinstance(app.storage, MemoryStorage))

        project_name = "test_memory_project"
        timestamp = datetime.datetime(2012, 4, 10, 4, 5)

        for x in xrange(10):
            self.assertTrue((yield Task(storage.incr, project_name, "metric_name",
                                        timestamp, filters={"filter1": True,
                                                            "filter2": ["web", "iphone", "android"]})))

        timestamp2 = datetime.datetime(2012, 1, 10, 3, 43)
        for x in xrange(10):
            self.assertTrue((yield Task(storage.incr, project_name, "metric_name",
                                        timestamp2,
                                        filters={"filter1": True,
                                                 "filter2": ["web", "iphone", "android"]})))

        self.assertEqual(storage._metrics,
                         {'test_memory_project':
                          {'metric_name': {'filter1': [True],
                                           'filter2': ['web',
                                                       'iphone',
                                                       'android']}}})


        for period in ["month", "day", "week", "hour", "minute"]:
            for filter_name, filter_value in (("filter1", True),
                                              ("filter2", "web"),
                                              ("filter2", "iphone"),
                                              (None, None)):
                for x in list((yield Task(storage.slice_data, "test_memory_project",
                                          "metric_name", period,
                                          filter_name=filter_name,
                                          filter_value=filter_value))):
                    self.assertEquals(x[1], 10)


        for period in ["year", ]:
            for filter_name, filter_value in (("filter1", True),
                                              ("filter2", "web"),
                                              ("filter2", "iphone"),
                                              (None, None)):
                for x in list((yield Task(storage.slice_data, "test_memory_project",
                                          "metric_name", period,
                                          filter_name=filter_name,
                                          filter_value=filter_value))):
                    self.assertEquals(x[1], 20)
        self.stop()


class RedisStorageTestCase(AsyncBaseTestCase, RedisTestCaseMixin):

    def setUp(self):
        super(RedisStorageTestCase, self).setUp()
        self.client = self._new_client()
        self.client.flushdb()

    def tearDown(self):
        try:
            self.client.flushdb()
            self.client.connection.disconnect()
            del self.client
        except AttributeError:
            pass
        super(RedisStorageTestCase, self).tearDown()

    def get_app(self):
        config = Config()
        config.from_object(gottwall.default_config)

        config.update({"STORAGE_SETTINGS": {
            "HOST": self.redis_settings['HOST']
            }})

        self.app = HTTPApplication(config)
        self.app.configure_app(self.io_loop)

        return self.app

    def get_new_ioloop(self):
        return tornado.ioloop.IOLoop.instance()


    @async_test
    @tornado.gen.engine
    def test_methods(self):
        storage = RedisStorage(self.get_app())

        self.assertEquals(storage.make_key("redis_project_name", "metric_name", "week",
                                           filters={"status": "new",
                                                    "type": "registered"}),
                          "redis_project_name;metric_name;week;status|new/type|registered")


        self.assertTrue(isinstance(storage, RedisStorage))

        filters = {"filter1": "value",
                   "filter2": ["value1", "value2", "value2"]}

        client = self.client

        pipe = client.pipeline()
        storage.save_metric_meta(pipe, "redis_storage_test", "metric_name",
                                 filters=filters)

        (yield Task(pipe.execute))

        metrics = yield Task(
            client.smembers,
            storage.get_metrics_key("redis_storage_test"))

        self.assertEquals(len(metrics), 1)
        self.assertTrue("metric_name" in metrics)

        stored_filters = yield Task(
            client.smembers,
            storage.get_filters_names_key("redis_storage_test", "metric_name"))

        self.assertEquals(len(stored_filters), 2)

        for f, values in filters.items():

            stored_value = yield Task(
                client.smembers,
                storage.get_filters_values_key("redis_storage_test", "metric_name", f))

            self.assertEquals(set(values)
                              if isinstance(values, (list, tuple))
                              else set([values]),
                              stored_value)

        metrics = yield Task(storage.metrics, "redis_storage_test")

        self.assertEquals(metrics,
        {"metric_name": {"filter1": [filters['filter1']],
                         "filter2": ["value1", "value2"]}})
        self.stop()


    @async_test
    @tornado.gen.engine
    def test_metric_meta(self):
        """Get metrics structure
        """
        client = tornadoredis.Client(host=self.redis_settings['HOST'])
        app = self.get_app()
        app.configure_storage("gottwall.storages.RedisStorage")
        storage = app.storage

        pipe = client.pipeline()

        (yield Task(storage.save_metric_meta, pipe, "test_metric_meta_project", "metric_name",
                   filters={"hello": "world",
                            "test": ["value1", "value2"]}))

        self.stop()


    @async_test
    @tornado.gen.engine
    def test_redis_storage(self):
        app = self.get_app()
        app.configure_storage("gottwall.storages.RedisStorage")

        storage = app.storage

        self.assertTrue(isinstance(app.storage, RedisStorage))

        project_name = "test_redis_project"
        timestamp = datetime.datetime(2012, 4, 10, 4, 5)

        for x in xrange(10):
            self.assertTrue((yield Task(storage.incr, project_name, "redis_metric_name",
                             timestamp, filters={"filter1": True,
                                                 "filter2": ["web", "iphone", "android"]})))

        timestamp2 = datetime.datetime(2012, 1, 10, 3, 43)
        for x in xrange(10):
            self.assertTrue((yield Task(storage.incr, project_name, "redis_metric_name",
                         timestamp2,
                         filters={"filter1": True,
                                  "filter2": ["web", "iphone", "android"]})))

        self.assertEqual((yield Task(storage.metrics, project_name)),
                         {'redis_metric_name': {'filter1': ['True'],
                                                'filter2': ['android',
                                                            'iphone',
                                                            'web']}})


        for period in ["month", "day", "week", "hour", "minute"]:
            for filter_name, filter_value in (("filter1", True),
                                              ("filter2", "web"),
                                              ("filter2", "iphone"),
                                              (None, None)):
                for x in list((yield Task(storage.slice_data, "test_redis_project",
                                          "redis_metric_name", period,
                                          filter_name=filter_name,
                                          filter_value=filter_value))):
                    self.assertEquals(int(x[1]), 10)


        for period in ["year", ]:
            for filter_name, filter_value in (("filter1", True),
                                              ("filter2", "web"),
                                              ("filter2", "iphone"),
                                              (None, None)):
                for x in list((yield Task(storage.slice_data, "test_redis_project",
                                          "redis_metric_name", period,
                                          filter_name=filter_name,
                                          filter_value=filter_value))):
                    self.assertEquals(int(x[1]), 20)

        self.stop()
