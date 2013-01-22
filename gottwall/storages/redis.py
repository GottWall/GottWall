#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall.storages.redis
~~~~~~~~~~~~~~~~~~~~~~~

Redis storage for collect statistics

:copyright: (c) 2012 by GottWall Team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/gottwall/gottwall
"""
from itertools import ifilter
from logging import getLogger

import tornado.gen
import tornadoredis
from tornado import gen
from tornado.gen import Task
from tornadoredis.exceptions import ConnectionError

from gottwall.settings import STORAGE_SETTINGS_KEY
from gottwall.storages.base import BaseStorage

from gottwall.utils import get_by_period, get_datetime, date_range
from gottwall.compat import OrderedDict

logger = getLogger()


class Client(tornadoredis.Client):
    def __init__(self, reconnect_callback=None, **kwargs):
        self._reconnect_callback = reconnect_callback
        super(Client, self).__init__(**kwargs)

    def on_disconnect(self):
        if self.subscribed:
            self.subscribed = False

        # self._reconnect_callback()
        raise ConnectionError("Connection lost")


class RedisStorage(BaseStorage):
    """Redis backend to store statistics

    Store counters in redis hash keys
    Key format:
    project_name;mertic_name;period;filter_name1|value1/filter_name2|value2 {
        "2012": 100,
        "2013": 200
        }
    """

    def __init__(self, application):
        super(RedisStorage, self).__init__(application)
        config = self._application.config

        self.client = Client(
            host=config[STORAGE_SETTINGS_KEY].get('HOST', 'localhost'),
            port=int(config[STORAGE_SETTINGS_KEY].get('PORT', 6379)),
            password=config[STORAGE_SETTINGS_KEY].get('PASSWORD', None),
            selected_db=int(config[STORAGE_SETTINGS_KEY].get('DB', 0)))

        logger.debug("Redis storage client {0}".format(repr(self.client)))
        self.client._reconnect_callback = self.client.connect

        self.client.connect()
        self.client.select(self.client.selected_db)

    @gen.engine
    def save_metric_meta(self, pipe, project, name,
                         filters=None, callback=None):
        """Save metric filters

        :param project: project name
        :param name: metric name
        :param filters: metric filters
        """
        if not filters:
            filters = {}

        pipe.sadd(self.get_metrics_key(project), name)

        for f, values in filters.iteritems():
            pipe.sadd(self.get_filters_names_key(project, name), f)

            if isinstance(values, (list, tuple)):
                for value in values:
                    pipe.sadd(self.get_filters_values_key(project, name, f), value)
            else:
                pipe.sadd(self.get_filters_values_key(project, name, f), values)

        if callback:
            callback()

    def get_metrics_key(self, project):
        """Get key for metrics list

        :param project: project name
        """
        return "{0}-metrics".format(project)

    def get_filters_values_key(self, project, metric_name, f):
        """Get key for filter values list

        :param project:
        :param metric_name:
        :param f: filter name
        """
        try:
            return u"{0}-metrics-filter-values:{1}:{2}".format(project, metric_name, f)
        except UnicodeDecodeError:
            return u"{0}-metrics-filter-values:{1}:{2}".format(project, metric_name.decode("utf-8"), f)

    def get_filters_names_key(self, project, metric_name):
        """Get key for metrics filters names

        :param project: project name
        :param metric_name: metric name
        """
        try:
            return u"{0}-metrics-filters:{1}".format(project, metric_name)
        except UnicodeDecodeError:
            return u"{0}-metrics-filters:{1}".format(project, metric_name.decode("utf-8"))

    @tornado.gen.engine
    def incr(self, project, name, timestamp, value=1, filters=None, callback=None, **kwargs):
        """Make incr in redis hash
        """

        pipe = self.client.pipeline(transactional=True)
        pipe.select(self.client.selected_db)

        for period in self._application.config['PERIODS']:
            if filters:
                for fname, fvalue in filters.iteritems():
                    if not isinstance(fvalue, (list, tuple)):
                        # Make incr for all values
                        fvalue = [fvalue]

                    for fvalue_item in fvalue:
                        pipe.hincrby(self.make_key(
                            project, name, period, {fname: fvalue_item}),
                                     get_by_period(timestamp, period), value)

            pipe.hincrby(self.make_key(project, name, period), get_by_period(timestamp, period), value)

            self.save_metric_meta(pipe, project, name, filters)

        res = (yield gen.Task(pipe.execute))

        if callback:
            callback(res)

    def make_key(self, project, name, period, filters=None):
        """Make key from parameters

        :param project: project name
        :param name: mertric name
        :param period: period prefix
        :param timestamp: timestamp
        :param fname: filter name
        :param fvalue: fil

        """

        parts = [project, name, period]

        if isinstance(filters, dict):
            filters_part = u"/".join(
                [u"{0}|{1}".format(f, filters[f])
                 for f in sorted(filters.keys(), key=lambda x: x) if f])

            if filters_part:
                parts.append(filters_part)

        return u';'.join(parts)

    def filter_by_period(self, data, period, from_date=None, to_date=None):
        """Fulter statistics by `from_date` and `to_date`

        :param from_data:
        :param to_date:
        :return: ifilter generator

        """

        if from_date and to_date:
            new_data = OrderedDict(map(lambda x: (x, 0), date_range(from_date, to_date, period)))
            new_data.update(data)
        else:
            new_data = OrderedDict(data)

        return map(lambda x: (get_by_period(x[0], period), x[1]),
                   sorted(ifilter(lambda x: (True if from_date is None else x[0] >= from_date) and \
                                  (True if to_date is None else x[0] <= to_date), new_data.iteritems()),
                          key=lambda x: x[0]))

    @gen.engine
    def slice_data(self, project, name, period, from_date=None, to_date=None,
                   filter_name=None, filter_value=None, callback=None):

        key = self.make_key(project, name, period,
                            {filter_name: filter_value})

        items = yield Task(self.client.hgetall, key)

        if callback:
            callback(self.filter_by_period(map(lambda x: (get_datetime(x[0], period), x[1]), items.iteritems()),
                period,
                from_date, to_date))

    @tornado.gen.engine
    def metrics(self, project, callback=None):
        """Return all metrics with filters

        :param project: project name
        :returns: result dict
        """
        client = self.client

        self.client.select(self.client.selected_db)

        metrics = {}

        for metric_name in (yield gen.Task(client.smembers,
                                       self.get_metrics_key(project))):
            if metric_name not in metrics.keys():
                metrics[metric_name] = {}

            for filter_name in (yield gen.Task(client.smembers,
                                           self.get_filters_names_key(project, metric_name))):
                metrics[metric_name][filter_name] = list(
                    sorted((yield gen.Task(client.smembers,
                                       self.get_filters_values_key(project, metric_name, filter_name)))))

        if callback:
            callback(metrics)
