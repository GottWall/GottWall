#!/usr/bin/env python
# -*- coding: utf-8 -*-
import logging
import socket
from datetime import datetime, timedelta
try:
    import ujson as json
except Exception:
    import json

from random import randint, choice
import time

from stati_net.client import Client


logger = logging.getLogger('stati')

bad_requests = 0


class UDPClient(Client):
    """GottWall client to send data via
    """
    sock = None

    def __init__(self, project, private_key, public_key,
                 host='127.0.0.1', port=80, solt_base=1000,
                 timeout=socket._GLOBAL_DEFAULT_TIMEOUT,
                 max_packet_size=1024,
                 auth_delimiter="--chunk-auth--", chunk_delimiter="--chunk--"):
        super(UDPClient, self).__init__(project, private_key, public_key, solt_base)
        self.host, self.port = host, port
        self.timeout = timeout
        self.authenticated = False
        self._max_packet_size = max_packet_size
        self.auth_delimiter = auth_delimiter
        self.chunk_delimiter = chunk_delimiter

    @property
    def auth_header(self):
        ts = self.dt_to_ts(datetime.utcnow())
        return "GottWallS2 {0} {1} {2} {3}".format(
            ts, self.make_sign(ts), self._solt_base, self._project)


    def serialize(self, auth, action, name, timestamp, value, filters={}):
        """Serialize data to json

        """
        return json.dumps({"p": self._project,
                            "auth": self.auth_header,
                            "ts": self.dt_to_ts(timestamp),
                            "a": action,
                            "v": value,
                            "f": filters})


    def request(self, action, name, timestamp=None, value=1, filters={}):
        """Make request to api

        :param action: api action
        :param name: metric name
        :param timestamp: timestamp
        :param value: metric value
        :param filters: filters fict
        :return: request result
        """

        timestamp = timestamp or datetime.utcnow()

        try:
            auth = self.auth_header
            self.send_bucket(auth, self.serialize(auth, action, name, timestamp, value, filters))
        except Exception as e:
            print(e)
            #logger.error(e)
            return False
        return True

    def incr(self, *args, **kwargs):
        return self.request('incr', *args, **kwargs)

    def decr(self, *args, **kwargs):
        return self.request('decr', *args, **kwargs)

    def make_chunk(self, auth, data):
        """Make chunk with auth from given parameters

        :param auth:
        :param data:
        """
        return auth + self.auth_delimiter + data + self.chunk_delimiter

    def socket(self):
        if not self.sock:
            self.sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        return self.sock

    def send_bucket(self, auth, data):
        try:
            socket = self.socket()
            body = self.make_chunk(auth, data)

            if not self.is_valid_body(body):
                raise RuntimeError("Invalid body size")

            socket.sendto(body, (self.host, self.port))
        except Exception, e:
            print(e)
            global bad_requests
            bad_requests += 1

    def is_valid_body(self, data):
        if len(data) > self._max_packet_size:
            raise RuntimeError("The maximum size is exceeded: {0} > {1}".format(
                len(data), self._max_packet_size))
        return True


host = '127.0.0.1'
port = 8898

private_key = "secret_key"
public_key = "public_key"
project = "test_project"

stats_client = UDPClient(project=project, private_key=private_key,
                         public_key=public_key, host=host, port=port)



for x in xrange(10):
    stats_client.incr(**{"name": choice(["orders", "posts", "comments"]), "value": choice([2, 1]),
                     "timestamp": datetime.utcnow(),
                     "filters": {"status": ["Completed", "Test"]}})

time.sleep(10)

print("finished")
print("bad_requests{0}".format(bad_requests))
