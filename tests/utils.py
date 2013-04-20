#!/usr/bin/env python
# -*- coding: utf-8 -*-

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


class UtilsTestCase(unittest.TestCase):
    def test_timestamp_to_datetime(self):
        d = datetime(2012, 11, 1, 3, 4, 5)
        timestamp = d.strftime("%Y-%m-%dT%H:%M:%S")
        self.assertEquals(d, timestamp_to_datetime(timestamp))


    def test_magic_dict(self):
        magic_dict = MagicDict()

        self.assertTrue(isinstance(magic_dict['key'], MagicDict))


    def test_get_by_period(self):

        d = datetime(2012, 11, 1, 3, 4, 4)

        self.assertEquals(get_by_period(date_min(d, "year"), "year"), 2012)
        self.assertEquals(get_by_period(date_min(d, "month"), "month"), 1351713600)
        self.assertEquals(get_by_period(date_min(d, "week"), "week"), 1351454400)
        self.assertEquals(get_by_period(date_min(d, "day"), "day"), 1351713600)
        self.assertEquals(get_by_period(date_min(d, "hour"), "hour"), 1351724400)
        self.assertEquals(get_by_period(date_min(d, "minute"), "minute"), 1351724640)

        self.assertEquals(get_by_period(date_max(d, "year"), "year"), 2012)
        self.assertEquals(get_by_period(date_max(d, "month"), "month"), 1354305599)
        self.assertEquals(get_by_period(date_max(d, "week"), "week"), 1352059199)
        self.assertEquals(get_by_period(date_max(d, "day"), "day"), 1351799999)
        self.assertEquals(get_by_period(date_max(d, "hour"), "hour"), 1351727999)
        self.assertEquals(get_by_period(date_max(d, "minute"), "minute"), 1351724699)


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
