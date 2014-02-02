#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall.backends.iostream
~~~~~~~~~~~~~~~~~~~~~~~~~~

Custom Tornado IOStream

:copyright: (c) 2014 by Alexandr Lispython (alex@obout.ru).
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""
import errno
import socket

from tornado import stack_context
from tornado.iostream import IOStream as BaseIOStream, _double_prefix
from tornado.log import gen_log


# These errnos indicate that a non-blocking operation must be retried
# at a later time.  On most platforms they're the same value, but on
# some they differ.
_ERRNO_WOULDBLOCK = (errno.EWOULDBLOCK, errno.EAGAIN)

# These errnos indicate that a connection has been abruptly terminated.
# They should be caught and handled less noisily than other errors.
_ERRNO_CONNRESET = (errno.ECONNRESET, errno.ECONNABORTED, errno.EPIPE)



class IOStream(BaseIOStream):

    def __init__(self, *args, **kwargs):
        super(IOStream, self).__init__(*args, **kwargs)
        self._read_delimiter_len = 0
        self._unload_counter = 0

    def read_by_delimiter_until_close(self, callback, streaming_callback=None, delimiter=None):
        """Reads all data from the socket until it is closed by delimiters.

        If a ``streaming_callback`` is given, it will be called with chunks
        of data as they become available, and the argument to the final
        ``callback`` will be empty.  Otherwise, the ``callback`` gets the
        data as an argument.

        Subject to ``max_buffer_size`` limit from `IOStream` constructor if
        a ``streaming_callback`` is not used.
        """
        self._set_read_callback(callback)
        self._read_delimiter = delimiter
        self._read_delimiter_len = len(delimiter)
        self._streaming_callback = stack_context.wrap(streaming_callback)

        if self.closed():

            if self._streaming_callback is not None:

                self._run_callback(self._streaming_callback,
                                   self._consume(self._read_buffer_size))


            self._run_callback(self._read_callback,
                               self._consume(self._read_buffer_size))
            self._streaming_callback = None
            self._read_callback = None
            return

        self._read_until_close = True
        self._streaming_callback = stack_context.wrap(streaming_callback)
        self._try_inline_read()


    ## def _read_to_buffer(self):
    ##     """Reads from the socket and appends the result to the read buffer.

    ##     Returns the number of bytes read.  Returns 0 if there is nothing
    ##     to read (i.e. the read returns EWOULDBLOCK or equivalent).  On
    ##     error closes the socket and raises an exception.
    ##     """
    ##     try:
    ##         chunk = self.read_from_fd()
    ##     except (socket.error, IOError, OSError) as e:
    ##         # ssl.SSLError is a subclass of socket.error
    ##         if e.args[0] in _ERRNO_CONNRESET:
    ##             # Treat ECONNRESET as a connection close rather than
    ##             # an error to minimize log spam  (the exception will
    ##             # be available on self.error for apps that care).
    ##             self.close(exc_info=True)
    ##             return
    ##         self.close(exc_info=True)
    ##         raise
    ##     if chunk is None:
    ##         return 0
    ##     self._read_buffer.append(chunk)
    ##     self._read_buffer_size += len(chunk)

    ##     if self._read_buffer_size >= self.max_buffer_size:
    ##         self.unload_buffer()
    ##     return len(chunk)

    def unload_buffer(self):
        """Process data from buffer to prevent overflow
        """
        pass

    def _read_from_buffer(self):
        """Attempts to complete the currently-pending read from the buffer.

        Returns True if the read was completed.
        """

        if (self._streaming_callback is not None and self._read_buffer_size and
            self._read_delimiter is not None):
            # Slow, very slow
            if self._read_buffer:
                while True:
                    loc = self._read_buffer[0].rfind(self._read_delimiter)
                    if loc !=- 1:
                        delimiter_len = len(self._read_delimiter)
                        # process via callback poped item from self._read_buffer
                        # spent 13% time of _read_from_buffer
                        chunk = self._consume(loc + delimiter_len)
                        #spent 15% time of _read_from_buffer
                        # because stack_context wrapper is bottleneck
                        self._run_callback(self._streaming_callback, chunk)

                    if (len(self._read_buffer) == 1 and loc ==- 1) or not self._read_buffer:
                        break

                    if loc == -1:
                        _double_prefix(self._read_buffer)

        elif self._streaming_callback is not None and self._read_buffer_size:
            bytes_to_consume = self._read_buffer_size
            if self._read_bytes is not None:
                bytes_to_consume = min(self._read_bytes, bytes_to_consume)
                self._read_bytes -= bytes_to_consume
            self._run_callback(self._streaming_callback,
                               self._consume(bytes_to_consume))
        elif self._read_bytes is not None and self._read_buffer_size >= self._read_bytes:
            num_bytes = self._read_bytes
            callback = self._read_callback
            self._read_callback = None
            self._streaming_callback = None
            self._read_bytes = None
            self._run_callback(callback, self._consume(num_bytes))
            return True
        elif self._read_delimiter is not None and not self._streaming_callback:
            # Multi-byte delimiters (e.g. '\r\n') may straddle two
            # chunks in the read buffer, so we can't easily find them
            # without collapsing the buffer.  However, since protocols
            # using delimited reads (as opposed to reads of a known
            # length) tend to be "line" oriented, the delimiter is likely
            # to be in the first few chunks.  Merge the buffer gradually
            # since large merges are relatively expensive and get undone in
            # consume().
            if self._read_buffer:
                while True:
                    loc = self._read_buffer[0].find(self._read_delimiter)
                    if loc != -1:
                        callback = self._read_callback
                        delimiter_len = len(self._read_delimiter)
                        self._read_callback = None
                        self._streaming_callback = None
                        self._read_delimiter = None
                        self._run_callback(callback, self._consume(loc + delimiter_len))
                        return True
                    if len(self._read_buffer) == 1:
                        break
                    _double_prefix(self._read_buffer)
        elif self._read_regex is not None:
            if self._read_buffer:
                while True:
                    m = self._read_regex.search(self._read_buffer[0])
                    if m is not None:
                        callback = self._read_callback
                        self._read_callback = None
                        self._streaming_callback = None
                        self._read_regex = None
                        self._run_callback(callback, self._consume(m.end()))
                        return True
                    if len(self._read_buffer) == 1:
                        break
                    _double_prefix(self._read_buffer)
        return False


    def close(self, *args, **kwargs):
        return super(IOStream, self).close(*args, **kwargs)

    def read_chunk(self):
        """Read chunk from socket

        :return: chunk from fd
        """
        try:
            chunk = self.read_from_fd()
        except (socket.error, IOError, OSError) as e:
            # ssl.SSLError is a subclass of socket.error
            if e.args[0] in _ERRNO_CONNRESET:
                # Treat ECONNRESET as a connection close rather than
                # an error to minimize log spam  (the exception will
                # be available on self.error for apps that care).
                self.close(exc_info=True)
                return None, 0
            self.close(exc_info=True)
            raise

        if chunk is None:
            return None, 0

        return chunk, len(chunk)

    def process_chunk(self, new_chunk, length=0):
        """Process new chunk from

        :param new_chunk:
        :reurn: bool result of operation
        """

        import ipdb; ipdb.set_trace()
        data = ''
        while self._read_buffer:
            try:
                data += self._read_buffer.popleft()
            except IndexError:
                break

        if new_chunk:
            data += new_chunk

        if not data:
            return True

        while True:
            loc = data.find(self._read_delimiter)

            if loc !=- 1:
                size = loc + self._read_delimiter_len
                chunk, data = s[:size], s[size:]
                self._run_callback(self._streaming_callback, chunk)
            else:
                self._read_buffer.append(data)
                self._read_buffer_size = len(data)
                break

        return False
