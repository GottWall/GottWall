#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import datetime
import redis

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

r = redis.StrictRedis(host='localhost', port=6379, db=0)

r.publish("gottwall", json.dumps(metric_data))
