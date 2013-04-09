#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
api_v1
~~~~~~

API handler for v1

:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""
import logging
from datetime import datetime

from dateutil.relativedelta import relativedelta
import tornado.escape
from tornado.web import authenticated

from tornado.escape import json_decode
import tornado.web
import tornado.gen
from tornado import gen

from gottwall.utils import (timestamp_to_datetime, date_range, format_date_by_period,
                            date_min, date_max, datetime_to_int, get_datetime)
from gottwall.settings import DATE_FILTER_FORMAT, PERIODS, DEFAULT_EMBEDDED_PARAMS

logger = logging.getLogger('gottwall.apiv1')

from handlers import SERVER_NAME, BaseHandler, JSONMixin, APIHandler


class TimeMixin(object):
    def convert_date_range(self, from_date, to_date, period):
        """Convert str from_date and to_data objects to
        datetime object

        :param from_date: from date string
        :param to_date: to date string
        :return: tuple (from_date, to_date)
        """

        from_date = timestamp_to_datetime(from_date, DATE_FILTER_FORMAT) if from_date else from_date
        to_date = timestamp_to_datetime(to_date, DATE_FILTER_FORMAT) if to_date else to_date
        return date_min(from_date, period), date_max(to_date, period)

    def clean_date_range(self, from_date, to_date, period):
        try:
            from_date, to_date = self.convert_date_range(from_date, to_date, period)
            if from_date > to_date:
                raise RuntimeError
        except (ValueError, RuntimeError):
            self.set_status(400)
            self.json_response({"text": "Invalid date range"})
            return None, None
        return from_date, to_date


class StatsMixin(TimeMixin):

    def get_params(self):
        name = self.get_argument('name', None)
        from_date = self.get_argument('from_date', None)
        to_date = self.get_argument('to_date', None)
        period = self.get_argument('period', 'month')
        filter_name = self.get_argument('filter_name', None)
        filter_value = self.get_argument('filter_value', None)

        return name, from_date, to_date, period, filter_name, filter_value

    def validate_name(self, name, period):
        if not all([name, period]):
            self.set_status(400)
            self.json_response({"text": "You need specify name and period"})
            return
        return True


class StatsHandlerV1(APIHandler, StatsMixin):
    """Load periods statistics
    """

    @authenticated
    @tornado.web.asynchronous
    @gen.engine
    def get(self, project, *args, **kwargs):

        try:
            name, from_date, to_date, period, filter_name, filter_value = self.get_params()
        except Exception:
            self.set_status(400)
            self.json_response({"text": "Bad request"})
            return

        from_date, to_date = self.clean_date_range(from_date, to_date, period)

        if self.validate_name(name, period) and from_date and to_date:

            data = yield gen.Task(self.application.storage.query,
                                  project, name, period, from_date, to_date, filter_name, filter_value)

            self.json_response({"range": list(data['range']),
                                "project": project,
                                "period": period,
                                "name": name,
                                "filter_name": filter_name,
                                "filter_value": filter_value,
                                "avg": data['avg'],
                                "min": data['min'],
                                "max": data['max']})


class StatsDataSetHandlerV1(APIHandler, StatsMixin):
    """Load data for filters without filter value
    """
    @authenticated
    @tornado.web.asynchronous
    @gen.engine
    def get(self, project, *args, **kwargs):

        try:
            name, from_date, to_date, period, filter_name, filter_value = self.get_params()
            from_date, to_date = self.convert_date_range(from_date, to_date, period)

        except Exception:
            self.set_status(400)
            self.json_response({"text": "Bad request"})
            return

        from_date, to_date = self.clean_date_range(from_date, to_date, period)

        if self.validate_name(name, period) and from_date and to_date:

            data = yield gen.Task(self.application.storage.query_set,
                                  project, name, period, from_date, to_date, filter_name)

            self.json_response({"data": data,
                                "project": project,
                                "period": period,
                                "name": name,
                                "filter_name": filter_name,
                                "date_range": [format_date_by_period(x, period)
                                               for x in date_range(date_min(from_date, period),
                                                                   date_max(to_date, period), period)]})


class MetricsHandlerV1(APIHandler):
    """Load metrics structure
    """
    @authenticated
    @tornado.web.asynchronous
    @gen.engine
    def get(self, project, *args, **kwargs):
        metrics = yield gen.Task(self.application.storage.metrics, project)
        self.json_response(metrics)


