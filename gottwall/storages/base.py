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


from logging import getLogger
import tornadoredis
import tornado.gen


from gottwall.utils import get_by_period, MagicDict, get_datetime
from gottwall.settings import STORAGE_SETTINGS_KEY

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

    def metrics(self, project):
        """Get metrics
        """
        raise NotImplementedError
