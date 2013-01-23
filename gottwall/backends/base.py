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

import json
from tornado import gen

class BaseBackend(object):

    application = None

    @property
    def backend_settings(self):
        """Backend specified settings
        """
        return self.config['BACKENDS'][self.key]

    @property
    def key(self):
        """Settings key for backend
        """
        return "{0}.{1}".format(self.__class__.__module__, self.__class__.__name__)

    @gen.engine
    def process_data(self, project, data, callback=None):
        """Process `data`
        """
        res = False
        if data.get('action', 'incr') == 'incr':
            data.pop('action', None)

            res = (yield gen.Task(self.storage.incr, project, **data))

        if callback:
            callback(res)


    def setup_backend(self, application, io_loop, config, storage, tasks):
        """Setup backend for application

        :param io_loop: :class:`tornado.ioloop.IOLoop` instance
        :param config: :class:`gottwall.config.Config` instance
        :param storage: :class:`gottwall.storage.Storage` instance
        """
        raise NotImplementedError("You need reimplement setup_backend method")

    def check_key(self, private_key, public_key, project):
        """Check private and public priject keys

        :param private_key: gottwall installation private key
        :param public_key: gottwall project public key
        :param project: project name
        """

        if public_key == self.config['PROJECTS'][project] and \
               private_key == self.config['SECRET_KEY']:
            return True
        return False

    @staticmethod
    def parse_data(data):
        """Parse json bucket to dict

        :param data: string or unicode with data
        """
        return json.loads(data.strip())

    def callback(self, message):
        """Process data from stream

        :param message: stream data
        """
        data = self.parse_data(message)

        if self.check_key(data['auth']['private_key'],
                          data['auth']['public_key'], data['project']):
            self.process_data(data['project'], data)

        return True

    def shutdown(self):
        """Shutdown backend

        """
        self.working = False

    def ready_to_stop(self):
        if not self.working and self.current_in_progress <= 0:
            return True
        return False
