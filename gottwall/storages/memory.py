#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall.storage.memory
~~~~~~~~~~~~~~~~~~~~~~~

Memory storage for collect statistics

:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""

from base import BaseStorage
from gottwall.utils import get_by_period, MagicDict, date_min, timestamp_to_datetime
from tornado import gen


class MemoryStorage(BaseStorage):
    """Store keys in dict in memory

    """
    def __init__(self, application):
        super(MemoryStorage, self).__init__(application)
        self._store = MagicDict()
        self._metrics = {}
        self._embedded = {}

    def load_db(self, f):
        """Load data from f

        :param f: path to file
        """
        raise RuntimeError

    def save_db(self, f):
        """Save data to file

        :param f: path to file
        """
        raise RuntimeError

    @gen.engine
    def make_embedded(self, project, period, metrics=[],
                      renderer=None, name=None, callback=None):
        """Save metrics for share key
        """

        uid, data = super(MemoryStorage, self).make_embedded(
            project, period, metrics, renderer, name)

        self._embedded[uid] = data

        if callback:
            callback(uid)

    def get_embedded(self, h, callback=None):
        """Get metrics from share key

        :param h: embedded key
        """

        if callback:
            callback(self._embedded.get(h))


    def save_value(self, project, name, period, timestamp, fname=None, fvalue=None, value=1):
        """Save value to store dict

        :paran project: project name
        :param name: metric name
        :param period: period
        :param timestamp:
        :param fname:
        :param fvalue:
        :param value:
        """
        if not isinstance(fvalue, (list, tuple)):
            fvalues = [fvalue]
        else:
            fvalues = fvalue

        for filter_value in fvalues:

            # If cache with key to variable it doesn't work
            if isinstance(self._store[project][name][period][timestamp][fname][filter_value], MagicDict):
                self._store[project][name][period][timestamp][fname][filter_value] = value
            else:
                self._store[project][name][period][timestamp][fname][filter_value] += value
        return True

    @gen.engine
    def save_metric_meta(self, project, name, filters={}, callback=None):
        """Save metric filters

        :param project: project name
        :param name: metric name
        :param filters: metric filters
        """
        if project not in self._metrics:
            self._metrics[project] = {}

        if name not in self._metrics[project].keys():
            self._metrics[project][name] = {}

        if not filters:
            filters = {}

        for f, values in filters.iteritems():

            if f not in self._metrics[project][name].keys():
                self._metrics[project][name][f] = []

            if not isinstance(values, (list, tuple)):
                values = [values]

            for value in values:
                if value not in self._metrics[project][name][f]:
                    self._metrics[project][name][f].append(value)
        if callback:
            callback(True)

    @gen.engine
    def incr(self, project, name, timestamp, value=1, filters={}, callback=None, **kwargs):
        """Add value to metric counter

        :param project: project name
        :param name: metric name
        :param timestamp: timestamp name
        :param value: increment value
        :param filters: dict of filters
        :param \*\*kwargs: additional kwargs
        """
        timestamp = timestamp_to_datetime(timestamp)

        if filters:
            filters = dict(filters)

        for period in self._application.config['PERIODS']:
            if filters:
                for fname, fvalue in filters.items():
                    self.save_value(project, name, period,
                                    get_by_period(date_min(timestamp, period), period), fname, fvalue, value)
            self.save_value(project, name, period,
                            get_by_period(date_min(timestamp, period), period), None, None, value)

        self.save_metric_meta(project, name, filters)

        self.update_stats('incr')
        if callback:
            callback(True)

    def decr(self, project, name, timestamp, value=1, filters=None, callback=None, **kwargs):
        return self.incr(project, name, timestamp,  0 - abs(value), filters, **kwargs)

    @gen.engine
    def query(self, project, name, period, from_date=None,
                   to_date=None, filter_name=None, filter_value=None, callback=None):
        """Get statistics by filters
        """

        data_range = (yield gen.Task(self.get_range_for_metric,
                                     project, name, period, filter_name, filter_value))
        items = self.filter_by_period(data_range, period, from_date, to_date)

        self.update_stats('query')
        if callback:
            callback(self.get_range_info(items))

    def get_range_for_metric(self, project, name, period, filter_name=None,
                             filter_value=None, callback=None):
        """Get range list for metric

        :param project: project name
        :param name: metric name
        :param period: period name
        :param filter_name: filter_name
        :param fitler_value: filter_value
        """

        items = ((k, v[filter_name][filter_value] or 0)
                 for k, v in self._store[project][name][period].items())
        if callback:
            callback(sorted(items, key=lambda x: x[0]))


    @gen.engine
    def query_set(self, project, name, period, from_date=None,
              to_date=None, filter_name=None, callback=None):

        if callback:
            super(MemoryStorage, self).query_set(
                project, name, period, from_date,
                to_date, filter_name, callback)


    @gen.engine
    def get_filter_values(self, project, name, filter_name, callback=None):
        """Get filter values list

        :param project: project name
        :param name: metric name
        :param filter_name: filter_name
        :return: list of values
        """

        if callback:
            callback(self._metrics[project][name][filter_name])

    @gen.engine
    def get_filters(self, project, name, callback=None):
        """Get list of filters

        :param project: project name
        :param name: metric name
        """

        if callback:
            callback(filter(lambda x: x !=  None, self._metrics[project][name].keys()))

    @gen.engine
    def get_metrics_list(self, project, callback=None):
        """Get list of metrics
        """

        if callback:
            callback(self._metrics[project].keys() if project in self._metrics else [])

    @gen.engine
    def metrics(self, project, callback=None):
        """Return all metrics with filters

        :param project: project name
        :returns: result dict
        """

        if callback:
            if project not in self._metrics.keys():
                callback({})
            else:
                callback(self._metrics[project])
