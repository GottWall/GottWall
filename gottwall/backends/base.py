#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.backends.base
~~~~~~~~~~~~~~~~~~~~~~

Base backends for metric calculation

:copyright: (c) 2012 by Alexandr Lispython (alex@obout.ru).
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

    def setup_backend(self, app):
        """Setup backend for application

        :param app: :class:`tornado.web.Application` instance
        """
        raise NotImplementedError("You need reimplement setup_backend method")
