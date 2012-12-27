#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.tcpip
~~~~~~~~~~~~~~

Raw TCP/IP backend for gottwall messages

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details..
:license: BSD, see LICENSE for more details.
:github: http://github.com/Lispython/gottwall
"""

from tornado.netutil import TCPServer
from tornado.util import b

from gottwall.backends.base import BaseBackend


class TCPIPBackend(TCPServer, BaseBackend):

    def __init__(self, io_loop, config, storage, tasks, *args, **kwargs):
        self.io_loop = io_loop
        self.config = config
        self.storage = storage
        self.tasks = tasks
        super(TCPIPBackend, self).__init__(*args, **kwargs)

    @classmethod
    def setup_backend(cls, io_loop, config, storage, tasks):
        """Install backend to ioloop

        :param ioloop: :class:`tornadoweb.ioloop.IOLoop` instance
        :param config: :class:`~gottwall.config.Config` instance
        """

        server = cls(io_loop, config, storage, tasks)
        server.listen(server.backend_settings.get('PORT', 8897))

    def handle_stream(self, stream, address):
        """Process stream data

        :param  stream: :class:`tornado.iostream` instance
        :param address: client address
        """
        stream.read_until(b("\r\n\r\n"), self.callback)
        stream.close()
