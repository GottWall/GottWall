#!/usr/bin/env python
# -*- coding: utf-8 -*-

import time
from datetime import datetime
import unittest

from gottwall.utils import timestamp_to_datetime, get_by_period, MagicDict, date_min, date_max
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

def to_ts(d):
    return int(time.mktime(d.timetuple()))

class UtilsTestCase(unittest.TestCase):
    def test_timestamp_to_datetime(self):
        d = datetime(2012, 11, 1, 3, 4, 5)
        timestamp = d.strftime("%Y-%m-%dT%H:%M:%S")
        self.assertEquals(d, timestamp_to_datetime(timestamp))


    def test_magic_dict(self):
        magic_dict = MagicDict()

        self.assertTrue(isinstance(magic_dict['key'], MagicDict))


    def test_get_by_period(self):

        d = datetime(2012, 11, 1, 4, 5, 2)

        def tmin(d, period):
            return get_by_period(date_min(d, period), period)

        def tmax(d, period):
            return get_by_period(date_max(d, period), period)

        self.assertEquals(tmin(d, "year"), to_ts(datetime(2012, 1, 1, 0, 0)))
        self.assertEquals(tmin(d, "month"), to_ts(datetime(2012, 11, 1, 0, 0)))
        self.assertEquals(tmin(d, "week"), to_ts(datetime(2012, 10, 29, 0, 0)))
        self.assertEquals(tmin(d, "day"), to_ts(datetime(2012, 11, 1, 0, 0)))
        self.assertEquals(tmin(d, "hour"), to_ts(datetime(2012, 11, 1, 4, 0)))
        self.assertEquals(tmin(d, "minute"), to_ts(datetime(2012, 11, 1, 4, 5)))

        self.assertEquals(tmax(d, "year"), to_ts(datetime(2012, 12, 31, 23, 59, 59, 999999)))
        self.assertEquals(tmax(d, "month"), to_ts(datetime(2012, 11, 30, 23, 59, 59, 999999)))
        self.assertEquals(tmax(d, "week"), to_ts(datetime(2012, 11, 4, 23, 59, 59, 999999)))
        self.assertEquals(tmax(d, "day"), to_ts(datetime(2012, 11, 1, 23, 59, 59, 999999)))
        self.assertEquals(tmax(d, "hour"), to_ts(datetime(2012, 11, 1, 4, 59, 59, 999999)))
        self.assertEquals(tmax(d, "minute"), to_ts(datetime(2012, 11, 1, 4, 5, 59, 999999)))

    def test_date_min_and_max(self):
        d = datetime(2012, 11, 1, 4, 5, 2)
        self.assertEquals(date_min(d, "year"), datetime(2012, 1, 1, 0, 0))
        self.assertEquals(date_min(d, "month"), datetime(2012, 11, 1, 0, 0))
        self.assertEquals(date_min(d, "week"), datetime(2012, 10, 29, 0, 0))
        self.assertEquals(date_min(d, "day"), datetime(2012, 11, 1, 0, 0))
        self.assertEquals(date_min(d, "hour"), datetime(2012, 11, 1, 4, 0))
        self.assertEquals(date_min(d, "minute"), datetime(2012, 11, 1, 4, 5))

        self.assertEquals(date_max(d, "year"), datetime(2012, 12, 31, 23, 59, 59, 999999))
        self.assertEquals(date_max(d, "month"), datetime(2012, 11, 30, 23, 59, 59, 999999))
        self.assertEquals(date_max(d, "week"), datetime(2012, 11, 4, 23, 59, 59, 999999))
        self.assertEquals(date_max(d, "day"), datetime(2012, 11, 1, 23, 59, 59, 999999))
        self.assertEquals(date_max(d, "hour"), datetime(2012, 11, 1, 4, 59, 59, 999999))
        self.assertEquals(date_max(d, "minute"), datetime(2012, 11, 1, 4, 5, 59, 999999))

        d = datetime(2013, 12, 30, 4, 5, 2)
        self.assertEquals(date_min(d, "year"), datetime(2013, 1, 1, 0, 0, 0))
        self.assertEquals(date_min(d, "month"), datetime(2013, 12, 1, 0, 0, 0))
        self.assertEquals(date_min(d, "week"), datetime(2013, 12, 30, 0, 0, 0))
        self.assertEquals(date_min(d, "day"), datetime(2013, 12, 30, 0, 0, 0, 0))
        self.assertEquals(date_min(d, "hour"), datetime(2013, 12, 30, 4, 0, 0))
        self.assertEquals(date_min(d, "minute"), datetime(2013, 12, 30, 4, 5, 0))

        self.assertEquals(date_max(d, "year"), datetime(2013, 12, 31, 23, 59, 59, 999999))
        self.assertEquals(date_max(d, "month"), datetime(2013, 12, 31, 23, 59, 59, 999999))
        self.assertEquals(date_max(d, "week"), datetime(2014, 1, 5, 23, 59, 59, 999999))
        self.assertEquals(date_max(d, "day"), datetime(2013, 12, 30, 23, 59, 59, 999999))
        self.assertEquals(date_max(d, "hour"), datetime(2013, 12, 30, 4, 59, 59, 999999))
        self.assertEquals(date_max(d, "minute"), datetime(2013, 12, 30, 4, 5, 59, 999999))
