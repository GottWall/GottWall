#!/usr/bin/env python
# -*- coding: utf-8 -*-

import human_curl as hurl
from urlparse import urljoin
from datetime import datetime
from stati_net import HTTPClient
from random import choice

private_key = "secret_key"
public_key = "public_key"
project = "test_project"

host = "127.0.0.1"

client = HTTPClient(
    private_key=private_key,
    public_key=public_key,
    project=project,
    host=host,
    port=8890,
    prefix="")


from human_curl.async import AsyncClient

test_data = {"name": "orders", "value": 2, "timestamp": datetime.now(),
             "filters": {"status": ["Completed", "Test"]}}

success_count = 0
fail_count = 0
bad_response_count = 0

def success_callback(response, **kwargs):
    """This function call when response successed
    """
    global bad_response_count, success_count

    if response.status_code != 200:
        bad_response_count += 1
        return
    success_count += 1


def fail_callback(request, opener, **kwargs):
    """Collect errors
    """
    global fail_count
    fail_count += 1


with AsyncClient(success_callback=success_callback,
                 fail_callback=fail_callback,
                 size=1000) as async_client:


    for x in xrange(10):
        test_data = {"name": choice(["orders", "posts", "comments"]), "value": choice([2, 1]),
                     "timestamp": datetime.utcnow(),
                     "filters": {"status": ["Completed", "Test"]}}
        async_client.post(url=client.get_url('incr'), data=client.serialize(**test_data),
                          headers=client.headers.items())

print("Success: {0}".format(success_count))
print("Fail: {0}".format(fail_count))
print("Bad response: {0}".format(bad_response_count))
