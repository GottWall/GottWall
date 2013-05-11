#!/usr/bin/env python
# -*- coding: utf-8 -*-

STORAGE = 'gottwall.storages.MemoryStorage'

BACKENDS = {
    'gottwall.backends.tcpip.TCPIPBackend': {}
    }

TEMPLATE_DEBUG = True

STORAGE_SETTINGS = dict()

REDIS = {"CHANNEL": "gottwall"}


USERS = [ "alexandr.s.rus@gmail.com"]

SECRET_KEY = "dwefwefwefwecwef"

# http://public_key:secret_key@host.com

PROJECTS = {"test_project": "my_public_key",
            "another_project": "public_key2"}

cookie_secret="fkewrlhfwhrfweiurbweuybfrweoubfrowebfioubweoiufbwbeofbowebfbwup2XdTP1o/Vo="

TEMPLATE_DEBUG = True

PREFIX = ""

PERIODIC_PROCESSOR_TIME = 500
STATUS_PROCESSOR_TIME = 1000 * 30 * 1

TASKS_CHUNK = 100
