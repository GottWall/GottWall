#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall.utils
~~~~~~~~~~~~~~

Core GottWall utilities

:copyright: (c) 2012 by Alexandr Lispython (alex@obout.ru).
:license: , see LICENSE for more details.
:github: http://github.com/Lispython/projectname
"""

import os.path
from datetime import datetime, timedelta, date

from settings import PROJECT_ROOT, TIMESTAMP_FORMAT


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
    """Get period value by timestamp

    :param timestamp: `datetime.datetime` instance
    :param period: period name
    """
    timestamp = timestamp_to_datetime(timestamp)

    if period == "week":
        return "{0}-{1}".format(timestamp.year, timestamp.isocalendar()[1])
    elif period == "day":
        return timestamp.strftime("%Y-%m-%d")
    elif period == "year":
        return timestamp.strftime("%Y")
    elif period == "month":
        return timestamp.strftime("%Y-%m")
    elif period == "hour":
        return timestamp.strftime("%Y-%m-%dT%H")
    elif period == "minute":
        return timestamp.strftime("%Y-%m-%dT%H:%M")
    elif period == "all":
        return "all"
    return None
