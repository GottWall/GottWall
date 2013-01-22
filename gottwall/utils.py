#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall.utils
~~~~~~~~~~~~~~

Core GottWall utilities

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details.
:license: , see LICENSE for more details.
:github: http://github.com/Lispython/projectname
"""
import os.path
from datetime import datetime, timedelta, date
from urllib2 import parse_http_list

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


def get_by_period(dt, period):
    """Ge"%Y-%m-%dT%H:%M"t period value by timestamp

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
    delta =  to_date - from_date

    if period == "hour":
        return [to_date - timedelta(hours=x) for x in range(0, delta.days * 24)]
    elif period == "minute":
        return [to_date - timedelta(minutes=x) for x in range(0, delta.days * 24 * 60)]
    elif period == "day":
        return [to_date - timedelta(days=x) for x in range(0, delta.days)]
    return []
