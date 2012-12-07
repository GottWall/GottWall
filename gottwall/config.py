#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.config
~~~~~~~~~~~~~~~

Gottwall configs wrapper

:copyright: (c) 2012 by Alexandr Lispython (alex@obout.ru).
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

        for key in dir(d):
            if not key.startswith('__'):
                self[key] = getattr(d, key)
        return d

    def __repr__(self):
        return '<{0} {1}>'.format(self.__class__.__name__, dict.__repr__(self))



default_settings = Config(**{
    "BACKENDS": ['gottwall.backends.HTTPBackend'],
    "STORAGE": "gottwall.storages.MemoryStorage",
    "PERIODS": PERIODS})
