#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.backends.base
~~~~~~~~~~~~~~~~~~~~~~

Base backends for metric calculation

:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/gottwall/gottwall
"""
import json
from base64 import b64decode

import tornado.gen
from tornado.web import HTTPError

from gottwall.backends.base import BaseBackend
from gottwall.handlers import BaseHandler
from gottwall.utils import parse_dict_header


class HTTPBackend(BaseBackend, BaseHandler):

    def initialize(self, config):
        self.config = config

    ## def __init__(self, io_loop, config, storage, *args, **kwargs):
    ##     self.io_loop = io_loop
    ##     self.config = config
    ##     self.storage = storage
    ##     super(HTTPBackend, self).__init__(*args, **kwargs)

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

    @tornado.gen.engine
    def post(self, project, *args, **kwargs):
        self.storage = self.application.storage

        if not self.validate_project(project):
            raise HTTPError(404, "Invalid project")

        if not self.validate_content_type():
            raise HTTPError(400, "Invalid content type")

        if not self.check_auth(project):
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

    def check_auth(self, project):
        """Check authorization headers
        """

        header = self.request.headers.get("Authorization", None)
        gottwall_header = self.request.headers.get("X-GottWall-Auth", None)

        if gottwall_header:
            return self.check_gottwall_auth(gottwall_header, project)

        if not header:
            return False

        if header.startswith('Basic '):
            header = header[6:].strip()

        return self.check_basic_auth(header, project)

    def check_basic_auth(self, header, project):
        """Parse basic authorization header

        :param header: authorization header value
        """
        auth_info = header.split(None, 1)

        public_key, private_key = b64decode(auth_info[0]).split(":")

        return self.check_key(private_key, public_key, project)

    def check_gottwall_auth(self, header, project):
        """Check X-GottWall-Auth

        :param header: header string value
        :param project: project name
        """
        if header.startswith('GottWall'):
            header = header[8:]

        params = parse_dict_header(header)
        return self.check_key(params.get('private_key'),
                              params.get('public_key'), project)
