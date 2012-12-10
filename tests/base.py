#!/usr/bin/env python
# -*- coding:  utf-8 -*-
"""
gottwall.tests
~~~~~~~~~~~~~~~~

Unittests for gottwall

:copyright: (c) 2011 - 2012 by Alexandr Lispython (alex@obout.ru).
:license: BSD, see LICENSE for more details.
"""

import unittest
from tornado.testing import AsyncHTTPTestCase

class BaseTestCase(unittest.TestCase):
    pass


class AsyncBaseTestCase(AsyncHTTPTestCase):
    """Base class for web test
    """

