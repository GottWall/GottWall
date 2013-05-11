#!/usr/bin/env python
# -*- coding: utf-8 -*-

STORAGE = 'gottwall.storages.RedisStorage'

BACKENDS = {
    'gottwall.backends.redis.RedisBackend': {
        'HOST': "10.8.9.8",
        'PORT': 6379,
        'PASSWORD': None,
        'DB': 2,
        "CHANNEL": "gottwall",
        "MAX_LOADING": 350,
        "PERIODIC_PROCESSOR_TIME": 1000},
    'gottwall.backends.tcpip.TCPIPBackend': {}
    }


STORAGE_SETTINGS = dict(
    HOST="10.8.9.8",
    PORT=6379,
    PASSWORD=None,
    DB=2
)

REDIS = {"CHANNEL": "gottwall"}

ANONYMOUS_LOGIN = True

USERS = []

SECRET_KEY = "dwefwefwefwecwef"

# http://public_key:secret_key@host.com

PROJECTS = {"test_project": "my_public_key",
            "another_project": "my_public_key",
            "SampleProject": "my_public_key"}

cookie_secret="fkewrlhfwhrfweiurbweuybfrweoubfrowebfioubweoiufbwbeofbowebfbwup2XdTP1o/Vo="

TEMPLATE_DEBUG = True
TEMPLATE_DEBUG_RELOAD = True


DATABASE = {
    "ENGINE": "postgresql+psycopg2",
    "HOST": "localhost",
    "PORT": 5432,
    "USER": "postgres",
    "PASSWORD": "none",
    "NAME": "gottwall"
    }


PREFIX = ''

site_title = "GottWall"
