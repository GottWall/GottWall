#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.backends.base
~~~~~~~~~~~~~~~~~~~~~~

Base backends for metric calculation

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/Lispython/gottwall
"""

class BaseBackend(object):
    application = None

    def __init__(self, *args, **kwargs):
        pass

    def process_data(self, project, data):
        """Process `data`
        """
        if data.get('action', 'incr') == 'incr':
            data.pop('action', None)
            self.application.storage.incr(project, **data)
        return True

    def setup_backend(self, io_loop, config):
        """Setup backend for application

        :param app: :class:`tornado.web.Application` instance
        """
        raise NotImplementedError("You need reimplement setup_backend method")

    def check_key(self, private_key, public_key, project):
        """Check private and public priject keys

        :param private_key:
        :param public_key:
        :param project: project name
        """

        if public_key == self.config['PROJECTS'][project] and \
               private_key == self.config['PRIVATE_KEY']:
            return True
        return False
