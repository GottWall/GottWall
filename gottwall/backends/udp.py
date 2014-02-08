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
import errno
import os
import socket
from functools import partial
from logging import getLogger

from gottwall.backends.base import BaseBackend
from tornado.ioloop import IOLoop
from tornado.platform.auto import set_close_exec
from tornado.escape import to_unicode

logger = getLogger("gottwall.backends.udp")


def get_sockets_to_bind(port, address=None, family=socket.AF_UNSPEC, flags=None):

    sockets = []
    if address == "":
        address = None
    if not socket.has_ipv6 and family == socket.AF_UNSPEC:
        # Python can be compiled with --disable-ipv6, which causes
        # operations on AF_INET6 sockets to fail, but does not
        # automatically exclude those results from getaddrinfo
        # results.
        # http://bugs.python.org/issue16208
        family = socket.AF_INET
    if flags is None:
        flags = socket.AI_PASSIVE


    for res in set(socket.getaddrinfo(address, port, family, socket.SOCK_DGRAM, 0, flags)):
        af, socktype, proto, canonname, sockaddr = res
        try:
            sock = socket.socket(af, socktype, proto)
        except socket.error as e:
            if e.args[0] == errno.EAFNOSUPPORT:
                continue
        set_close_exec(sock.fileno())
        if os.name != 'nt':
            sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        if af == socket.AF_INET6:
            # On linux, ipv6 sockets accept ipv4 too by default,
            # but this makes it impossible to bind to both
            # 0.0.0.0 in ipv4 and :: in ipv6.  On other systems,
            # separate sockets *must* be used to listen for both ipv4
            # and ipv6.  For consistency, always disable ipv4 on our
            # ipv6 sockets and use a separate ipv4 socket when needed.
            #
            # Python 2.x on windows doesn't have IPPROTO_IPV6.
            if hasattr(socket, "IPPROTO_IPV6"):
                sock.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 1)
        sock.setblocking(False)
        sock.bind(sockaddr)
        sockets.append(sock)

    return sockets


class UDPServer(object):
    def __init__(self, io_loop=None, max_buffer_size=None):
        self.io_loop = io_loop
        self._sockets = {}  # fd -> socket object
        self._pending_sockets = []
        self._started = False
        self.max_buffer_size = max_buffer_size

    def add_socket(self, socket):
        """Singular version of `add_sockets`.  Takes a single socket object."""
        self.add_sockets([socket])

    def add_sockets(self, sockets):
        """Makes this server start accepting connections on the given sockets.

        :param sockets: list of sockets to handle
        """
        if self.io_loop is None:
            self.io_loop = IOLoop.current()

        for sock in sockets:
            self._sockets[sock.fileno()] = sock
            self.add_accept_handler(sock, io_loop=self.io_loop)

    def add_accept_handler(self, sock, io_loop=None):

        io_loop = io_loop or IOLoop.current()

        io_loop.add_handler(sock.fileno(), partial(self.handle_events, sock),
                            IOLoop.ERROR | IOLoop.READ)


    def handle_events(self, sock, fd, events):

        if events & self.io_loop.ERROR:
            self.on_error_event(sock, fd, events)

        if events & self.io_loop.READ:
            self.on_read_event(sock, fd, events)

    def on_read_event(self, sock, fd, events):
        raise NotImplemented("on_sock_read not implemented")

    def on_error_event(self, sock, fd, events):
        raise NotImplemented("on_sock_read not implemented")

    def stop(self):
        """Stops listening for new connections.

        Requests currently in progress may still continue after the
        server is stopped.
        """
        for fd, sock in self._sockets.items():
            self.io_loop.remove_handler(fd)
            sock.close()

    def listen(self, port, address=""):
        """Starts accepting connections on the given port.

        :param port: port for listening
        :param address: specified address for lisnening
        """
        sockets = get_sockets_to_bind(port, address=address)
        self.add_sockets(sockets)


class UDPBackend(UDPServer, BaseBackend):

    def __init__(self, application, io_loop, config, storage, tasks, *args, **kwargs):
        self.io_loop = io_loop
        self.config = config
        self.storage = storage
        self.tasks = tasks
        self.application = application
        self.working = True
        self.current_in_progress = 0
        self.count = 0
        if 'max_buffer_size' not in kwargs:
            kwargs['max_buffer_size'] = self.backend_settings.get('max_buffer_size', 0)

        self._max_chunk_size = self.backend_settings.get('max_chunk_size', 1024)

        self.auth_delimiter = self.backend_settings.get('AUTH_DELIMITER', "--chunk-auth--")
        self.chunk_delimiter = self.backend_settings.get('CHUNK_DELIMITER',  "--chunk--")

        super(UDPBackend, self).__init__(*args, **kwargs)


    @classmethod
    def setup_backend(cls, application, io_loop, config, storage, tasks):
        """Install backend to ioloop

        :param ioloop: :class:`tornadoweb.ioloop.IOLoop` instance
        :param config: :class:`~gottwall.config.Config` instance
        """

        server = cls(application, io_loop, config, storage, tasks)
        port = server.backend_settings.get('PORT', "8897")
        host = server.backend_settings.get('HOST', "127.0.0.1")
        server.listen(port, host)

        logger.info("GottWall UDP transport listen {host}:{port}".format(port=port, host=host))
        return server

    def on_read_event(self, sock, fd, events):
        while True:
            try:
                chunk = sock.recvfrom(self._max_chunk_size)
                self.process_chunk(to_unicode(chunk[0]))
            except socket.error as e:
                if e.errno == errno.EWOULDBLOCK:
                    break
            except Exception as e:
                logger.error(e)
                continue

    def on_error_event(self, sock, fd, events):
        try:

            sock.close()
        except Exception as e:
            print(e)

    def process_chunk(self, chunk):
        try:
            auth, body = chunk.split(self.auth_delimiter)
        except Exception:
            logger.error("Invalid package format")
            return False

        if not self.check_gottwall_auth_s2(auth):
            return False

        chunks = body.split(self.chunk_delimiter)

        for chunk in chunks:
            if not chunk:
                continue

            data = self.parse_data(chunk)
            self.count += 1
            self.process_data(data['p'], data['a'], data)
