#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall.utils
~~~~~~~~~~~~~~

Core GottWall utilities

:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details.
:license: , see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""
import os.path
import time
from datetime import datetime
from urllib2 import parse_http_list
from dateutil.relativedelta import relativedelta
from dateutil.rrule import rrule, MINUTELY, MONTHLY, DAILY, HOURLY, YEARLY, WEEKLY, MO, SU


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
    elif isinstance(timestamp, int):
        return datetime.fromtimestamp(timestamp)
    return timestamp

def get_by_period(dt, period):
    """Get "%Y-%m-%dT%H:%M"t period value by timestamp

    :param dt: `datetime.datetime` instance
    :param period: period name
    :returns: str repr of timestamp
    """
    ts = timestamp_to_datetime(dt)

    if period in ['year', 'month', 'day', 'week', 'minute', 'hour']:
        return int(time.mktime(ts.timetuple()))
    return None


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
    """Building dates range

    :param from_date: from_date after date_min
    :param to_date: to_date after date_max
    :param period: group period
    :return: list
    """

    rrule_period = None

    if period == "year":
        rrule_period = YEARLY
    elif period == "month":
        rrule_period = MONTHLY
    elif period == "week":
        rrule_period = WEEKLY
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
    for_replace = {"second": 0,
                   "microsecond": 0}

    if period == "year":
        return from_date.replace(month=1, day=1, hour=0, minute=0, **for_replace)
    elif period == "month":
        return from_date.replace(day=1,hour=0, minute=0, **for_replace)
    elif period == "week":
        from_date = from_date.replace(hour=0, minute=0, **for_replace)
        if from_date.isoweekday() != 1:
            return from_date + relativedelta(weekday=MO, weeks=-1)
        return from_date
    elif period == "day":
        return from_date.replace(hour=0, minute=0, **for_replace)
    elif period == "hour":
        return from_date.replace(minute=0, **for_replace)
    elif period == 'minute':
        return from_date.replace(**for_replace)
    return from_date


def date_max(to_date, period):
    for_replace = {"second": 59,
                   "microsecond": 999999}

    if period == "year":
        return to_date.replace(month=12, day=31, hour=23, minute=59, **for_replace)
    elif period == "month":
        return to_date.replace(day=1, hour=23, minute=59, **for_replace) + relativedelta(months=+1, days=-1)
    elif period == "week":
        to_date = to_date.replace(hour=23, minute=59, **for_replace)
        if to_date.isoweekday() != 6:
            return to_date + relativedelta(weekday=SU)
        return to_date
    elif period == "day":
        return to_date.replace(hour=23, minute=59, **for_replace)
    elif period == "hour":
        return to_date.replace(minute=59, **for_replace)
    elif period == "minute":
        return to_date.replace(**for_replace)
    return to_date.replace(**for_replace)
