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
from itertools import ifilter
from logging import getLogger

from gottwall.compat import OrderedDict
from gottwall.utils import format_date_by_period, date_range, date_min, date_max, get_datetime


logger = getLogger("gottwall.storages")


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

    def make_embedded(self, project, metrics):
        """Make embedded hash for metrics
        """
        raise NotImplementedError

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

    @staticmethod
    def get_range_info(data_range):
        """Get additional info for `data_range`
        """
        filtered_range_values = map(lambda x: int(x[1]), data_range)

        return {"range": data_range,
                "max": max(filtered_range_values),
                "min": min(filtered_range_values),
                "avg": (sum(filtered_range_values) / len(filtered_range_values)) \
                if (len(filtered_range_values) > 0) else 0}


    def query(self, period, from_date, to_date, filter_name, filter_value):
        """Get data by range and filters

        :param period: range periodic
        :param from_date: slice from
        :param to_date: slice to
        :param filter_name: slice for filter
        :param filter_value: slice for filter value
        """
        raise NotImplementedError

    def metrics(self, project):
        """Get metrics
        """
        raise NotImplementedError

    def convert_range_to_datetime(self, data, period):

        return map(lambda x: (get_datetime(x[0], period), x[1]), data)

    def filter_by_period(self, data, period, from_date=None, to_date=None):
        """Fulter statistics by `from_date` and `to_date`

        :param from_data:
        :param to_date:
        :return: ifilter generator

        """
        from_date = date_min(from_date, period)
        to_date = date_max(to_date, period)

        data = self.convert_range_to_datetime(data, period)


        if from_date and to_date:
            new_data = OrderedDict(map(lambda x: (x, 0),
                                       date_range(from_date, to_date, period)))
            new_data.update(data)
        else:
            new_data = OrderedDict(data)

        # Convert datestring to datetime object in list

        new_data = sorted(ifilter(lambda x: (True if from_date is None else x[0] >= from_date) and \
                                  (True if to_date is None else x[0] <= to_date), new_data.items()),
                          key=lambda x: x[0])

        return map(lambda x: (format_date_by_period(x[0], period), x[1]), new_data)
