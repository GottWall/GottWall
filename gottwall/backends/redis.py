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
import tornado.ioloop

from gottwall.backends.base import BaseBackend
from gottwall.handlers import BaseHandler

import tornadoredis


class RedisBackend(BaseBackend):

    def __init__(self, io_loop, config, storage):
        self.io_loop = io_loop
        self.config = config
        self.storage = storage
        self.client = None

    def configure_client(self):
        """Make redis client instance
        """
        self.client = tornadoredis.Client(
            host=self.backend_settings.get('HOST', 'localhost'),
            port=self.backend_settings.get('PORT', 6379),
            password=self.backend_settings.get('PASSWORD', None),
            selected_db=self.backend_settings.get('DB', 0),
            io_loop=self.io_loop)
        return self.client

    @classmethod
    def setup_backend(cls, io_loop, config, storage):
        """Setup data handler

        :param io_loo: :class:`tornado.ioloop.IOLoop` object
        :param confi: :class:`gottwall.config.Config` object
        :param storage: :class:`gottwall.storage.Storage` object
        """
        backend = cls(io_loop, config, storage)
        backend.configure_client()
        backend.listen()

    @tornado.gen.engine
    def listen(self):
        """Listen socket

        :param client: redis client
        """

        self.client.connect()

        yield tornado.gen.Task(self.client.psubscribe,
                               "{0}:*".format(self.backend_settings.get('CHANNEL', 'gottwall')))
        self.client.listen(self.callback)

    def callback(self, message):

        if message.body == 1:
            # handshake
            return

        try:
            project, public_key, private_key = self.parse_channel(message.channel)
        except ValueError:
            print("Invalid channel credentails")
            return

        if self.check_key(private_key, public_key, project):
            data = self.parse_data(message.body.strip())
            self.process_data(project, data)

        return True

    def parse_channel(self, channel):
        """Parser private, public keys from channel name

        :param message: message object
        :return: tuple for (project, public, private)
        """
        return channel.split(":")[1:]
