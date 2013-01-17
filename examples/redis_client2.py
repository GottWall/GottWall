#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import datetime
import redis
from random import randint, choice
from stati import RedisClient, Client

stats_client = RedisClient(private_key="my_private_key",
                           public_key="my_public_key",
                           project="test_project",
                           host="10.8.9.8",
                           db=2)
import time
from contextlib import contextmanager

def pretty_time(td):
    """Convert timedelta to pretty

    :param td: timedelta (t2 - t1)
    :return: delta string in seconds or minutes
    """
    if td < 300:
        return "{0} sec".format(td)
    else:
        return "{0} min".format((td / 60.0))

@contextmanager
def measure_time(title, logger=None, **debug_params):
    t1 = time.time()
    print('Started "{0}" at {1}'. format(title, time.ctime(t1)))
    yield
    t2 = time.time()
    print('Finished "{0}" at {1} for the time {2}'.\
          format(title, time.ctime(t2), pretty_time(t2-t1)))


with measure_time("Test stats"):
    for x in xrange(1000):

        stats_client.incr(choice([u"Test"]),
                          timestamp=datetime.datetime(choice([2012]), randint(1, 12), randint(1, 27)),
                          value=1,
                          filters={choice(["views", "orders", "filter1", "filter2"]): choice(["hello", "world", "registered"]),
                                  "clicks": "anonymouse"}
                          )

print("finish")
