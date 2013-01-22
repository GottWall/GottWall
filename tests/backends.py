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
import os
import random
from base64 import b64encode

import tornado.gen
from tornado import ioloop

import gottwall.default_config
from base import AsyncBaseTestCase, AsyncHTTPBaseTestCase, RedisTestCaseMixin
from gottwall.aggregator import AggregatorApplication
from gottwall.config import Config
from utils import async_test


HOST = os.environ.get('GOTTWALL_REDIS_HOST', "10.8.9.8")


class TCPBackendTestCase(AsyncBaseTestCase):
    def get_app(self):
        config = Config()
        config.from_module(gottwall.default_config)

        config.update({"BACKENDS": {"gottwall.backends.tcpip.TCPIPBackend": {}},
                       "STORAGE": "gottwall.storages.MemoryStorage",
                                 "PROJECTS": {"test_project": "secretkey"},
                                 "PRIVATE_KEY": "myprivatekey"})
        self.app = AggregatorApplication(config)
        self.app.configure_app(self.io_loop)

        return self.app


class RedisBackendTestCase(AsyncHTTPBaseTestCase, RedisTestCaseMixin):

    def setUp(self):
        super(RedisBackendTestCase, self).setUp()
        self.client = self._new_client()
        self.client.flushdb()

    def tearDown(self):
        try:
            self.client.connection.disconnect()
            del self.client
        except AttributeError:
            pass
        super(RedisBackendTestCase, self).tearDown()

    def get_new_ioloop(self):
        return ioloop.IOLoop.instance()

    def get_app(self):
        config = Config()
        config.from_module(gottwall.default_config)

        config.update({"BACKENDS": {"gottwall.backends.redis.RedisBackend": {"HOST": HOST}},
                       "STORAGE": "gottwall.storages.MemoryStorage",
                       "REDIS_HOST": HOST,
                       "PROJECTS": {"test_project": "secretkey2"},
                       "SECRET_KEY": "myprivatekey2"})
        app = AggregatorApplication(config)
        app.configure_app(self.io_loop)
        return app

    @async_test
    @tornado.gen.engine
    def test_subscribe(self):
        app = self.get_app()
        metric_data = {"name": "redis_metric_{0}".format(random.randint(1, 10)),
                       "timestamp": datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S"),
                       "filters": {"views": "anonymouse"},
                       "action": "incr",
                       "value": 2,
                       "type": "bucket"}

        client = self.client
        key = "gottwall:{0}:{1}:{2}".format("test_project",
                                            app.config['PROJECTS']['test_project'],
                                            app.config['SECRET_KEY'])

        (yield tornado.gen.Task(client.publish, key,
                                json.dumps(metric_data)))

        from pprint import pprint
        pprint(app.storage._store)


        self.stop()


class HTTPBackendTestCase(AsyncHTTPBaseTestCase):

    def get_app(self):
        config = Config()
        config.from_module(gottwall.default_config)
        config.update({"BACKENDS": [],
                       "PROJECTS": {"test_project": "secretkey"},
                       "SECRET_KEY": "myprivatekey"})
        self.app = AggregatorApplication(config)
        self.app.configure_app(self.io_loop)
        return self.app

    def test_handler(self):
        app = self.get_app()

        metric_data = {"name": "my_metric_name",
                       "timestamp": datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S"),
                       "filters": {"views": "registered",
                                   "clicks": "anonymouse"},
                       "action": "incr",
                       "value": 2}

        auth_value = "GottWall private_key={0}, public_key={1}".format(
            app.config['SECRET_KEY'],
            app.config['PROJECTS']['test_project'])

        authorization = "{0}:{1}".format(app.config['PROJECTS']['test_project'],
                                         app.config['SECRET_KEY'])

        response = self.fetch("/gottwall/test_project/api/store", method="POST",
                              body=json.dumps(metric_data),
                              headers={"content-type": "application/json",
                                       "Authorization": b64encode(authorization)})

        self.assertEquals(response.body, "OK")
        self.assertEquals(response.code, 200)

        auth_value = "GottWall private_key={0}, public_key={1}".format(
            app.config['SECRET_KEY'],
            app.config['PROJECTS']['test_project'])

        response = self.fetch("/gottwall/test_project/api/store", method="POST",
                              body=json.dumps(metric_data),
                              headers={"content-type": "application/json",
                                       "X-GottWall-Auth": auth_value})

        self.assertEquals(response.body, "OK")
        self.assertEquals(response.code, 200)

        # Test without authorization

        response = self.fetch("/gottwall/test_project/api/store", method="POST",
                              body=json.dumps(metric_data),
                              headers={"content-type": "application/json"})

        self.assertEquals(response.code, 403)
