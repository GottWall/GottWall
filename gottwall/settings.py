#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall.settings
~~~~~~~~~~~~~~~~~

GottWall settings

:copyright: (c) 2012 by GottWall Team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/Lispython/gottwall
"""

import os.path

__all__ = 'PROJECT_ROOT',

PROJECT_ROOT = os.path.abspath(os.path.dirname(__file__))


BACKENDS = []


PERIODS = [
    "week",
    "day",
    "year",
    "month",
    "hour",
    "all",
    "minute"
    ]

TIMESTAMP_FORMAT = "%Y-%m-%dT%H:%M:%S"


PERIOD_PATTERNS = {
    "day": "%Y-%m-%d",
    "year": "%Y",
    "month": "%Y-%m",
    "hour": "%Y-%m-%dT%H",
    "minute": "%Y-%m-%dT%H:%M",
    "all": "all"}


STORAGE_SETTINGS_KEY = "STORAGE_SETTINGS"


DATE_FILTER_FORMAT = "%Y-%m-%d"

PERIODIC_PROCESSOR_TIME = 1000*60*1

TASKS_CHUNK = 20
