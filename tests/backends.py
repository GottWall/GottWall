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


class BaseBackendTestCase(BaseTestCase):

    def test_1(self):
        print("test wotk")


class HTTPBackendTestCase(AsyncBaseTestCase):

    def get_app(self):
        default_settings.update({"BACKENDS": ["gottwall.backends.HTTPBackend"]})
        self.app = HTTPApplication(default_settings)
        self.app.configure_app()
        return self.app

    def test_handler(self):
        metric_data = {"name": "my_metric_name",
                       "timestamp": datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S"),
                       "filters": {"views": "registered",
                                   "clicks": "anonymouse"},
                       "action": "incr",
                       "value": 2}
        response = self.fetch("/test_project/api/store", method="POST",
                              body=json.dumps(metric_data),
                              headers={"content-type": "application/json"})

        self.assertEquals(response.body, "OK")
        self.assertEquals(response.code, 200)


