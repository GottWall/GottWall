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
from base64 import b64encode

import simplejson as json

from base import AsyncBaseTestCase
from gottwall.app import HTTPApplication
from gottwall.config import default_settings


class TCPBackendTestCase(AsyncBaseTestCase):
    def get_app(self):
        default_settings.update({"BACKENDS": ["gottwall.backends.TCPIPBackend"],
                                 "PROJECTS": {"test_project": "secretkey"},
                                 "PRIVATE_KEY": "myprivatekey"})
        self.app = HTTPApplication(default_settings)
        self.app.configure_app(self.io_loop)

        return self.app

    def test_base(self):
        print("Test base")

class HTTPBackendTestCase(AsyncBaseTestCase):

    def get_app(self):
        default_settings.update({"BACKENDS": [],
                                 "PROJECTS": {"test_project": "secretkey"},
                                 "PRIVATE_KEY": "myprivatekey"})
        self.app = HTTPApplication(default_settings)
        self.app.configure_app(self.io_loop)
        return self.app

    def test_handler(self):
        metric_data = {"name": "my_metric_name",
                       "timestamp": datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S"),
                       "filters": {"views": "registered",
                                   "clicks": "anonymouse"},
                       "action": "incr",
                       "value": 2}

        auth_value = "GottWall private_key={0}, public_key={1}".format(self.app.config['PRIVATE_KEY'],
                                                                     self.app.config['PROJECTS']['test_project'])

        authorization = "{0}:{1}".format(self.app.config['PROJECTS']['test_project'],
                                         self.app.config['PRIVATE_KEY'])

        response = self.fetch("/test_project/api/store", method="POST",
                              body=json.dumps(metric_data),
                              headers={"content-type": "application/json",
                                       "Authorization": b64encode(authorization)})

        self.assertEquals(response.body, "OK")
        self.assertEquals(response.code, 200)

        auth_value = "GottWall private_key={0}, public_key={1}".format(
            self.app.config['PRIVATE_KEY'],
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

