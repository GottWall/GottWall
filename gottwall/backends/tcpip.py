#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.tcpip
~~~~~~~~~~~~~~

Raw TCP/IP backend for gottwall messages

:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details..
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""
import uuid
from logging import getLogger

from fast_utils.fstring import extract_if_startswith
from tornado.log import app_log
from tornado.tcpserver import TCPServer

from gottwall.backends.base import BaseBackend, AuthMixin, DataProcessorMixin
from gottwall.backends.iostream import IOStream


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
        self.count = 0
        self.connections = {}
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
        self.add_connection(Connection(self, stream, address))

        #stream.read_until(b"--chunk--", self.callback)
        #stream.read_until_close(self.callback)
        #stream.close()

    def add_connection(self, conn):
        print("Add connection {0}".format(conn.uid))
        self.connections[conn.uid] = conn

    def remove_connection(self, conn):
        print("Remove connection {0}".format(conn.uid))
        del self.connections[conn.uid]

    def _handle_connection(self, connection, address):
        try:
            stream = IOStream(connection, io_loop=self.io_loop, max_buffer_size=self.max_buffer_size)
            self.handle_stream(stream, address)
        except Exception:
            app_log.error("Error in connection callback", exc_info=True)


class Connection(AuthMixin, DataProcessorMixin):

    def __init__(self, backend, stream, address):
        self.stream = stream
        self.address = address
        self.backend = backend
        #self.stream.set_close_callback(self.close_callback)
        self.uid = uuid.uuid4().hex
        self.application = backend.application
        self.config = self.application.config
        self.stream.set_nodelay(True)

        self.auth_delimiter = self.backend.backend_settings.get('AUTH_DELIMITER', "--stream-auth--")
        self.chunk_delimiter = self.backend.backend_settings.get('CHUNK_DELIMITER',  "--chunk--")

        self.stream.read_until(self.auth_delimiter, self.on_auth_callback)
        self.project = None

    def auth_failed(self):
        self.stream.write(b"FAIL")
        self.stream.close()
        return False

    def auth_ok(self):
        self.stream.write(b"OK")

    def on_auth_callback(self, auth_header):
        """Authentication header
        """
        header = auth_header[:len(auth_header) - len(self.auth_delimiter)]

        if not self.check_gottwall_auth(header):
            self.auth_failed()
            return

        self.auth_ok()
        self.stream.read_by_delimiter_until_close(
            self.close_callback, self.streaming_callback, self.chunk_delimiter)

    def close_callback(self, *args, **kwargs):
        #print("Close")
        #print((args, kwargs))
        self.backend.remove_connection(self)

    def streaming_callback(self, chunk):
        if not self.project:
            return self.auth_failed()

        chunks = chunk.split("--chunk--")

        for chunk in chunks:
            if not chunk:
                continue

            data = self.parse_data(chunk)
            self.backend.count += 1
            self.process_data(data['p'], data['a'], data)

    def check_gottwall_auth(self, header):
        """Check client authentication

        :param header: authentication header string
        """
        header = extract_if_startswith(header, "GottWallS2")

        if not header:
            return False

        try:
            ts, sign, base, project = header.split()
            if self.check_sign(project, sign, ts, base):
                self.project = project
                return True
        except Exception as e:
            return True
        return False
