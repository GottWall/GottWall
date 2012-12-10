#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json

import socket
import datetime

host = '127.0.0.1'
port = 8887

metric_data = {"name": "my_metric_name",
               "timestamp": datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S"),
               "filters": {"views": "registered",
                           "clicks": "anonymouse"},
               "action": "incr",
               "value": 2,
               "project": "test_project",
               "auth": {
                   "private_key": "my_private_key",
                   "public_key": "my_public_key"
                   }}


s = socket.socket()
s.connect((host, port))
f= s.makefile('rwb', bufsize=0)
f.write(json.dumps(metric_data)+'\r\n\r\n')
response= f.read()
f.close()
s.close()

print("finished")
