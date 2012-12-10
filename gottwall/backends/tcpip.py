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
import simplejson as json

from tornado.netutil import TCPServer
from tornado.util import b

from gottwall.backends.base import BaseBackend


class TCPIPBackend(TCPServer, BaseBackend):

    def __init__(self, config, *args, **kwargs):
        self.config = config
        super(TCPIPBackend, self).__init__(*args, **kwargs)

    @classmethod
    def setup_backend(cls, ioloop, config):
        server = cls(config, ioloop)
        server.listen(8887)

    def handle_stream(self, stream, address):
        """

        :param  stream: :class:`tornado.iostream` instance
        :param address: client address
        """
        stream.read_until(b("\r\n\r\n"), self.read_callback)
        stream.close()

    def read_callback(self, data):
        """Process data from stream

        :param data: stream data
        """
        d = json.loads(data.strip())

        if self.check_key(d['auth']['private_key'], d['auth']['public_key'], d['project']):
            self.process_data(d['project'], d)

        return True




