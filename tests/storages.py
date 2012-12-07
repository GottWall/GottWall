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
import simplejson as json

from tornado.web import Application

from gottwall.app import HTTPApplication
from gottwall.config import Config, default_settings

from base import BaseTestCase, AsyncBaseTestCase

from gottwall.storages import MemoryStorage, BaseStorage


class StorageTestCase(BaseTestCase):

    def get_app(self):
        self.app = HTTPApplication(default_settings)
        self.app.configure_app()
        return self.app

    def test_base_storage(self):
        app = HTTPApplication(default_settings)
        app.configure_storage("gottwall.storages.BaseStorage")

        self.assertTrue(isinstance(app.storage, BaseStorage))

        params = {"project": "project_name",
                  "name": "orders",
                  "timestamp": datetime.datetime.now(),
                  "filters": {"clearing": True,
                              "device": "web"}}

        self.assertRaises(NotImplementedError,
                          app.storage.incr, **params)

    def test_memory_storage(self):
        print("test memory storage")
        app = HTTPApplication(default_settings)
        app.configure_storage("gottwall.storages.MemoryStorage")
        storage = app.storage

        self.assertTrue(isinstance(app.storage, MemoryStorage))

        project_name = "Test_project"
        timestamp = datetime.datetime.utcnow()
        for x in xrange(10):
            storage.incr(project_name, "orders",
                         timestamp, filters={"clearing": True,
                                             "device": "web"})

        for period in ["all", "year", "month", "day", "week", "hour", "minute"]:
            self.assertTrue(storage.get_metric_value(
                project_name, "orders", period, timestamp), 10)
