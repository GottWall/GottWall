#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall.storages.redis
~~~~~~~~~~~~~~~~~~~~~~~

Redis storage for collect statistics

:copyright: (c) 2012 - 2013 by GottWall Team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""
import uuid
from logging import getLogger
from types import NoneType

import tornado.gen
from tornado.escape import json_decode, json_encode
import tornadoredis
from tornado import gen
from tornado.gen import Task
from tornado.escape import to_unicode
from tornadoredis.exceptions import ConnectionError

from gottwall.settings import STORAGE_SETTINGS_KEY
from gottwall.storages.base import BaseStorage
from gottwall.utils import get_by_period, timestamp_to_datetime, date_min


logger = getLogger()


class Client(tornadoredis.Client):
    def __init__(self, reconnect_callback=None, **kwargs):
        self._reconnect_callback = reconnect_callback
        super(Client, self).__init__(**kwargs)

    ## def on_disconnect(self):
    ##     if self.subscribed:
    ##         self.subscribed = False

    ##     # self._reconnect_callback()
    ##     raise ConnectionError("Connection lost")


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
        self.selected_db = int(config[STORAGE_SETTINGS_KEY].get('DB', 0))

        self.client = Client(
            host=config[STORAGE_SETTINGS_KEY].get('HOST', 'localhost'),
            port=int(config[STORAGE_SETTINGS_KEY].get('PORT', 6379)),
            password=config[STORAGE_SETTINGS_KEY].get('PASSWORD', None),
            selected_db=self.selected_db)

        logger.info("Redis storage client {0}".format(repr(self.client)))
        self.client._reconnect_callback = self.client.connect

        self.client.connect()
        self.client.select(self.selected_db)

    @gen.engine
    def make_embedded(self, project, period, metrics=[],
                      renderer=None, name=None, callback=None):
        """Save chart data for sharings

        :param project: project name
        :param metrics: list of metrics
        :param callback: callback function for async call
        """
        uid, data = super(RedisStorage, self).make_embedded(
            project, period, metrics, renderer, name)

        json_data = json_encode(data)
        res = (yield gen.Task(self.client.set,
                              self.make_embedded_key(uid), json_data))

        if callback:
            callback(uid if res else None)


    def get_status(self):
        super(RedisStorage, self).get_status()


    @gen.engine
    def get_embedded(self, uid, callback=None):
        """Get share data from storage by hash
        """
        try:
            json_data = (yield gen.Task(self.client.get, self.make_embedded_key(uid)))
            data = json_decode(json_data)
        except Exception:
            data = {}

        if callback:
            callback(data)

    @staticmethod
    def make_embedded_key(uid):
        """Make key for embedded chart data

        :param uid: unique embedded chart identificator string
        :return: key string
        """
        return "embedded-{0}".format(uid)

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
        return u"{0}-metrics-filter-values:{1}:{2}".format(project,
                                                           to_unicode(metric_name),
                                                           to_unicode(f))

    def get_filters_names_key(self, project, metric_name):
        """Get key for metrics filters names

        :param project: project name
        :param metric_name: metric name
        """
        return u"{0}-metrics-filters:{1}".format(project, to_unicode(metric_name))

    @tornado.gen.engine
    def incr(self, project, name, timestamp, value=1, filters={}, callback=None, **kwargs):
        """Make incr in redis hash

        :param project: project name
        :param name: metric name
        :param timestamp: timstamp object
        :param value: increment value
        :param filters: dict of filters
        """

        pipe = self.client.pipeline(transactional=True)
        pipe.select(self.selected_db)

        timestamp = timestamp_to_datetime(timestamp)

        if filters:
            filters = dict(filters)

        for period in self._application.config['PERIODS']:
            if filters:
                for fname, fvalue in filters.iteritems():
                    if not isinstance(fvalue, (list, tuple)):
                        # Make incr for all values
                        fvalue = [fvalue]

                    for fvalue_item in fvalue:
                        pipe.hincrby(self.make_key(
                            project, name, period, {fname: fvalue_item}),
                                     get_by_period(date_min(timestamp, period), period), value)

            pipe.hincrby(self.make_key(project, name, period), get_by_period(date_min(timestamp, period), period), value)

            self.save_metric_meta(pipe, project, name, filters)

        res = (yield gen.Task(pipe.execute))

        self.update_stats('incr')

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
                [u"{0}|{1}".format(f, to_unicode(self.clean_filter_value(filters[f])))
                 for f in sorted(filters.keys(), key=lambda x: x) if f])

            if filters_part:
                parts.append(filters_part)

        return u';'.join(parts)


    @gen.engine
    def query(self, project, name, period, from_date=None, to_date=None,
              filter_name=None, filter_value=None, callback=None):

        items = (yield Task(self.get_range_for_metric, project, name, period, filter_name, filter_value))

        data_range = self.filter_by_period(items, period, from_date, to_date)

        self.update_stats("query")

        if callback:
            callback(self.get_range_info(data_range))

    @gen.engine
    def get_filter_values(self, project, metric_name, filter_name, callback=None):
        """Get filter values list

        :param filter_name: filter_name
        :return: list of values
        """
        values = sorted((yield gen.Task(
            self.client.smembers,
            self.get_filters_values_key(project, metric_name, filter_name))))

        if callback:
            callback(values)

    @gen.engine
    def get_filters(self, project, metric_name, callback=None):
        """Get list of filters

        :param project: projet name
        :param metric_name: metric name
        :return: list of filters
        """
        filters = sorted((yield gen.Task(self.client.smembers,
                                         self.get_filters_names_key(project, metric_name))))
        if callback:
            callback(filters)


    @gen.engine
    def get_metrics_list(self, project, callback=None):
        """Get list of metrics

        :param project: project name
        :return: list of metrics names
        """
        metrics = sorted((yield gen.Task(self.client.smembers,
                                         self.get_metrics_key(project))))
        if callback:
            callback(metrics)


    @gen.engine
    def query_set(self, project, name, period, from_date=None, to_date=None,
                       filter_name=None, callback=None):

        if callback:
            super(RedisStorage, self).query_set(
                project, name, period, from_date, to_date, filter_name, callback)

    @tornado.gen.engine
    def get_range_for_metric(self, project, name, period, filter_name, filter_value, callback=None):
        items = (yield Task(self.client.hgetall,
                            self.make_key(project, name, period, {filter_name: filter_value})))

        if callback:
            callback(items.items())

    @tornado.gen.engine
    def metrics(self, project, callback=None):
        """Return all metrics with filters

        :param project: project name
        :returns: result dict
        """

        self.client.select(self.selected_db)

        metrics = {}

        for metric_name in (yield gen.Task(self.get_metrics_list, project)):
            if metric_name not in metrics.keys():
                metrics[metric_name] = {}

            for filter_name in (yield gen.Task(self.get_filters, project, metric_name)):
                metrics[metric_name][filter_name] = (yield gen.Task(self.get_filter_values,
                    project, metric_name, filter_name))

        if callback:
            callback(metrics)


    def clean_filter_value(self, filter_value):
        """Convert filter value to string object

        :param filter_value:
        :return: string object
        """
        if isinstance(filter_value, bool) or isinstance(filter_value, NoneType):
            return str(bool)
        return filter_value


