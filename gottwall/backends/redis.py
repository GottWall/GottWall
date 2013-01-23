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
from logging import getLogger

import tornado.ioloop
import tornadoredis
from tornado import gen
from tornadoredis.exceptions import ConnectionError

from gottwall.backends.base import BaseBackend
from gottwall.processing import RedisBackendPeriodicProcessor


logger = getLogger()


class Client(tornadoredis.Client):
    def __init__(self, reconnect_callback=None, **kwargs):
        self._reconnect_callback = reconnect_callback
        super(Client, self).__init__(**kwargs)

    def on_disconnect(self):
        if self.subscribed:
            self.subscribed = False
        #self._reconnect_callback()
        raise ConnectionError("Conneciton loast")

    def connect(self):
        if not self.connection.connected():
            pool = self._connection_pool
            if pool:
                old_conn = self.connection
                self.connection = pool.get_connection(event_handler_proxy=self)
                self.connection.ready_callbacks = old_conn.ready_callbacks
            else:
                self.connection.connect()


class RedisBackend(BaseBackend):

    def __init__(self, application, io_loop, config, storage, tasks, data_threshold=500):
        self.io_loop = io_loop
        self.config = config
        self.storage = storage
        self.client = None
        self.tasks = tasks
        self.data_processing_threshold = data_threshold
        self.current_in_progress = 0
        self.data_processor = None
        self.application = application
        self.working = True

    def get_redis_client(self):
        """Get redis client instance
        """

        client = Client(
            #connection_pool=connection_pool,
            host=self.backend_settings.get('HOST', 'localhost'),
            port=int(self.backend_settings.get('PORT', 6379)),
            io_loop=self.io_loop,
            password=self.backend_settings.get('PASSWORD', None),
            selected_db=int(self.backend_settings.get('DB', 0)),
            reconnect_callback=self.listen)

        return client

    def configure_client(self):
        """Make redis client instance
        """
        self.client = self.get_redis_client()
        return self.client

    def configure_processors(self):
        self.data_processor = RedisBackendPeriodicProcessor(self,
            io_loop=self.io_loop, config=self.config)
        self.data_processor.start()

    @classmethod
    def setup_backend(cls, application, io_loop, config, storage, tasks):
        """Setup data handler

        :param io_loo: :class:`tornado.ioloop.IOLoop` object
        :param confi: :class:`gottwall.config.Config` object
        :param storage: :class:`gottwall.storage.Storage` object
        """
        backend = cls(application, io_loop, config, storage, tasks)
        backend.configure_client()
        backend.configure_processors()
        backend.listen()
        return backend

    @gen.engine
    def listen(self):
        """Listen socket

        :param client: redis client
        """
        self.client.connect()

        yield tornado.gen.Task(
            self.client.psubscribe,
            "{0}:*".format(self.backend_settings.get('CHANNEL', 'gottwall')))
        self.client.listen(self.callback)

    def callback(self, message):

        if message.body == 1:
            # handshake
            return

        try:
            project, public_key, private_key = self.parse_channel(message.channel)
        except ValueError:
            logger.warn("Invalid channel credentails")
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
        return "{0}:{1}:{2}".format(
            self.backend_settings.get('CHANNEL', 'gottwall'),
            project, self.config['PROJECTS'][project])

    @gen.engine
    def load_buckets(self, project):
        """Load data from key to application deque

        :param project: project name
        """
        client = self.get_redis_client()
        key = self.bucket_key(project)
        length = (yield gen.Task(client.scard, key))

        # Max load elements at once
        i = min(int(self.backend_settings.get("MAX_LOADING", 100)), length)

        while i > 0 and (self.current_in_progress < self.data_processing_threshold) and self.working:
            raw_data = (yield gen.Task(client.spop, key))

            if not raw_data:
                break

            self.current_in_progress += 1
            try:
                self.process_data(project, self.parse_data(raw_data),
                                  self.process_data_callback)
            except Exception, e:
                logger.warning(e)
                print(e)

            i -= 1

    def process_data_callback(self, res):
        """Function that called then data processes

        :param res: process result
        """
        self.current_in_progress -= 1

    def shutdown(self):
        """Shutdown backend

        """
        self.working = False
        logger.debug("Tasks in progress {0}".format(self.current_in_progress))
