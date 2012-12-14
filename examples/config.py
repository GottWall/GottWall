#!/usr/bin/env python
# -*- coding: utf-8 -*-

STORAGE = 'gottwall.storages.RedisStorage'

BACKENDS = {
    'gottwall.backends.redis.RedisBackend': {
        'HOST': "10.8.9.8",
        'PORT': 6379,
        'PASSWORD': '',
        'DB': 0,
        "CHANNEL": "gottwall"},
    'gottwall.backends.tcpip.TCPIPBackend': {}
    }

TEMPLATE_DEBUG = True

STORAGE_SETTINGS = {
    "HOST": "10.8.9.8",
    "PORT": 6379,
    "PASSWORD": None,
    "DB": 0}

REDIS = {"CHANNEL": "gottwall"}


USERS = []

SECRET_KEY = "dwefwefwefwecwef"

# http://public_key:secret_key@host.com

PROJECTS = {"test_project": "my_public_key",
            "another_project": "public_key2"}


cookie_secret="fkewrlhfwhrfweiurbweuybfrweoubfrowebfioubweoiufbwbeofbowebfbwup2XdTP1o/Vo=",

TEMPLATE_DEBUG = True


DATABASE = {
    "ENGINE": "postgresql+psycopg2",
    "HOST": "localhost",
    "PORT": 5432,
    "USER": "postgres",
    "PASSWORD": "none",
    "NAME": "gottwall"
    }
