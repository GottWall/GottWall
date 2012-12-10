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
from urllib2 import parse_http_list
from datetime import datetime, timedelta, date

from settings import PROJECT_ROOT, TIMESTAMP_FORMAT, PERIOD_PATTERNS


__all__ = 'rel',


def rel(*args):
    return os.path.join(PROJECT_ROOT, *args)


def timestamp_to_datetime(timestamp):
    """Convert `timestamp` to `datetime`

    :param timestamp: str
    """
    if isinstance(timestamp, (str, unicode)):
        return datetime.strptime(timestamp, TIMESTAMP_FORMAT)
    return timestamp


def get_by_period(timestamp, period):
    """Ge"%Y-%m-%dT%H:%M"t period value by timestamp

    :param timestamp: `datetime.datetime` instance
    :param period: period name
    """
    timestamp = timestamp_to_datetime(timestamp)

    if period == "week":
        return "{0}-{1}".format(timestamp.year, timestamp.isocalendar()[1])
    elif period in PERIOD_PATTERNS:
        return timestamp.strftime(PERIOD_PATTERNS[period])
    return None

def get_datetime(timestamp, period):
    if period in PERIOD_PATTERNS:
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
