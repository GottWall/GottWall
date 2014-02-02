#!/usr/bin/env python
# -*- coding: utf-8 -*-

STORAGE = 'gottwall.storages.MemoryStorage'

# Need to install gottwall_backend_redis package
BACKENDS = {
    'gottwall.backends.http.HTTPBackend': {
        "HOST": "0.0.0.0",
        "PORT": "8890"
    },
    'gottwall.backends.tcpip.TCPIPBackend': {
        "HOST": "127.0.0.1",
        "PORT": "8897",
        "PROCESSOR_CALLBACK_TIME": 1000
        }
    }

TEMPLATE_DEBUG = True

STORAGE_SETTINGS = dict(
    HOST = 'localhost',
    PORT = 6379,
    PASSWORD = None,
    DB = 2
)

REDIS = {"CHANNEL": "gottwall"}


USERS = ["sergeevvv@gmail.com", "alexandr.s.rus@gmail.com"]

SECRET_KEY = "secret_key"

# http://public_key:secret_key@host.com
PROJECTS = {"test_project": "public_key",
            "another_project": "public_key2"}

cookie_secret="fkewrlhfwhrfweiurbweuybfrweoubfrowebfioubweoiufbwbeofbowebfbwup2XdTP1o/Vo="

TEMPLATE_DEBUG = True


DATABASE = {
    "ENGINE": "postgresql+psycopg2",
    "HOST": "localhost",
    "PORT": 5432,
    "USER": "postgres",
    "PASSWORD": "none",
    "NAME": "gottwall"
    }
PREFIX = ""

STATUS_PROCESSOR_TIME = 5000
PERIODIC_PROCESSOR_TIME = 1

LOG_REQUEST = False
