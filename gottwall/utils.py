#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall.utils
~~~~~~~~~~~~~~

Core GottWall utilities

:copyright: (c) 2012 by Alexandr Lispython (alex@obout.ru).
:license: , see LICENSE for more details.
:github: http://github.com/Lispython/projectname
"""

import os.path

from settings import PROJECT_ROOT


__all__ = 'rel',


def rel(*args):
    return os.path.join(PROJECT_ROOT, *args)
