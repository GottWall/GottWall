#!/usr/bin/env python
# -*- coding: utf-8 -*-

STORAGE = 'gottwall.storages.MemoryStorage'

BACKENDS = ['gottwall.backends.redis.RedisBackend',
            'gottwall.backends.tcpip.TCPIPBackend']


REDIS_HOST = 'localhost'
REDIS_PORT = 6379
REDIS_PASSWORD = None
REDIS_DB = 2


USERS = []

SECRET_KEY = "dwefwefwefwecwef"

# http://public_key:secret_key@host.com

PROJECTS = {"test_project": "public key",
            "another_project": "public_key2"}


cookie_secret="fkewrlhfwhrfweiurbweuybfrweoubfrowebfioubweoiufbwbeofbowebfbwup2XdTP1o/Vo=",
