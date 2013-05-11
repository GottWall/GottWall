#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.config
~~~~~~~~~~~~~~~

Gottwall configs wrapper

:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details.
:copyright: (c) 2012 by the Sentry Team.
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""
import imp
import os.path
import os
import base64

from settings import PERIODS


KEY_LENGTH = 40


class Config(dict):
    """Settings store
    """
    def __init__(self, **kwargs):
        dict.__init__(self, kwargs or {})

    def from_file(self, filename):
        """Load settings from pyfile with `filename`
        """
        filename = os.path.abspath(filename)
        d = imp.new_module('config')
        d.__file__ = filename
        try:
            execfile(filename, d.__dict__)
        except IOError, e:
            raise Exception("Unable to load configuration file {0}: ".\
                            format(filename, e))

        self.from_object(d)

        return True

    def from_object(self, obj):
        """Load settings from obj

        :param obj: object instance
        """
        for key in dir(obj):
            if not key.startswith('__'):
                self[key] = getattr(obj, key)
        return True

    def from_module(self, m):
        """Load settings from module

        :param m: module instance
        """
        return self.from_object(m)

    def __repr__(self):
        return '<{0} {1}>'.format(self.__class__.__name__, dict.__repr__(self))

default_settings = Config(**{
    "BACKENDS": ['gottwall.backends.HTTPBackend'],
    "STORAGE": "gottwall.storages.MemoryStorage",
    "PERIODS": PERIODS,
    "PROJECTS": {},
    "USERS": []})



CONFIG_TEMPLATE = """

import os.path

BACKENDS = {
    'gottwall.backends.redis.RedisBackend': {
        'HOST': "127.0.0.1",
        'PORT': 6379,
        'PASSWORD': None,
        'DB': 0,
        "CHANNEL": "gottwall",
        "MAX_LOADING": 150},
    'gottwall.backends.tcpip.TCPIPBackend': {}
    }

STORAGE = "gottwall.storages.RedisStorage"
STORAGE_SETTINGS = {
    "HOST": "127.0.0.1",
    "PORT": 6379,
    "PASSWORD": None,
    "DB": 2
}

# Projects
PROJECTS = {
    "project_name": "%(project_public_key)s"
}

USERS = []

ANONYMOUS_LOGIN = False

site_title=u"GottWall is a scalable realtime metrics collecting and aggregation platform and service."

PREFIX = '/gottwall'

SECRET_KEY = "%(secret_key)s"
cookie_secret = '%(cookie_secret)s'

HOME_AUTOREDIRECT = False

"""



def generate_settings():
    output = CONFIG_TEMPLATE % dict(
        cookie_secret=base64.b64encode(os.urandom(KEY_LENGTH)),
        secret_key=base64.b64encode(os.urandom(KEY_LENGTH)),
        project_public_key=base64.b64encode(os.urandom(KEY_LENGTH))
    )

    return output
