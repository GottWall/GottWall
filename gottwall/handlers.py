#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
handlers
~~~~~~~~

module description

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/Lispython/gottwall
"""
import logging
import tornado.escape
from tornado.auth import GoogleMixin
from tornado.web import RequestHandler, HTTPError, asynchronous, authenticated

from jinja2 import TemplateNotFound

from itertools import chain

from tornado.escape import json_decode, json_encode
import tornado.web
import tornado.gen
from tornado import gen

from gottwall import get_version
from gottwall.utils import timestamp_to_datetime
from gottwall.settings import DATE_FILTER_FORMAT

logger = logging.getLogger('gottwall')


class User(object):
    """Request user object

    TODO: lookup users in local memory storage
    """
    def __init__(self, handler, request, *args, **kwargs):
        self.username = None
        self.email = None
        self.api_key = None

    def is_authenticated(self):
        return True


class BaseHandler(RequestHandler):
    def __init__(self, *args, **kwargs):
        super(BaseHandler, self).__init__(*args, **kwargs)
        self.set_header("Server", "GottWall/{0}".format(get_version()))

    def initialize(self, config, db, env):
        self.config = config
        self.jinja_env = env
        self.config = config

    def get_current_user(self):
        """ Return current logged user or None.
        """

        user_json = self.get_secure_cookie("user")
        if not user_json:
            return None
        return json_decode(user_json)

    ## @property
    ## def current_user(self):
    ##     """Get request user object
    ##     """

    ##     return User(self, self.request)

    def render(self, template, **kwargs):
        """Render template with \*\*kwargs context

        :param template: template name
        :param \*\*kwargs: template context
        """
        kwargs['handler'] = self
        if 'static' not in kwargs:
            kwargs['static'] = self.config.get('static_url_prefix')

        kwargs['user'] = self.current_user
        kwargs['reverse'] = self.reverse_url
        kwargs['version'] = get_version()
        data = self.render_to_string(template, context=kwargs)
        return self.finish(data)

    def render_to_string(self, template_name, context=None, processors=None):
        context = dict(context or {})
        context['request'] = self.request

        for processor in chain(processors or ()):
            context.update(processor(self.request))

        return self.select_template(template_name).render(context)

    def select_template(self, templates):
        if isinstance(templates, (list, tuple)):
            for template in templates:
                try:
                    return self.jinja_env.get_template(template)
                except TemplateNotFound:
                    continue
        elif isinstance(templates, (str, unicode)):
            return self.jinja_env.get_template(templates)

        raise TemplateNotFound(templates)


class DashboardHandler(BaseHandler):
    @authenticated
    def get(self, *args, **kwargs):

        self.render("dashboard.html", config=self.application.config,
                    projects=self.config['PROJECTS'])


class HomeHandler(BaseHandler):

    def get(self, *args, **kwargs):
        self.redirect(self.reverse_url('dashboard'))


class APIHandler(BaseHandler):
    """Base class for api handlers
    """

    def check_auth(self):
        """Check authorization
        """
        key = self.request.headers.get('Authorization')
        if key != self.application.config['SECRET_KEY']:
            logger.error("Invalid authorixation key: {0}".format(key))
            raise HTTPError(401, "Authorization required")
        return True

    def json_response(self, data, finish=True):
        output_json = tornado.escape.json_encode(data)
        self.set_header("Content-Type", "application/json")
        if finish is True:
            self.finish(output_json)
        else:
            return output_json


class StatsHandler(APIHandler):
    """Load periods statistics
    """

    def convert_date_range(self, from_date, to_date):
        """Convert str from_date and to_data objects to
        datetime object

        :param from_date: from date string
        :param to_date: to date string
        :return: tuple (from_date, to_date)
        """

        from_date = timestamp_to_datetime(from_date, DATE_FILTER_FORMAT) if from_date else from_date
        to_date = timestamp_to_datetime(to_date, DATE_FILTER_FORMAT) if to_date else to_date
        return from_date, to_date

    @authenticated
    @tornado.web.asynchronous
    @gen.engine
    def get(self, project, *args, **kwargs):

        name = self.get_argument('name', None)
        from_date = self.get_argument('from_date', None)
        to_date = self.get_argument('to_date', None)
        period = self.get_argument('period', 'week')
        filter_name = self.get_argument('filter_name', None)
        filter_value = self.get_argument('filter_value', None)

        try:
            from_date, to_date = self.convert_date_range(from_date, to_date)
        except ValueError:
            self.set_status(400)
            self.json_response({"text": "Invalid date range params"})
            return

        if not all([name, period]):
            self.set_status(400)
            self.json_response({"text": "You need specify name and period"})
            return

        data = yield gen.Task(self.application.storage.slice_data,
                              project, name, period, from_date, to_date, filter_name, filter_value)

        self.json_response({"range": list(data),
                            "project": project,
                            "period": period,
                            "name": name,
                            "filter_name": filter_name,
                            "filter_value": filter_value,
                            "avg": 0})


class MetricsHandler(APIHandler):
    """Load metrics structure
    """
    @authenticated
    @tornado.web.asynchronous
    @gen.engine
    def get(self, project, *args, **kwargs):
        metrics = yield gen.Task(self.application.storage.metrics, project)
        self.json_response(metrics)

class LogoutHandler(BaseHandler):

    def get(self):
        self.clear_cookie('user')
        self.redirect("/")


class LoginHandler(BaseHandler, GoogleMixin):

    @asynchronous
    def get(self):
        if self.get_argument("openid.mode", None):
            self.get_authenticated_user(self.async_callback(self._on_auth))
            return
        self.authenticate_redirect()

    def _on_auth(self, user):

        if not user:
            raise HTTPError(500, "Google auth failed")

        if self.application.config.get('USERS') and \
               user.get('email').lower() not in [x.lower() for x in self.application.config['USERS']]:
            raise HTTPError(403, "%s access forbiden." % user.get('name'))

        self.set_secure_cookie("user", json_encode(user))
        self.redirect("/")
