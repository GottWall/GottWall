#!/usr/bin/env python
# -*- coding:  utf-8 -*-
"""
gottwall.tests
~~~~~~~~~~~~~~~~

Unittests for gottwall

:copyright: (c) 2011 - 2012 by Alexandr Lispython (alex@obout.ru).
:license: BSD, see LICENSE for more details.
"""

import datetime
import simplejson as json

from tornado.web import Application

from gottwall.app import HTTPApplication
from gottwall.config import Config, default_settings

from base import BaseTestCase, AsyncBaseTestCase


class APITestCase(AsyncBaseTestCase):

    def get_app(self):
        default_settings.update({"BACKENDS": []})
        self.app = HTTPApplication(default_settings)
        self.app.configure_app(self.io_loop)
        return self.app

    def test_stats(self):
        # Get statistics by weeks
        response = self.fetch("/test_project/api/stats?from_date=2012-01-20&to_date=2012-12-31&period=week",
                              method="GET")

        response_data = json.loads(response.body)
        self.assertTrue(isinstance(response_data, (list, tuple)))
        self.assertEquals(response.code, 200)

    def test_metrics(self):
        # Get statistics by weeks
        response = self.fetch("/test_project/api/metrics",
                              method="GET")
        response_data = json.loads(response.body)
        self.assertEquals(response_data['name'], [])
        self.assertEquals(response.code, 200)

