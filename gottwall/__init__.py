#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall
~~~~~~~~

GottWall is a scalable realtime metrics collecting and aggregation platform and service.

:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""

__all__ = 'get_version',
__author__ = "GottWal team"
__license__ = "BSD, see LICENSE for more details"
__maintainer__ = "Alexandr Lispython"

try:
    __version__ = __import__('pkg_resources') \
        .get_distribution('gottwall').version
except Exception, e:
    __version__ = 'unknown'

if __version__ == 'unknown':
    __version_info__ = (0, 0, 0)
else:
    __version_info__ = __version__.split('.')
__build__ = 0x000036

GOTTWALL_HOME = "http://demo.gottwall.com"
GOTTWALL_DESCRIPTION = "GottWall is a scalable realtime metrics aggrigation platform."

def get_version():
    return __version__
