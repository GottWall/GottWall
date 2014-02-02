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


class TCPIPClient(Client):
    """GottWall client to send data via
    """
    sock = None

    def __init__(self, project, private_key, public_key,
                 host='127.0.0.1', port=80, solt_base=1000,
                 timeout=socket._GLOBAL_DEFAULT_TIMEOUT):
        super(TCPIPClient, self).__init__(project, private_key, public_key, solt_base)
        self.host, self.port = host, port
        self.timeout = timeout
        self.authenticated = False

    @property
    def auth_header(self):
        ts = self.dt_to_ts(datetime.utcnow())
        return "GottWallS2 {0} {1} {2} {3}".format(ts, self.make_sign(ts), self._solt_base, self._project)


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

    def connect(self):
        sock = socket.create_connection((self.host, self.port), self.timeout)
        sock.setsockopt(socket.IPPROTO_TCP, socket.TCP_NODELAY, 1)
        return sock


    @property
    def connection(self):
        if not self.sock:
            self.sock = self.connect()
        return self.sock

    def send_bucket(self, auth, data):
        try:
            if not self.authenticated:
                self.authenticate_connection(auth)
            self.connection.send(data + "--chunk--")
        except Exception as e:
            print(e)
            global bad_requests
            bad_requests += 1

    def authenticate_connection(self, auth):
        """Authenticate connection
        """
        if not self.sock:
            self.sock = self.connect()
            # Every new connection not authenticated
            self.authenticated = False

        if not self.authenticated:
            self.sock.send(auth + "--stream-auth--")
            resp = self.sock.recv(2)

            if resp == "OK":
                print("Authenticated")
                self.authenticated = True
                return True
            raise RuntimeError("Can't authenticate connection")

        return True


    ## def send_bucket(self, auth, data):
    ##     try:
    ##         conn = self.connect()
    ##         conn.send("--chunk--" + auth + "--chunk-auth--" + data + "--chunk--")
    ##         conn.close()
    ##     except Exception as e:
    ##         global bad_requests
    ##         bad_requests += 1



host = '127.0.0.1'
port = 8897

private_key = "secret_key"
public_key = "public_key"
project = "test_project"

stats_client = TCPIPClient(project=project, private_key=private_key,
                     public_key=public_key, host=host, port=port)


for x in xrange(1000000):
    stats_client.incr(**{"name": choice(["orders", "posts", "comments"]), "value": choice([2, 1]),
                     "timestamp": datetime.utcnow(),
                     "filters": {"status": ["Completed", "Test"]}})

#time.sleep(120)

print("finished")
print("bad_requests{0}".format(bad_requests))


# real    2m46.798s
# user    0m35.410s
# sys     0m12.645s
