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

import json
from tornado.web import HTTPError
import tornado.ioloop
from tornado import gen

from gottwall.backends.base import BaseBackend
from gottwall.handlers import BaseHandler

import tornadoredis
from tornadoredis.exceptions import ConnectionError


class RedisBackend(BaseBackend):

    def __init__(self, io_loop, config, storage, tasks):
        self.io_loop = io_loop
        self.config = config
        self.storage = storage
        self.client = None
        self.tasks = tasks

    def get_redis_client(self):
        """Get redis client instance
        """

        client = tornadoredis.Client(
            host=self.backend_settings.get('HOST', 'localhost'),
            port=int(self.backend_settings.get('PORT', 6379)),
            password=self.backend_settings.get('PASSWORD', None),
            selected_db=int(self.backend_settings.get('DB', 0)),
            io_loop=self.io_loop)

        return client

    def configure_client(self):
        """Make redis client instance
        """
        self.client = self.get_redis_client()
        return self.client

    @classmethod
    def setup_backend(cls, io_loop, config, storage, tasks):
        """Setup data handler

        :param io_loo: :class:`tornado.ioloop.IOLoop` object
        :param confi: :class:`gottwall.config.Config` object
        :param storage: :class:`gottwall.storage.Storage` object
        """
        backend = cls(io_loop, config, storage, tasks)
        backend.configure_client()
        backend.listen()

    @gen.engine
    def listen(self):
        """Listen socket

        :param client: redis client
        """
        try:
            self.client.connect()

            yield tornado.gen.Task(self.client.psubscribe,
                                   "{0}:*".format(self.backend_settings.get('CHANNEL', 'gottwall')))
            self.client.listen(self.callback)
        except ConnectionError:
            print("Connection losed")
            self.listen()

    def callback(self, message):

        if message.body == 1:
            # handshake
            return

        try:
            project, public_key, private_key = self.parse_channel(message.channel)
        except ValueError:
            print("Invalid channel credentails")
            return

        data = self.parse_data(message.body.strip())
        message_type = data.get('type', None)

        if message_type == 'notification':
            # Load data from key to deque for project
            self.load_buckets(project)
        elif message_type == 'bucket':
            self.process_data(project, self.parse_data(data))

        return True

    def parse_channel(self, channel):
        """Parser private, public keys from channel name

        :param message: message object
        :return: tuple for (project, public, private)
        """
        return channel.split(":")[1:]

    def bucket_key(self, project):
        """Build bucket key

        :param project: project name
        """
        return "{0}:{1}:{2}".format(self.backend_settings.get('CHANNEL', 'gottwall'),
                                    project, self.config['PROJECTS'][project])

    @gen.engine
    def load_buckets(self, project):
        """Load data from key to application deque

        :param project: project name
        """
        client = self.get_redis_client()
        key = self.bucket_key(project)
        #length = (yield gen.Task(client.scard, key))

        # Max load elements at once
        #i = min(self.backend_settings.get("MAX_LOADING", 20), length)

        while True:
            raw_data = (yield gen.Task(client.spop, key))

            if not raw_data:
                break
            try:
                self.process_data(project, self.parse_data(raw_data))
            except Exception, e:
                print(e)

