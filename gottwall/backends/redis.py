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

class Connection(object):
    """Connection wrapper for redis backend
    """

    def __init__(self, config, io_loop, redis):
        self._io_loop = io_loop
        self.redis = redis

    def connect(callback):
        pass

import tornadoredis

class RedisBackend(BaseHandler, BaseBackend):

    @classmethod
    def setup_backend(cls, ioloop, config):
        """Setup data handler to `app`

        :param cls: :class:`BaseBackend` childrem class
        :param app: :class:`tornado.web.Application` instance
        """
        print("setup redis backend")
        client = tornadoredis.Client(
            host=config['REDIS_HOST'],
            port=config['REDIS_PORT'],
            password=config['REDIS_PASSWORD'],
            selected_db=config['REDIS_DB'], io_loop=ioloop)

        client.connect()
        client.listen(cls.callback)

    @staticmethod
    def callback(**kwargs):

        import ipdb; ipdb.set_trace()
        pass
