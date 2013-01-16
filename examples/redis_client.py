#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import datetime
import redis
from random import randint, choice

metric_data = {"name": "my_metric_name",
               "timestamp": datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S"),
               "filters": {"views": "registered",
                           "clicks": "anonymouse"},
               "action": "incr",
               "value": 2,
               "auth": {
                   "private_key": "my_private_key",
                   "public_key": "my_public_key"
                   }}

r = redis.StrictRedis(host='10.8.9.8', port=6379, db=0)

r.publish("gottwall:{0}:{1}:{2}".format("test_project", "my_public_key", "dwefwefwefwecwef"), json.dumps(metric_data))

for x in xrange(1000):
    ts = datetime.datetime(2013, randint(1, 12), randint(1, 23)).strftime("%Y-%m-%dT%H:%M:%S")

    metric_data = {"name": choice(["my_metric_name", "another_metrics", "third_metric"]),
               "timestamp": ts,
               "filters": {choice(["views", "orders", "filter1", "filter2"]): choice(["hello", "world", "registered"]),
                           "clicks": "anonymouse"},
               "action": "incr",
               "value": 2,
               "auth": {
                   "private_key": "my_private_key",
                   "public_key": "my_public_key"
                   }}
    r.publish("gottwall:{0}:{1}:{2}".format("test_project", "my_public_key", "dwefwefwefwecwef"), json.dumps(metric_data))



print("finish")
