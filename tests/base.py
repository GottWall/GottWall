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
import hmac
import hashlib

from itertools import ifilter, groupby
from random import randint, choice
from string import ascii_letters

from dateutil.relativedelta import relativedelta
from tornado.testing import AsyncHTTPTestCase, AsyncTestCase

from gottwall.compat import OrderedDict
from gottwall.utils import get_by_period, date_min, date_max, date_range


def sign_msg(key, ts):
    return str(key) + str(get_solt(int(ts)))

def get_solt(ts, solt_base=1000):
    return int(round(ts / solt_base) * solt_base)

def make_sign(ts, private_key, public_key, solt_base):
    return hmac.new(key=private_key, msg=sign_msg(public_key, ts),
                    digestmod=hashlib.md5).hexdigest()
