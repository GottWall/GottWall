#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.udp
~~~~~~~~~~~~~~

Raw UDP backend for gottwall messages

:copyright: (c) 2012 - 2014 by GottWall team, see AUTHORS for more details..
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""

from tornado.tcpserver import TCPServer

from gottwall.backends.base import BaseBackend
from logging import getLogger

logger = getLogger("gottwall.backends.tcpip")


class TCPIPBackend(TCPServer, BaseBackend):

    def __init__(self, application, io_loop, config, storage, tasks, *args, **kwargs):
        self.io_loop = io_loop
        self.config = config
        self.storage = storage
        self.tasks = tasks
        self.application = application
        self.working = True
        self.current_in_progress = 0
        super(TCPIPBackend, self).__init__(*args, **kwargs)

    @classmethod
    def setup_backend(cls, application, io_loop, config, storage, tasks):
        """Install backend to ioloop

        :param ioloop: :class:`tornadoweb.ioloop.IOLoop` instance
        :param config: :class:`~gottwall.config.Config` instance
        """

        server = cls(application, io_loop, config, storage, tasks)
        port = server.backend_settings.get('PORT', "8897")
        host = server.backend_settings.get('HOST', "127.0.0.1")

        server.listen(str(port), host)
        logger.info("GottWall TCP/IP transport listen {host}:{port}".format(port=port, host=host))
        return server

    def handle_stream(self, stream, address):
        """Process stream data

        :param  stream: :class:`tornado.iostream` instance
        :param address: client address
        """
        stream.read_until(b"\r\n\r\n", self.callback)
        stream.close()
