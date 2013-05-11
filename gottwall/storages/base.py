#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall.storages
~~~~~~~~~~~~~~~~~

GottWall storages backends

:copyright: (c) 2012 - 2013 by GottWall Team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""
import uuid

from itertools import ifilter, imap
from logging import getLogger

from tornado import gen
from tornado.gen import Task
from gottwall.utils import date_min, date_max, get_by_period


logger = getLogger("gottwall.storages")


class BaseStorage(object):
    """Base interface for calculation
    """

    def __init__(self, application):
        self._application = application
        self._statistics = {
            'incr': 0,
            'decr': 0,
            'query': 0,
            'query_set': 0}

    @classmethod
    def setup(cls, application):
        """Setup storage to application
        """
        storage = cls(application)
        application.storage = storage
        return storage

    def get_status(self):
        """Print storage status
        """
        logger.info("{name} statistics: incr[{incr}], query[{query}], query_set[{query_set}]".format(
            name = self.__class__.__name__,
            incr=self._statistics['incr'],
            query=self._statistics['query'],
            query_set=self._statistics['query_set']))

    def update_stats(self, key, value=1):
        self._statistics[key] += 1

    def make_embedded(self, project, period, metrics=[],
                      renderer=None, name=None):
        """Make embedded hash for metrics

        :param project: project name
        :param metrics: metrics dict
        """
        uid = uuid.uuid4()

        for i, metric in enumerate(metrics):

            metric['fn'] = metric.pop('filter_name', None)
            metric['m'] = metric.pop('metric_name', None)
            metric['fv'] = metric.pop('filter_value', None)

            for k, v in metric.items():
                if (k not in ['m', 'fn', 'fv']) or not v:
                    del metric[k]

        data = {"project": project,
                "metrics": metrics,
                "period": period}

        if renderer:
            data['renderer'] = renderer

        if name:
            data['name'] = name
        return uid, data

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

    def get_range_for_metric(self, project, name, period,
                             filter_name=None, filter_value=None, callback=None):
        """Get range list for metric

        :param project: project name
        :param name: metric name
        :param period: period name
        :param filter_name: filter_name
        :param fitler_value: filter_value
        """
        raise NotImplementedError

    @staticmethod
    def get_range_info(data_range):
        """Get additional info for `data_range`
        """

        filtered_range_values = map(lambda x: int(x[1]), data_range)
        if filtered_range_values:
            min_info = min(filtered_range_values or [])
            max_info = max(filtered_range_values or [])

            avg_info = (sum(filtered_range_values) / len(filtered_range_values)) \
                       if (len(filtered_range_values) > 0) else 0
        else:
            min_info = 0
            max_info = 0
            avg_info = 0

        return {"range": data_range,
                "max": max_info,
                "min": min_info,
                "avg": avg_info}


    def query(self, project, name, period, from_date=None, to_date=None,
              filter_name=None, filter_value=None):
        """Get data by range and filters

        :param project: project name
        :param name: metric name
        :param period: range periodic
        :param from_date: slice from
        :param to_date: slice to
        :param filter_name: slice for filter
        :param filter_value: slice for filter value
        """
        raise NotImplementedError

    @gen.engine
    def query_set(self, project, name, period,
                  from_date=None, to_date=None,
                  filter_name=None, callback=None):

        filter_values = (yield gen.Task(self.get_filter_values, project, name, filter_name))

        items = {}
        for value in filter_values:
            items[value] = {}
            tmp_range = (yield Task(self.get_range_for_metric, project, name, period, filter_name, value))

            items[value]['range'] = self.filter_by_period(
                tmp_range, period, from_date, to_date)

            filtered_range_values = map(lambda x: int(x[1]), items[value]['range'])

            items[value]['avg'] = (sum(filtered_range_values) / len(items[value]['range'])) \
                                  if ((len(items[value]['range']) > 0) and filtered_range_values) else 0
            items[value]['max'] = max(filtered_range_values) if filtered_range_values else 0
            items[value]['min'] = min(filtered_range_values) if filtered_range_values else 0

        if callback:
            callback(items)

    def metrics(self, project):
        """Get metrics

        :param project: project name
        """
        raise NotImplementedError

    def filter_by_period(self, data, period, from_date=None, to_date=None):
        """Fulter statistics by `from_date` and `to_date`

        :param from_data:
        :param to_date:
        :return: ifilter generator

        """

        from_date = date_min(from_date, period)
        to_date = date_max(to_date, period)

        # Convert datestring to datetime object in list
        from_date = get_by_period(from_date, period)
        to_date = get_by_period(to_date, period)

        return sorted(ifilter(lambda x: (True if from_date is None else int(x[0]) >= from_date) and \
                              (True if to_date is None else int(x[0]) <= to_date),
                              imap(lambda item: (int(item[0]), int(item[1])), data)),
                      key=lambda x: x[0])


    def get_filters(self, project, name):
        """Get list of filters

        :param project: project name
        :param name: metric name
        :return: list of filters
        """
        raise NotImplementedError

    def get_filter_values(self, project, name, filter_name):
        """Get list of filter values

        :param project: project name
        :param name: metric name
        :param filter_name: filter name
        """
        raise NotImplementedError


    def get_metrics_list(self, project):
        """Get list of saved metrics

        :param project: project name
        """
        raise NotImplementedError
