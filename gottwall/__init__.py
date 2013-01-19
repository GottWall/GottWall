#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall
~~~~~~~~

Simple statistics aggregator


:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
"""

__all__ = 'get_version',
__author__ = "GottWal team"
__license__ = "BSD, see LICENSE for more details"
__version_info__ = (0, 1, 21)
__build__ = 0x000029
__version__ = ".".join(map(str, __version_info__))
__maintainer__ = "Alexandr Lispython"


def get_version():
    return __version__

