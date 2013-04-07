#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
handlers
~~~~~~~~


:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""
import logging
from datetime import datetime

from dateutil.relativedelta import relativedelta
import tornado.escape
from tornado.auth import GoogleMixin
from tornado.web import RequestHandler, HTTPError, asynchronous, authenticated

from jinja2 import TemplateNotFound

from itertools import chain

from tornado.escape import json_decode, json_encode
import tornado.web
import tornado.gen
from tornado import gen

from gottwall import get_version, GOTTWALL_HOME, GOTTWALL_DESCRIPTION
from gottwall.utils import (timestamp_to_datetime, date_range, format_date_by_period,
                            date_min, date_max)
from gottwall.settings import DATE_FILTER_FORMAT, PERIODS

logger = logging.getLogger('gottwall')

SERVER_NAME = "GottWall / {0}".format(get_version())

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
        self.set_header("Server", SERVER_NAME)

    def initialize(self, config, db, env):
        self.config = config
        self.jinja_env = env

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
        kwargs['generator'] = SERVER_NAME
        kwargs['gottwall_home'] = GOTTWALL_HOME
        kwargs['gottwall_description'] = GOTTWALL_DESCRIPTION
        kwargs['config'] = self.config
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

        self.render("dashboard.html",
                    projects=self.config['PROJECTS'])


class HomeHandler(BaseHandler):

    def get(self, *args, **kwargs):
        if self.application.config.get("HOME_AUTOREDIRECT", False) or self.current_user:
            self.redirect(self.reverse_url('dashboard'))
        else:
            self.render("home.html",
                        projects=self.config['PROJECTS'] if self.current_user else [])


class NotFoundHandler(BaseHandler):

    def get(self, *args, **kwargs):
        self.set_status(404)
        self.render("404.html", )


class JSONMixin(object):
    def json_response(self, data, finish=True):
        output_json = tornado.escape.json_encode(data)
        self.set_header("Content-Type", "application/json")
        if finish is True:
            self.finish(output_json)
        else:
            return output_json


class APIHandler(BaseHandler, JSONMixin):
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
            self.set_status(403)

            self.render("403.html",
                        projects=self.config['PROJECTS'], user=user)

        if not self.application.config.get('ANONYMOUS_LOGIN', False) and \
               (user.get('email').lower() not in [x.lower() for x in self.application.config.get('USERS', [])]):

            self.set_status(403)

            self.render("403.html",
                        projects=self.config['PROJECTS'], user=user)

        self.set_secure_cookie("user", json_encode(user))
        self.redirect("/")
