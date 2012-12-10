#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.config
~~~~~~~~~~~~~~~

Gottwall configs wrapper

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/Lispython/gottwall
"""
import imp
import os.path
from settings import PERIODS


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
            raise Exception("Unable to load configuration file {0}: ".format(filename, e))

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
