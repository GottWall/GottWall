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


BACKENDS = ['gottwall.backends.HTTPBackend']


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
