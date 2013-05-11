#!/usr/bin/env python
# -*- coding: utf-8 -*-


import json
import datetime
from random import randint, choice


from stati_http import HTTPClient

private_key = "dwefwefwefwecwef"
public_key = "my_public_key"
project = "test_project"

host = "http://127.0.0.1:8890"

stats_client = HTTPClient(
    private_key=private_key,
    public_key=public_key,
    project=project,
    host=host,
    prefix=None)


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
    for x in xrange(10000):
        stats_client.incr(choice([u"APIv1", "APIv2", "APIv3"]),
                          timestamp=datetime.datetime(choice([2012, 2013]), randint(1, 12), randint(1, 27)) + datetime.timedelta(days=randint(1, 4)),
                          value=randint(1, 10),
                          filters={choice(["status"]): choice(["200", "403", "500", "404", "401", "201"]),
                                  "users": choice(["anonymouse", "registered"])}
                          )

        if (x % 1000) == 0:
            print(x)


with measure_time("Test stats"):
    for x in xrange(10000):
        stats_client.incr(u"Actions",
                          timestamp=datetime.datetime(choice([2012, 2013]), randint(1, 12), randint(1, 27)) + datetime.timedelta(days=randint(1, 4)),
                          value=randint(1, 5),
                          filters={"views": choice(["products", "special page"]),
                                   "voting": choice(["up", "down"])}
                          )

        if (x % 1000) == 0:
            print(x)


with measure_time("Test stats"):
    for x in xrange(10000):
        stats_client.incr(choice([u"Reviews"]),
                          timestamp=datetime.datetime(choice([2012, 2013]), randint(1, 12), randint(1, 27)) + datetime.timedelta(days=randint(1, 4)),
                          value=randint(1, 5),
                          filters={})

        if (x % 1000) == 0:
            print(x)



with measure_time("Test stats"):
    for x in xrange(10000):
        stats_client.incr(choice([u"Orders"]),
                          timestamp=datetime.datetime(choice([2012, 2013]), randint(1, 12), randint(1, 27)) + datetime.timedelta(days=randint(1, 4)),
                          value=randint(1, 5),
                          filters={"status": choice(["Completed", "New", "Canceled"])})
        if (x % 1000) == 0:
            print(x)


print("finish")
