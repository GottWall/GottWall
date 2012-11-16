#!/usr/bin/env python
# -*- coding:  utf-8 -*-
"""
gottwall
~~~~~~~~~~~~~~~~~~

Simple statistics aggregator


:copyright: (c) 2011 - 2012 by Alexandr Lispython (alex@obout.ru).
:license: BSD, see LICENSE for more details.
"""

__all__ = 'get_version',
__author__ = "Alex Lispython (alex@obout.ru)"
__license__ = "BSD, see LICENSE for more details"
__version_info__ = (0, 0, 1)
__build__ = 0x00001
__version__ = ".".join(map(str, __version_info__))
__maintainer__ = "Alexandr Lispython (alex@obout.ru)"


def get_version():
    return __version__

