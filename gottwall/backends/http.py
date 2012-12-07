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

import simplejson as json
from tornado.web import HTTPError

from gottwall.backends.base import BaseBackend
from gottwall.handlers import BaseHandler


class HTTPBackend(BaseHandler, BaseBackend):


    @staticmethod
    def merge_handlers(app):
        """Merge hosts handlers in application handler
        """
        hosts = {}
        handlers = app.handlers
        for host, patterns in handlers:
            if host not in hosts.keys():
                hosts[host] = []
            hosts[host] += patterns
        app.handlers = [(host, patterns) for host, patterns in hosts.items()]

    @classmethod
    def setup_backend(cls, app):
        """Setup data handler to `app`

        :param cls: :class:`BaseBackend` childrem class
        :param app: :class:`tornado.web.Application` instance
        """
        handlers = [
            (r"/(?P<project>.+)/api/store", cls), ]
        app.add_handlers(r".*$", handlers)

        cls.merge_handlers(app)

        cls.application = app

    def post(self, project, *args, **kwargs):
        if not self.validate_project(project):
            raise HTTPError(404, "Invalid project")

        if not self.validate_content_type():
            raise HTTPError(400, "Invalid content type")

        if not self.check_auth():
            raise HTTPError(403, "Forbidden")

        data = json.loads(self.request.body)
        self.process_data(project, data)

        self.write("OK")
        self.finish()

    def validate_project(self, project):
        """Validate projects name
        """
        return True

    def validate_content_type(self):
        if self.request.headers['content-type'] == 'application/json':
            return True
        return False

    def check_auth(self):
        """Check authorization headers
        """
        return True
