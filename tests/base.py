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
        env = os.environ

        return {"HOST": env.get('GOTTWALL_REDIS_HOST', "10.8.9.8"),
                "PORT": env.get('GOTTWALL_REDIS_PORT', 6379),
                "DB": env.get('GOTTWALL_REDIS_DB', 0)}

class BaseTestCase(unittest.TestCase, SettingsMixin):
    pass

class AsyncBaseTestCase(AsyncTestCase, SettingsMixin):
    pass

class AsyncHTTPBaseTestCase(AsyncHTTPTestCase, SettingsMixin):
    pass


import tornadoredis

class TestRedisClient(tornadoredis.Client):

    def __init__(self, *args, **kwargs):
        self._on_destroy = kwargs.get('on_destroy', None)
        if 'on_destroy' in kwargs:
            del kwargs['on_destroy']
        super(TestRedisClient, self).__init__(*args, **kwargs)

    def __del__(self):
        super(TestRedisClient, self).__del__()
        if self._on_destroy:
            self._on_destroy()



class RedisTestCaseMixin(object):

    def setUp(self):
        super(RedisTestCaseMixin, self).setUp()
        self.client = self._new_client()
        self.client.flushdb()

    def tearDown(self):
        try:
            self.client.connection.disconnect()
            del self.client
        except AttributeError:
            pass
        super(RedisTestCaseMixin, self).tearDown()


    def _new_client(self, pool=None, on_destroy=None):
        client = TestRedisClient(io_loop=self.io_loop,
                                 host=self.redis_settings['HOST'],
                                 port=self.redis_settings['PORT'],
                                 selected_db=self.redis_settings['DB'],
                                 connection_pool=pool,
                                 on_destroy=on_destroy)

        return client
