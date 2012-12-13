#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.jinja_utils
~~~~~~~~~~~~~~~~~~~~

Jinja configuration utils

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/Lispython/GottWall
"""


def load_filters(filters):
    result = {}
    for m in filters:
        f = __import__(m, fromlist=['filters'])
        result.update(f.filters)
    return result

def load_extensions(extensions):
    """
    Load the extensions from the list and bind it to the environment.
    Returns a dict of instanciated environments.
    """
    result = {}
    for extension in extensions:
        if isinstance(extension, basestring):
            extension = import_string(extension)
        result[extension.identifier] = extension(environment)
    return result

def load_globals(globals, key="globals"):
    result = {}
    for m in globals:
        f = __import__(m, fromlist=[key])
        result.update(f.globals)
    return result
