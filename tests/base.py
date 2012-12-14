#!/usr/bin/env python
# -*- coding:  utf-8 -*-
"""
gottwall.tests
~~~~~~~~~~~~~~~~

Unittests for gottwall

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
"""

import os
import unittest
from tornado.testing import AsyncHTTPTestCase, AsyncTestCase

class SettingsMixin(object):

    @property
    def redis_settings(self):
        HOST = os.environ.get('GOTTWALL_REDIS_HOST', "10.8.9.8")
        return {"HOST": HOST}

class BaseTestCase(unittest.TestCase, SettingsMixin):
    pass

class AsyncBaseTestCase(AsyncHTTPTestCase, SettingsMixin):
    pass

class AsyncHTTPBaseTestCase(AsyncTestCase, SettingsMixin):
    pass
