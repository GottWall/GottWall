#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall.storages
~~~~~~~~~~~~~~~~~

GottWall storages backends

:copyright: (c) 2012 by GottWall Team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/Lispython/gottwall
"""


import tornadoredis

from utils import get_by_period


class BaseStorage(object):
    """Base interface for calculation
    """

    def __init__(self, application):
        self._application = application

    @classmethod
    def setup(cls, application):
        """Setup storage to application
        """
        storage = cls(application)
        application.storage = storage
        return storage


    def incr(self, project, name, timestamp, value=1, filters=None, **kwargs):
        """Add count for metric `name` and `filters`

        :param project: project name
        :param name: metric name
        :param filters: list of names
        :param value: increment value
        """
        raise NotImplementedError

    def decr(self, project, name, timestamp, value=-1, filters=None, **kwargs):
        """Sub value from metric `name` in `project`

        :param project: project name
        :param name: metric name
        :param filters: list of names
        :param value: increment value
        """
        raise NotImplementedError

    def slice_data(self, period, from_date, to_date, filter_name, filter_value):
        """Get data by range and filters

        :param period: range periodic
        :param from_date: slice from
        :param to_date: slice to
        :param filter_name: slice for filter
        :param filter_value: slice for filter value
        """
        raise NotImplementedError



class MemoryStorage(BaseStorage):
    """Store keys in dict in memory

    Example:
    {"project_name":
    "metric_name:week:2012-7-11:f_name_value": 70}
    {"project_name":
    "metric_name:year:2012:f_name_value": 70}
    """
    def __init__(self, application):
        super(MemoryStorage, self).__init__(application)
        self._store = {}

    def save_value(self, project, key, value):
        """Setup metric value

        :param project: project name
        :param key: project key
        :param value: counter value
        """
        if project not in self._store:
            self._store[project] = {}
        self._store[project][key] = self._store[project].get(key, 0) + value

    def incr(self, project, name, timestamp, value=1, filters=None, **kwargs):
        """Add value to metric counter

        :param project: project name
        :param name: metric name
        :param timestamp: timestamp name
        :param value: increment value
        :param filters: dict of filters
        :param \*\*kwargs: additional kwargs
        """
        for period in self._application.config['PERIODS']:
            if filters:
                for fname, fvalue in filters.iteritems():
                    self.save_value(project,
                                   self.make_key(project, name, period, timestamp, fname, fvalue),
                                   value)
            self.save_value(project, self.make_key(project, name, period, timestamp), value)
        return True


    def decr(self, project, name, timestamp, value=1, filters=None, **kwargs):
        return self.incr(project, name, timestamp,  0 - abs(value), filters, **kwargs)

    def make_key(self, project, name, period, timestamp,
                 filtername=None, filtervalue=None):
        """Make key from parameters

        :param project: project name
        :param name: mertric name
        :param period: period prefix
        :param timestamp: timestamp
        :param filter: filtername
        """

        parts = [project, name, period, get_by_period(timestamp, period)]
        if filtername and filtervalue:
            parts.append("{0}|{1}".format(filtername, filtervalue))

        return ';'.join(parts)

    def get_metric_value(self, project, name, period, timestamp,
                         filtername=None, filtervalue=None):
        """Get value from metric

        :param project: project name
        :param name: metric name
        :param timestamp:
        :param filtername: filtername
        :param filtervalue: filtervalue
        """
        key = self.make_key(project, name, period, timestamp, filtername, filtervalue)
        return self._store[project].get(key, 0)

    def slice_data(self, period, from_date, to_date, filter_name, filter_value):
        """Calculate stored data
        """
        from datetime import datetime
        from random import choice
        data = [[datetime.utcnow().strftime("%Y-%m-%dT%H:%M:%S"),
                 choice(range(20))] for x in xrange(40)]
        return data


class RedisStorage(MemoryStorage):
    """Redis backend to store statistics
    """

    def __init__(self, application):
        super(RedisStorage, self).__init__(application)
        config = self._application.config

        self.client = tornadoredis.Client(host=config['REDIS_HOST'],
                                          port=config['REDIS_PORT'],
                                          password=config['REDIS_PASSWORD'],
                                          selected_db=config['REDIS_DB'])
        self.client.connect()

    def save_value(self, project, key, value):
        """Increment key value

        :param project: project name
        :param key: project key
        :param value: counter value
        """

        self.client.incr(key, value)
