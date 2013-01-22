#!/usr/bin/env python
# -*- coding:  utf-8 -*-
"""
gottwall.tests
~~~~~~~~~~~~~~~~

Unittests for gottwall

:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
"""

import unittest

from config import ConfigTestCase
from backends import TCPBackendTestCase, HTTPBackendTestCase,\
     RedisBackendTestCase
from api import APITestCase
from storages import StorageTestCase, RedisStorageTestCase,\
     MemoryStorageTestCase
from utils import UtilsTestCase
from app import ProcessorTestCase


def suite():
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(ConfigTestCase))
    suite.addTest(unittest.makeSuite(TCPBackendTestCase))
    suite.addTest(unittest.makeSuite(HTTPBackendTestCase))
    suite.addTest(unittest.makeSuite(RedisBackendTestCase))
    suite.addTest(unittest.makeSuite(APITestCase))
    suite.addTest(unittest.makeSuite(StorageTestCase))
    suite.addTest(unittest.makeSuite(RedisStorageTestCase))
    suite.addTest(unittest.makeSuite(MemoryStorageTestCase))
    suite.addTest(unittest.makeSuite(UtilsTestCase))
    suite.addTest(unittest.makeSuite(ProcessorTestCase))
    return suite

if __name__ == '__main__':
    unittest.main(defaultTest="suite")
