#!/usr/bin/env python
# -*- coding:  utf-8 -*-
"""
gottwall.tests
~~~~~~~~~~~~~~~~

Unittests for gottwall

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
"""
import os.path
from base import BaseTestCase

from gottwall.config import Config

class ConfigTestCase(BaseTestCase):
    def test_load(self):
        config = Config()
        filename = os.path.join(os.path.abspath(os.path.dirname(__file__)), "config_file.py")

        config.from_file(filename)

        self.assertTrue(config['SOME_TEST_VAR'], 'some_test_value')
