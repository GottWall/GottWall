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
import tornado.gen


from utils import get_by_period, MagicDict, get_datetime


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
        self._store = MagicDict()

    def save_value(self, project, name, period, timestamp, fname=None, fvalue=None, value=1):
        """Save value to store dict
        """

        # If cache with key to variable it doesn't work
        if isinstance(self._store[project][name][period][timestamp][fname][fvalue], MagicDict):
            self._store[project][name][period][timestamp][fname][fvalue] = value
        else:
            self._store[project][name][period][timestamp][fname][fvalue] += value
        return self._store[project][name][period][timestamp][fname][fvalue]

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
                    self.save_value(project, name, period, get_by_period(timestamp, period), fname, fvalue, value)
            self.save_value(project, name, period, get_by_period(timestamp, period), None, None, value)
        return True


    def decr(self, project, name, timestamp, value=1, filters=None, **kwargs):
        return self.incr(project, name, timestamp,  0 - abs(value), filters, **kwargs)


    def get_metric_value(self, project, name, period, timestamp,
                         fvalue=None, fname=None):
        """Get value from metric

        :param project: project name
        :param name: metric name
        :param timestamp:
        :param filtername: filtername
        :param filtervalue: filtervalue
        """
        return self._store[project][name][period][get_by_period(timestamp, period)][fname][fvalue]

    def slice_data(self, project, name, period, from_date=None, to_date=None, filter_name=None, filter_value=None):
        """Calculate stored data
        """
        key = self._store[project][name][period]
        items = [(get_datetime(k, period), v[filter_name][filter_value]) for k, v in key.items()]
        items.sort(key = lambda x: x[0])
        return items


class RedisStorage(MemoryStorage):
    """Redis backend to store statistics
    """

    def __init__(self, application):
        super(RedisStorage, self).__init__(application)
        config = self._application.config

        self.client = tornadoredis.Client(host=config.get('REDIS_HOST', 'localhos'),
                                          port=config.get('REDIS_PORT', 6379),
                                          password=config.get('REDIS_PASSWORD', None),
                                          selected_db=config.get('REDIS_DB', 0))
        self.client.connect()

    @tornado.gen.engine
    def incr(self, project, name, timestamp, value=1, filters=None, **kwargs):
        pipe = self.client.pipeline()

        for period in self._application.config['PERIODS']:
            if filters:
                for fname, fvalue in filters.iteritems():
                    pipe.incr(self.make_key(project, name, period, timestamp, fname, fvalue), value)
            pipe.incr(self.make_key(project, name, period, timestamp, fname, fvalue), value)
        print("before execution")
        res = yield tornado.gen.Task(pipe.execute)
        #yield tornado.gen.Callback("done")
        print("Executed")

    def save_value(self, project, key, value):
        """Increment key value

        :param project: project name
        :param key: project key
        :param value: counter value
        """

        self.client.incr(key, value)


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

    def slice_data(self, project, name, period, from_date=None, to_date=None, filter_name=None, filter_value=None):

        import ipdb; ipdb.set_trace()

        return []
