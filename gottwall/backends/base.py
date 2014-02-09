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
import hashlib
import hmac
from logging import getLogger

import ujson as json
from fast_utils.fstring import extract_if_startswith
from tornado import gen
from fast_utils.fstring import extract_if_startswith


logger = getLogger("gottwall.backends")


class DataProcessorMixin(object):

    def process_data(self, project, action, data, callback=None):
        """Process `data`
        """
        self.application.add_task(self.application.process_data, project, action, data, callback)


    def validate_action(self, action):
        return action in ['incr', 'decr']

    def validate_project(self, project):
        """Validate projects name
        """
        return project in self.config['PROJECTS']

    @staticmethod
    def parse_data(data, project=None):
        """Parse json bucket to dict

        :param data: string or unicode with data
        """
        try:
            parsed_data = json.loads(data) #parsed data
        except Exception as e:
            logger.error(e, exc_info=True)
            return {}

        if 'p' not in parsed_data:
            if project:
                parsed_data['p'] = project
            else:
                return {}

        return parsed_data


class AuthMixin(object):

    def check_gottwall_auth(self, header, project):
        """Check X-GottWall-Auth

        :param header: header string value
        GoottWallS1 1391854203 09944becfa73f5a2b433468b20cf417c 1000
        :param project: project name
        """
        header = extract_if_startswith(header, "GottWallS1")
        if not header:
            return False

        ts, sign, base = header.split()
        return self.check_sign(project, sign, ts, base)

    def check_gottwall_auth_s2(self, header):
        """Check client authentication

        :param header: authentication header string
        GoottWallS2 1391854203 09944becfa73f5a2b433468b20cf417c 1000 test_project
        """
        header = extract_if_startswith(header, "GottWallS2")

        if not header:
            return False

        try:
            ts, sign, base, project = header.split()
            if self.check_sign(project, sign, ts, base):
                self.project = project
                return True
        except Exception as e:
            return True

    def check_sign(self, project, sign, ts, base):
        private_key = self.config['SECRET_KEY']
        public_key = self.config['PROJECTS'][project]

        return sign == self.application.cache(self.get_hash, private_key,
                                              self.application.cache(
                                                  self.get_sign_msg, project, public_key, ts, base))

    def get_sign_solt(self, ts, base):
        return int(round(ts / base) * base)

    def get_sign_msg(self, project, public_key, ts, base):
        return public_key + str(self.get_sign_solt(int(ts), int(base)))

    def get_hash(self, private_key, sign_msg):
        return hmac.new(key=private_key, msg=sign_msg,
                        digestmod=hashlib.md5).hexdigest()


class BaseBackend(AuthMixin, DataProcessorMixin):

    application = None

    @property
    def backend_settings(self):
        """Backend specified settings
        """
        return self.config['BACKENDS'][self.key]

    def log_backend_status(self):
        """Print storage status
        """
        logger.info("{name} statistics: received[{count}] working[{working}] in_progress[{in_progress}]".format(
            name=self.__class__.__name__, working=self.working, in_progress=self.current_in_progress,
            **self.summary()))

    @property
    def key(self):
        """Settings key for backend
        """
        return "{0}.{1}".format(self.__class__.__module__, self.__class__.__name__)

    ## @gen.engine
    ## def process_data(self, project, action, data, callback=None):
    ##     """Process `data`
    ##     """
    ##     res = False

    ##     if action not in ['incr', 'decr']:
    ##         res = False
    ##     else:
    ##         res = (yield gen.Task(getattr(self.storage, action), project, *data[2:]))

    ##     if callback:
    ##         callback(res)


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
        return (public_key == self.config['PROJECTS'][project] and
                private_key == self.config['SECRET_KEY'])


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
        self.stop()

    def ready_to_stop(self):
        if not self.working and self.current_in_progress <= 0:
            return True
        return False

    @property
    def is_down(self):
        return not self.working

    @property
    def rps(self):
        return 0

    def summary(self):
        #logger.info("{0} received {1} items".format(self.__class__.__name__, self.count))
        return {"count": self.count}
