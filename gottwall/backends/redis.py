#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.backends.redis
~~~~~~~~~~~~~~~~~~~~~~~

Redis pub/sub backend

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/Lispython/gottwall
"""

import simplejson as json
from tornado.web import HTTPError

from gottwall.backends.base import BaseBackend
from gottwall.handlers import BaseHandler


class RedisBackend(BaseHandler, BaseBackend):

    @classmethod
    def setup_backend(cls, app, config):
        """Setup data handler to `app`

        :param cls: :class:`BaseBackend` childrem class
        :param app: :class:`tornado.web.Application` instance
        """
        print("setup redis backend")
        cls.application = app
