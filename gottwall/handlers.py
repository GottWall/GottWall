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
from tornado.escape import json_decode, json_encode

from gottwall import get_version

logger = logging.getLogger('gottwall')


class BaseHandler(RequestHandler):
    def __init__(self, *args, **kwargs):
        super(BaseHandler, self).__init__(*args, **kwargs)

        self.config = self.application.config
        self.db = self.application.db

        self.set_header("Server", "GottWall/{0}".format(get_version()))

    def get_current_user(self):
        """ Return current logged user or None.
        """
        user_json = self.get_secure_cookie("user")
        if not user_json:
            return None
        return json_decode(user_json)

    def check_auth(self):
        """Check authorization
        """
        key = self.request.headers.get('Authorization')
        if key != self.application.config['SECRET_KEY']:
            logger.error("Invalid authorixation key: {0}".format(key))
            raise HTTPError(401, "Authorization required")
        return True



class DashboardHandler(BaseHandler):
    @authenticated
    def get(self, *args, **kwargs):
        self.render("dashboard.html", config=self.application.config)


class HomeHandler(BaseHandler):

    def get(self, *args, **kwargs):
        storage = self.application.storage
        config = self.application.config
        self.render("index.html", storage=storage.__class__.__name__,
                    backends=self.application.config['BACKENDS'],
                    projects=config['PROJECTS'])


class JSONHandler(BaseHandler):
    """Make json from response body
    """

    def json_response(self, data, finish=True):
        output_json = tornado.escape.json_encode(data)
        self.set_header("Content-Type", "application/json")
        if finish is True:
            self.finish(output_json)
        else:
            return output_json


class StatsHandler(JSONHandler):
    """Load periods statistics
    """
    def get(self, *args, **kwargs):

        from_date = self.get_argument('from_date', None)
        to_date = self.get_argument('to_date', None)
        period = self.get_argument('period', 'week')
        filter_name = self.get_argument('filter_name', None)
        filter_value = self.get_argument('filter_value', None)

        data = self.application.storage.slice_data(
            period, from_date, to_date, filter_name, filter_value)

        self.json_response(data)


class MetricsHandler(JSONHandler):
    """Load metrics structure
    """

    def get(self, *args, **kwargs):
        from random import choice
        data = {"name": []}

        self.json_response(data)


class LogoutHandelr(BaseHandler):

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
               not user.get('email') in self.application.config['USERS']:
            raise HTTPError(403, "%s access forbiden." % user.get('name'))

        self.set_secure_cookie("user", json_encode(user))
        self.redirect("/")
