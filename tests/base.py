#!/usr/bin/env python
# -*- coding:  utf-8 -*-
"""
gottwall.tests
~~~~~~~~~~~~~~~~

Unittests for gottwall

:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""
import datetime
import os
import unittest
from itertools import ifilter, groupby
from random import randint, choice
from string import ascii_letters

from dateutil.relativedelta import relativedelta
from tornado.testing import AsyncHTTPTestCase, AsyncTestCase

from gottwall.compat import OrderedDict
from gottwall.utils import get_by_period, date_min, date_max, date_range
