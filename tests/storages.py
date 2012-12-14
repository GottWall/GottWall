#!/usr/bin/env python
# -*- coding:  utf-8 -*-
"""
gottwall.tests
~~~~~~~~~~~~~~~~

Unittests for gottwall

:copyright: (c) 2011 - 2012 by GottWall team, see AUTHORS for more details.
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


from base import BaseTestCase, AsyncBaseTestCase

from gottwall.storages import MemoryStorage, BaseStorage, RedisStorage


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

class MemoryStorageTestCase(BaseTestCase):

    def get_app(self):
        config = Config()
        config.from_module(gottwall.default_config)
        config.update()
        self.app = HTTPApplication(config)
        self.app.configure_app(tornado.ioloop.IOLoop.instance())

        return self.app

    def test_memory_storage(self):
        app = self.get_app()
        app.configure_storage("gottwall.storages.MemoryStorage")
        storage = app.storage

        self.assertTrue(isinstance(app.storage, MemoryStorage))

        project_name = "Test_project"
        timestamp = datetime.datetime.utcnow()
        for x in xrange(10):
            storage.incr(project_name, "orders",
                         timestamp, filters={"clearing": True,
                                             "device": "web"})

        timestamp2 = datetime.datetime(2012, 1, 10, 3, 43)
        for x in xrange(10):
            storage.incr(project_name, "orders",
                         timestamp2, filters={"clearing": True,
                                             "device": "web"})

        for period in ["month", "day", "week", "hour", "minute"]:

            self.assertTrue(storage.get_metric_value(
                project_name, "orders", period, timestamp), 10)

        for period in ["year", "all"]:
            self.assertTrue(storage.get_metric_value(
                project_name, "orders", period, timestamp), 19)

        metrics = storage.metrics(project_name)

        self.assertTrue('orders' in metrics)
        self.assertTrue(metrics['orders'], {'clearing': [True], 'device': ['web']})


        app = self.get_app()
        storage = MemoryStorage(app)

        for x in xrange(100):
            storage.incr("d1", "metric", datetime.datetime(2012, choice(range(1, 12)), choice(range(1, 28))))

        data = storage.slice_data("d1", "metric", "month")
        self.assertEquals(sum([x[1] for x in data]), 100)


class RedisStorageTestCase(AsyncBaseTestCase):

    def get_app(self):
        config = Config()
        config.from_object(gottwall.default_config)

        config.update({"STORAGE_SETTINGS": {
            "REDIS_HOST": self.redis_settings['HOST']
            }})

        self.app = HTTPApplication(config)
        self.app.configure_app(self.io_loop)

        return self.app

    def test_redis_storage(self):
        app = self.get_app()
        app.configure_storage("gottwall.storages.RedisStorage")
        storage = app.storage

        self.assertTrue(isinstance(storage, RedisStorage))

        project_name = "Test_project20"
        timestamp = datetime.datetime.utcnow()

        for x in xrange(10):
            storage.incr(project_name, "orders7",
                         timestamp, filters={"clearing": True,
                                                       "device": "web"})

        timestamp2 = datetime.datetime(2012, 1, 10, 3, 43)
        for x in xrange(10):
            storage.incr(project_name, "orders7",
                         timestamp2, filters={"clearing": True,
                                              "device": "web"})

        for period in ["month", "day", "week", "hour", "minute"]:
            self.assertTrue(storage.get_metric_value(
                project_name, "orders7", period, timestamp), 10)

        for period in ["year", "all"]:
            self.assertTrue(storage.get_metric_value(
                project_name, "orders7", period, timestamp), 19)

        metrics = storage.metrics(project_name)

        self.assertTrue('orders' in metrics)
        self.assertTrue(metrics['orders'], {'clearing': [True], 'device': ['web']})

        app = self.get_app()
        storage = RedisStorage(app)

        for x in xrange(100):
            storage.incr("d1", "metric", datetime.datetime(2012, choice(range(1, 12)), choice(range(1, 28))))

        data = storage.slice_data("d1", "metric", "month")
        self.assertEquals(sum([x[1] for x in data]), 100)
