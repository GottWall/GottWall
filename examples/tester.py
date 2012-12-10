#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import datetime
from base64 import b64encode
import human_curl as hurl

metric_data = {"name": "my_metric_name",
               "timestamp": datetime.datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S"),
               "filters": {"views": "registered",
                           "clicks": "anonymouse"},
               "action": "incr",
               "value": 2}

headers = (("content-type", "application/json"),
           ("Authorization", b64encode("{0}:{1}".format("public key", "dwefwefwefwecwef"))))

r = hurl.post("http://127.0.0.1:8889/test_project/api/store",  data=json.dumps(metric_data), headers=headers)

print r.content
