#!/usr/bin/env python
# -*- coding:  utf-8 -*-
"""
gottwall.tests
~~~~~~~~~~~~~~~~

Unittests for gottwall

:copyright: (c) 2011 - 2012 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
"""
import os
import datetime
from base64 import b64encode

import json
import random
import redis
from base import AsyncBaseTestCase
from gottwall.app import HTTPApplication
from gottwall.config import Config
import gottwall.default_config
import tornadoredis
from utils import async_test
import tornado.gen
from tornado import ioloop


HOST = os.environ.get('GOTTWALL_REDIS_HOST', "10.8.9.8")


class TCPBackendTestCase(AsyncBaseTestCase):
    def get_app(self):
        config = Config()
        config.from_module(gottwall.default_config)

        config.update({"BACKENDS": {"gottwall.backends.TCPIPBackend": {}},
                       "STORAGE": "gottwall.storages.MemoryStorage",
                                 "PROJECTS": {"test_project": "secretkey"},
                                 "PRIVATE_KEY": "myprivatekey"})
        self.app = HTTPApplication(config)
        self.app.configure_app(self.io_loop)

        return self.app

    def test(self):
        print("Base test")



class RedisBackendTestCase(AsyncBaseTestCase):
    def get_new_ioloop(self):
        return ioloop.IOLoop.instance()

    def get_app(self):
        config = Config()
        config.from_module(gottwall.default_config)

        config.update({"BACKENDS": {"gottwall.backends.redis.RedisBackend": {"HOST": HOST}},
                       "STORAGE": "gottwall.storages.RedisStorage",
                       "REDIS_HOST": HOST,
                       "PROJECTS": {"test_project": "secretkey2"},
                       "SECRET_KEY": "myprivatekey2"})
        self.app = HTTPApplication(config)
        self.app.configure_app(self.io_loop)

    @async_test
    @tornado.gen.engine
    def test_subscribe(self):

        metric_data = {"name": "redis_metric_{0}".format(random.randint(1, 10)),
                       "timestamp": datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S"),
                       "filters": {"views": "anonymouse"},
                       "action": "incr",
                       "value": 2}

        client = tornadoredis.Client(host=HOST)
        yield tornado.gen.Task(client.publish, "gottwall:{0}:{1}:{2}".format("test_project",
                                                                        self.app.config['PROJECTS']['test_project'],
                                                                        self.app.config['SECRET_KEY']),
                               json.dumps(metric_data))


        keys = yield tornado.gen.Task(client.keys, "{0}:{1}*".format("test_project", metric_data['name']))

        self.stop()


class HTTPBackendTestCase(AsyncBaseTestCase):

    def get_app(self):
        config = Config()
        config.from_module(gottwall.default_config)
        config.update({"BACKENDS": [],
                                 "PROJECTS": {"test_project": "secretkey"},
                                 "SECRET_KEY": "myprivatekey"})
        self.app = HTTPApplication(config)
        self.app.configure_app(self.io_loop)
        return self.app

    def test_handler(self):
        metric_data = {"name": "my_metric_name",
                       "timestamp": datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S"),
                       "filters": {"views": "registered",
                                   "clicks": "anonymouse"},
                       "action": "incr",
                       "value": 2}

        auth_value = "GottWall private_key={0}, public_key={1}".format(
            self.app.config['SECRET_KEY'],
            self.app.config['PROJECTS']['test_project'])

        authorization = "{0}:{1}".format(self.app.config['PROJECTS']['test_project'],
                                         self.app.config['SECRET_KEY'])

        response = self.fetch("/test_project/api/store", method="POST",
                              body=json.dumps(metric_data),
                              headers={"content-type": "application/json",
                                       "Authorization": b64encode(authorization)})

        self.assertEquals(response.body, "OK")
        self.assertEquals(response.code, 200)

        auth_value = "GottWall private_key={0}, public_key={1}".format(
            self.app.config['SECRET_KEY'],
            self.app.config['PROJECTS']['test_project'])

        response = self.fetch("/test_project/api/store", method="POST",
                              body=json.dumps(metric_data),
                              headers={"content-type": "application/json",
                                       "X-GottWall-Auth": auth_value})

        self.assertEquals(response.body, "OK")
        self.assertEquals(response.code, 200)

        # Test without authorization

        response = self.fetch("/test_project/api/store", method="POST",
                              body=json.dumps(metric_data),
                              headers={"content-type": "application/json"})

        self.assertEquals(response.code, 403)

