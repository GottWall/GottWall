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

import tornado.options

from config import ConfigTestCase
from backends import BaseBackendTestCase, HTTPBackendTestCase
from app import ApplicationTestCase
from api import APITestCase
from storages import StorageTestCase


def suite():
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(ConfigTestCase))
    suite.addTest(unittest.makeSuite(BaseBackendTestCase))
    suite.addTest(unittest.makeSuite(HTTPBackendTestCase))
    suite.addTest(unittest.makeSuite(ApplicationTestCase))
    suite.addTest(unittest.makeSuite(APITestCase))
    suite.addTest(unittest.makeSuite(StorageTestCase))
    return suite

if __name__ == '__main__':
    unittest.main(defaultTest="suite")