class EmbeddedCreateHandlerV1(APIHandler, TimeMixin):
    """Create embedded charts
    """

    def validate_period(self, period):
        if period not in PERIODS:
            self.set_status(400)
            self.json_response({"text": "You need specify name and period"})
            return
        return True

    def validate_renderer(self, renderer=None):
        if not renderer:
            return True

        if renderer not in self.config.get('RENDERERS', []):
            self.set_status(400)
            self.json_response({"text": "You need specify name and period"})
            return
        return True


    @authenticated
    @tornado.web.asynchronous
    @gen.engine
    def post(self, project, *args, **kwargs):

        try:
            data = json_decode(self.request.body)
            metrics = data['metrics']
            period = data['period']
            renderer = data.get('renderer')
            name = data.get('name')
        except Exception:
            self.set_status(400)
            self.json_response({"text": "Bad request"})
            return

        if not self.validate_period(period):
            return

        if not self.validate_renderer(renderer):
            return

        embedded_hash = (yield gen.Task(
            self.application.storage.make_embedded,
                project, period, metrics, renderer, name))

        if not embedded_hash:
            self.set_status(500)
            self.json_response({"text": "Server error"})
            return

        link_template = "{0}://{1}".format(self.request.protocol, self.request.host)

        response_data = {
            "html_link": link_template + self.reverse_url('api-v1-html-embedded', embedded_hash),
            "js_link": link_template + self.reverse_url('api-v1-js-embedded', embedded_hash),
            "json_link": link_template + self.reverse_url('api-v1-json-embedded', embedded_hash)}

        response_data["iframe"] = '<iframe src="{0}"></iframe>'.format(response_data['html_link'])
        self.json_response(response_data)


class EmbeddedBaseHandlerV1(BaseHandler, TimeMixin, JSONMixin):
    def get_date_params(self):
        from_date = self.get_argument('from_date', datetime.now() - relativedelta(months=1))
        to_date = self.get_argument('to_date', datetime.now())
        return from_date, to_date

    def get_renderer(self, meta_info):
        EMBEDDED_PARAMS = self.config.get('EMBEDDED_PARAMS', {})

        return self.get_argument('renderer', meta_info.get('renderer',
                                                           EMBEDDED_PARAMS.get('renderer')) or\
                                 DEFAULT_EMBEDDED_PARAMS['renderer'])

    @gen.engine
    def get_data(self, uid, callback=None):
        from_date, to_date = self.get_date_params()

        meta_info =  (yield gen.Task(self.application.storage.get_embedded, uid))

        period = self.get_argument('period', meta_info['period'])

        from_date, to_date = self.clean_date_range(from_date, to_date, period)

        if not any([from_date, to_date]):
            return

        response_data = {
            "renderer": self.get_renderer(meta_info),
            "metrics": [],
            "period": period,
            "from_date": from_date.strftime(DATE_FILTER_FORMAT),
            "to_date": to_date.strftime(DATE_FILTER_FORMAT)}

        names = []

        for metric in meta_info['metrics']:
            metric.update((yield gen.Task(
                self.application.storage.query,
                meta_info['project'], metric['m'], response_data['period'],
                from_date, to_date, metric.get('fn'), metric.get('fv'))))

            metric['name'] = metric.pop('m')
            names.append(metric['name'])
            metric['filter_name'] = metric.pop('fn', None)
            metric['filter_value'] = metric.pop('fv', None)

        response_data['metrics'] = meta_info['metrics']
        response_data['name'] = meta_info.get('name',
                                              self.get_argument(
                                                  'name', ' | '.join(names)))
        response_data['generator'] = SERVER_NAME


        if callback:
            callback(response_data)


class HTMLEmbeddedHandlerV1(EmbeddedBaseHandlerV1):

    def get_chart_params(self):
        EMBEDDED_PARAMS = self.config.get('EMBEDDED_PARAMS', {})

        height = int(self.get_argument('height', EMBEDDED_PARAMS.get('height')) or
                     DEFAULT_EMBEDDED_PARAMS['height'])
        width = int(self.get_argument('width', EMBEDDED_PARAMS.get('width')) or
                    DEFAULT_EMBEDDED_PARAMS['width'])
        interpolation = self.get_argument('interpolation', EMBEDDED_PARAMS.get('interpolation')) or\
                   DEFAULT_EMBEDDED_PARAMS['interpolation']

        return height, width, interpolation


    @tornado.web.asynchronous
    @gen.engine
    def get(self, uid, *args, **kwargs):
        response_data = (yield gen.Task(self.get_data, uid))
        height, width, interpolation = self.get_chart_params()

        def x_converter(x):
            return datetime_to_int(get_datetime(x, response_data['period']), response_data['period'])

        self.render("embedded.html",
                    data=response_data, width=width, height=height,
                    interpolation=interpolation,
                    x_converter=x_converter, uid=uid)


class JSEmbeddedHandlerV1(HTMLEmbeddedHandlerV1):
    @tornado.web.asynchronous
    @gen.engine
    def get(self, uid, *args,**kwargs):
        from_date, to_date = self.get_date_params()

        meta_info =  (yield gen.Task(self.application.storage.get_embedded, uid))

        period = self.get_argument('period', meta_info['period'])

        from_date, to_date = self.clean_date_range(from_date, to_date, period)

        if not any([from_date, to_date]):
            return

        height, width, interpolation = self.get_chart_params()


        self.render("js_embedded.html",
                    width=width, height=height,
                    from_date=from_date.strftime(DATE_FILTER_FORMAT),
                    to_date=to_date.strftime(DATE_FILTER_FORMAT), period=period,
                    interpolation=interpolation, uid=uid)



class JSONEmbeddedHandlerV1(EmbeddedBaseHandlerV1):

    @tornado.web.asynchronous
    @gen.engine
    def get(self, uid, *args, **kwargs):

        response_data = (yield gen.Task(
            self.get_data, uid))

        self.json_response(response_data)
