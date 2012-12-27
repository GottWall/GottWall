#!/usr/bin/env python
# -*- coding: utf-8 -*-

from datetime import datetime
import unittest

from gottwall.utils import timestamp_to_datetime, get_by_period, MagicDict
import tornadoredis


def async_test_ex(timeout=5):
    def _inner(func):
        def _runner(self, *args, **kwargs):
            try:
                func(self, *args, **kwargs)
            except Exception, e:
                print(e)
                self.stop()
                raise
            return self.wait(timeout=timeout)
        return _runner
    return _inner


def async_test(func):
    _inner = async_test_ex()
    return _inner(func)


class UtilsTestCase(unittest.TestCase):
    def test_timestamp_to_datetime(self):
        d = datetime(2012, 11, 1, 3, 4, 5)
        timestamp = d.strftime("%Y-%m-%dT%H:%M:%S")
        self.assertEquals(d, timestamp_to_datetime(timestamp))


    def test_magic_dict(self):
        magic_dict = MagicDict()

        self.assertTrue(isinstance(magic_dict['key'], MagicDict))



