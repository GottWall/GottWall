#!/usr/bin/env python
# -*- coding:  utf-8 -*-
"""
gottwall.tests
~~~~~~~~~~~~~~~~

Unittests for gottwall

:copyright: (c) 2011 - 2012 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
"""

import unittest

from config import ConfigTestCase
from backends import TCPBackendTestCase, HTTPBackendTestCase, RedisBackendTestCase
from api import APITestCase
from storages import StorageTestCase
from utils import UtilsTestCase


def suite():
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(ConfigTestCase))
    suite.addTest(unittest.makeSuite(TCPBackendTestCase))
    suite.addTest(unittest.makeSuite(HTTPBackendTestCase))
    suite.addTest(unittest.makeSuite(RedisBackendTestCase))
    suite.addTest(unittest.makeSuite(APITestCase))
    suite.addTest(unittest.makeSuite(StorageTestCase))
    suite.addTest(unittest.makeSuite(UtilsTestCase))
    return suite

if __name__ == '__main__':
    unittest.main(defaultTest="suite")
