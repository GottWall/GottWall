#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.backends.base
~~~~~~~~~~~~~~~~~~~~~~

Base backends for metric calculation

:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""

import json
from tornado import gen
from logging import getLogger

logger = getLogger("gottwall.storages")

class BaseBackend(object):

    application = None

    @property
    def backend_settings(self):
        """Backend specified settings
        """
        return self.config['BACKENDS'][self.key]

    def get_backend_status(self):
        """Print storage status
        """
        logger.info("{name} statistics: working[{working}] in_progress[{in_progress}]".format(
            name=self.__class__.__name__, working=self.working, in_progress=self.current_in_progress))

    @property
    def key(self):
        """Settings key for backend
        """
        return "{0}.{1}".format(self.__class__.__module__, self.__class__.__name__)

    @gen.engine
    def process_data(self, project, action, data, callback=None):
        """Process `data`
        """
        res = False

        if action not in ['incr', 'decr']:
            res = False
        else:
            res = (yield gen.Task(getattr(self.storage, action), project, *data[2:]))

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
    def parse_data(data, project=None):
        """Parse json bucket to dict

        :param data: string or unicode with data
        """
        parsed_data = json.loads(data.strip()) #parsed data

        parsed_data['project'] = parsed_data.get('p') or parsed_data.get('project') or project

        return parsed_data

    @staticmethod
    def parsed_data_to_list(parsed_data):
        """Convert parsed data to tuple
        """
        return (parsed_data.get('a') or parsed_data.get('action'),
                parsed_data.get('p') or parsed_data.get('project'),
                parsed_data.get('n') or parsed_data.get('name'),
                parsed_data.get('ts') or parsed_data.get('timestamp'),
                parsed_data.get('v') or parsed_data.get('value', 1),
                parsed_data.get('f') or parsed_data.get('filters'))



    def callback(self, message):
        """Process data from stream

        :param message: stream data
        """
        data = self.parse_data(message)

        if self.check_key(data['auth']['private_key'],
                          data['auth']['public_key'], data['project']):
            self.process_data(data['project'], data.get('a') or data.get('action'),
                              self.parsed_data_to_list(data))

        return True

    def shutdown(self):
        """Shutdown backend

        """
        self.working = False

    def ready_to_stop(self):
        if not self.working and self.current_in_progress <= 0:
            return True
        return False
