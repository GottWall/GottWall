#!/usr/bin/env python
# -*- coding:  utf-8 -*-
"""
gottwall.tests
~~~~~~~~~~~~~~~~

Unittests for gottwall

:copyright: (c) 2011 - 2012 by Alexandr Lispython (alex@obout.ru).
:license: BSD, see LICENSE for more details.
"""
from __future__ import with_statement

import os
import time
import pycurl2 as pycurl
import cookielib
from Cookie import Morsel
import json
import uuid
from random import randint, choice
from string import ascii_letters, digits
import logging
from urlparse import urljoin
import unittest
import urllib
from types import TupleType, ListType, FunctionType, DictType
from urllib import urlencode

import human_curl as requests
from human_curl import Request, Response
from human_curl import AsyncClient
from human_curl.auth import *
from human_curl.utils import *

from human_curl.exceptions import (CurlError, InterfaceError)

logger = logging.getLogger("gottwall.test")

## async_logger = logging.getLogger("human_curl.async")
## async_logger.setLevel(logging.DEBUG)

## # Add the log message handler to the logger
## # LOG_FILENAME = os.path.join(os.path.dirname(__file__), "debug.log")
## # handler = logging.handlers.FileHandler(LOG_FILENAME)
## handler = logging.StreamHandler()

## formatter = logging.Formatter("%(levelname)s %(asctime)s %(module)s [%(lineno)d] %(process)d %(thread)d | %(message)s ")

## handler.setFormatter(formatter)

## async_logger.addHandler(handler)

class BaseTestCase(unittes.TestCase):
    pass


def suite():
    suite = unittest.TestSuite()
    suite.addTest(unittest.makeSuite(BaseTestCase))
    return suite


if __name__ == '__main__':
    unittest.main(defaultTest="suite")
