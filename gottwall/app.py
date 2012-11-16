#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.app
~~~~~~~~~~~~

Gottwall main loop

:copyright: (c) 2012 by Alexandr Lispython (alex@obout.ru).
:license: BSD, see LICENSE for more details.
:github: http://github.com/Lispython/gottwall
"""

import os.path
import tornado.ioloop
from tornado.web import Application
from tornado.options import define, options
from tornado import httpserver
from tornado import autoreload
from utils import rel

define("port", default=8889, help="run HTTP on the given port", type=int)
define("ssl_port", default=8890, help="run HTTPS on the given port", type=int)


class LoginHandler():
    def get(self):
        self.render("login.html")

class HomeHandler():

    def get(self):
        self.render("index.html")


class Dashboard():
    def get(self):
        self.render("dashboard.html")


class HTTPApplication(Application):
    """Base application
    """

    def __init__(self):
        self.dirty_handlers = [
            (r"/login", LoginHandler),
            (r"/", HomeHandler),
        ]

        settings = dict(
            site_title=u"GottWall - statistics aggregator",
            template_path=os.path.join(os.path.dirname(__file__), "templates"),
            static_path=os.path.join(os.path.dirname(__file__), "static"),
            xsrf_cookies=False,
            cookie_secret="0fkewrlhfwhrfweiurbweuybfrweoubfrowebfioubweoiufbwbeofbowebfbwup2XdTP1o/Vo=",
            autoescape=None,
        )
        tornado.web.Application.__init__(self, self.dirty_handlers, **settings)


application = HTTPApplication()


if __name__ == "__main__":
    tornado.options.parse_command_line()
    http_server = httpserver.HTTPServer(application)
    http_server.listen(options.port)
    ioloop = tornado.ioloop.IOLoop.instance()
    autoreload.start(io_loop=ioloop, check_time=100)
    ioloop.start()
