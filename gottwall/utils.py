#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall.utils
~~~~~~~~~~~~~~

Core GottWall utilities

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details.
:license: , see LICENSE for more details.
:github: http://github.com/gottwall/gottwall
"""
import os.path
from time import mktime
from datetime import datetime, timedelta, date
from urllib2 import parse_http_list
from dateutil.relativedelta import relativedelta
from dateutil.rrule import rrule, MINUTELY, MONTHLY, DAILY, HOURLY


# Backport of OrderedDict() class that runs on Python 2.4, 2.5, 2.6, 2.7 and pypy.
# Passes Python2.7's test suite and incorporates all the latest updates.

try:
    from thread import get_ident as _get_ident
except ImportError:
    from dummy_thread import get_ident as _get_ident

try:
    from _abcoll import KeysView, ValuesView, ItemsView
except ImportError:
    pass


from settings import PROJECT_ROOT, TIMESTAMP_FORMAT, PERIOD_PATTERNS


__all__ = 'rel',


def rel(*args):
    return os.path.join(PROJECT_ROOT, *args)


def timestamp_to_datetime(timestamp, format=TIMESTAMP_FORMAT):
    """Convert `timestamp` to `datetime`

    :param timestamp: str
    """
    if isinstance(timestamp, (str, unicode)):
        return datetime.strptime(timestamp, format)
    return timestamp


def format_date_by_period(dt, period):
    """Get "%Y-%m-%dT%H:%M"t period value by timestamp

    :param dt: `datetime.datetime` instance
    :param period: period name
    :returns: str repr of timestamp
    """
    ts = timestamp_to_datetime(dt)

    if period == "week":
        return "{0}-{1}".format(ts.year, ts.isocalendar()[1])
    elif period in PERIOD_PATTERNS:
        return ts.strftime(PERIOD_PATTERNS[period])
    return None

def get_by_period(dt, period):
    """Get "%Y-%m-%dT%H:%M"t period value by timestamp

    :param dt: `datetime.datetime` instance
    :param period: period name
    :returns: str repr of timestamp
    """
    ts = timestamp_to_datetime(dt)

    if period == "week":
        return "{0}-{1}".format(ts.year, ts.isocalendar()[1])
    elif period in PERIOD_PATTERNS:
        return ts.strftime(PERIOD_PATTERNS[period])
    return None


def get_datetime(timestamp, period):
    """Convert str timestamp to datetime object

    Reverse for ``get_by_period``

    :param timestamp: str representation of time
    :param perid: period
    """
    if period == 'week' and isinstance(timestamp, (str, unicode)):
        year, week = timestamp.split("-")
        ret = datetime.strptime("{0}-{1}-1".format(year, week), '%Y-%W-%w')
        if date(int(year), 1, 4).isoweekday() > 4:
            ret -= timedelta(days=7)
        return ret
    if isinstance(timestamp, datetime):
        return timestamp
    elif period in PERIOD_PATTERNS:
        return datetime.strptime(timestamp, PERIOD_PATTERNS[period])
    return None

def datetime_to_int(dt, period):
    """Convert datetime object to unix timestamp
    """
    if period in ['day', 'hour']:
        return int(mktime(dt.timetuple()))
    elif period == "year":
        return dt.strftime("%Y")
    elif period == "month":
        return dt.strftime("%Y%m")
    elif period == "week":
        return "{0}-{1}".format(dt.year, dt.isocalendar()[1])
    return 0


def parse_dict_header(value):
    """Parse key=value pairs from value list
    :param value: header string
    :return: params dict
    """
    result = {}
    for item in parse_http_list(value):
        if "=" not in item:
            result[item] = None
            continue
        name, value = item.split('=', 1)
        if value[:1] == value[-1:] == '"':
            value = value[1:-1] # strip "
        result[name] = value
    return result


class MagicDict(dict):
    """Dict that create key with value dict if
    if does not exist
    """

    def __getitem__(self, key):
        if key not in self:
            self[key] = self.__class__()
        return dict.__getitem__(self, key)


def date_range(from_date, to_date, period="month"):

    rrule_period = None

    if period == "month":
        rrule_period = MONTHLY
    elif period == "hour":
        rrule_period = HOURLY
    elif period == "minute":
        rrule_period = MINUTELY
    elif period == "day":
        rrule_period = DAILY
    else:
        return []

    return list(rrule(rrule_period, dtstart=from_date, until=to_date))

def date_min(from_date, period):
    if period == "year":
        return from_date.replace(month=1, hour=0, day=1, minute=0, second=0)
    elif period == "month":
        return from_date.replace(hour=0, day=1, minute=0, second=0)
    elif period == "day":
        return from_date.replace(hour=0, minute=0, second=0)
    elif period == "hour":
        return from_date.replace(minute=0, second=0)
    elif period == "minute":
        return from_date.replace(second=0)
    return from_date

def date_max(to_date, period):
    if period == "year":
        return to_date.replace(month=12, hour=23, day=31, minute=59, second=59)
    elif period == "month":
        to_date = to_date.replace(day=1, hour=23, minute=59, second=59) + relativedelta(months=+1, days=-1)
    elif period == "day":
        return to_date.replace(hour=23, minute=59, second=59)
    elif period == "hour":
        return to_date.replace(minute=59, second=59)
    elif period == "minute":
        return to_date.replace(second=59)
    return to_date
