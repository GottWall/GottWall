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
import json
from base64 import b64encode

import gottwall.default_config
from gottwall.aggregator import AggregatorApplication
from gottwall.config import Config
from gottwall.utils.tests import AsyncBaseTestCase, AsyncHTTPBaseTestCase


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


        response = self.fetch("/gottwall/api/v1/test_projfewfweect/incr", method="POST",
                              body=json.dumps(metric_data),
                              headers={"content-type": "application/json",
                                       "Authorization": b64encode(authorization)})

        self.assertEquals(response.code, 404)

        response = self.fetch("/gottwall/api/v1/test_project/infdsfcr", method="POST",
                              body=json.dumps(metric_data),
                              headers={"content-type": "application/json",
                                       "Authorization": b64encode(authorization)})

        self.assertEquals(response.code, 404)

        auth_value = "GottWall private_key={0}, public_key={1}".format(
            app.config['SECRET_KEY'],
            app.config['PROJECTS']['test_project'])

        response = self.fetch("/gottwall/api/v1/test_project/incr", method="POST",
                              body=json.dumps(metric_data),
                              headers={"content-type": "application/json",
                                       "X-GottWall-Auth": auth_value})

        self.assertEquals(response.body, "OK")
        self.assertEquals(response.code, 200)

        # Test without authorization

        response = self.fetch("/gottwall/api/v1/test_project/incr", method="POST",
                              body=json.dumps(metric_data),
                              headers={"content-type": "application/json"})

        self.assertEquals(response.code, 403)

        response = self.fetch("/gottwall/api/v1/test_project/incr", method="POST",
                              body=json.dumps(metric_data),
                              headers={"content-type": "application/json",
                                       "Authorization": b64encode(authorization)})

        self.assertEquals(response.body, "OK")
        self.assertEquals(response.code, 200)
