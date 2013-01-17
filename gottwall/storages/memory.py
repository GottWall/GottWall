#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall.storage.memory
~~~~~~~~~~~~~~~~~~~~~~~

Memory storage for collect statistics

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/Lispython/GottWall
"""

from itertools import ifilter
from base import BaseStorage
from gottwall.utils import get_by_period, MagicDict, get_datetime
from tornado import gen


class MemoryStorage(BaseStorage):
    """Store keys in dict in memory

    """
    def __init__(self, application):
        super(MemoryStorage, self).__init__(application)
        self._store = MagicDict()
        self._metrics = {}

    def load_db(self, f):
        """Load data from f

        :param f: path to file
        """
        raise RuntimeError

    def save_db(self, f):
        """Save data to file
        """
        raise RuntimeError

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
    def incr(self, project, name, timestamp, value=1, filters=None, callback=None, **kwargs):
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
                    self.save_value(project, name, period,
                                    get_by_period(timestamp, period), fname, fvalue, value)
            self.save_value(project, name, period,
                            get_by_period(timestamp, period), None, None, value)

        self.save_metric_meta(project, name, filters)

        if callback:
            callback(True)

    def decr(self, project, name, timestamp, value=1, filters=None, callback=None, **kwargs):
        return self.incr(project, name, timestamp,  0 - abs(value), filters, **kwargs)

    @gen.engine
    def slice_data(self, project, name, period, from_date=None,
                   to_date=None, filter_name=None, filter_value=None, callback=None):
        """Get statistics by filters
        """

        key = self._store[project][name][period]
        items = [(k, v[filter_name][filter_value]) for k, v in key.items()]
        items.sort(key=lambda x: x[0])

        items = self.filter_by_period(items, period, from_date, to_date)

        if callback:
            callback(items)


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

    def filter_by_period(self, data, period, from_date=None, to_date=None):
        """Fulter statistics by `from_date` and `to_date`

        :param from_data: datetime instance
        :param to_date: datetime instance
        :return: ifilter generator
        """
        if period == 'all':
            return data
        return ifilter(lambda x: (True if from_date is None else get_datetime(x[0], period) >= from_date) and \
                       (True if to_date is None else get_datetime(x[0], period) <= to_date), data)

