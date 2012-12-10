#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.runner
~~~~~~~~~~~~~~~

GottWall runner for standalone applications

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details..
:license: BSD, see LICENSE for more details.
:github: http://github.com/Lispython/gottwall
"""

import sys
from optparse import OptionParser, Option

from commandor import Command, Commandor
import tornado.ioloop
from tornado import httpserver
from tornado import autoreload

import gottwall.default_config
from gottwall.config import Config
from gottwall.app import HTTPApplication


class Commandor(Commandor):
    """Arguments management utilities
    """

    def run(self, options, args):
        """Prepare env befor command execution

        :param options: options object
        :param args: list or commandor args
        """

        if not options.config:
            self.error("You need specify --config\n")
            super(Commandor, self).run(options, args)
            self.exit()

        config = Config()

        # Load default config
        config.from_module(gottwall.default_config)

        # Rewrite default settings
        config.from_file(options.config)

        return config


class Server(Command):
    """Server commands
    """
    commandor = Commandor


class Start(Command):
    """Run server
    """
    parent = Server

    options = [
        Option("-p", "--port",
               metavar=int,
               default=8889,
               help="Port to run http server")]

    def run(self, port, **kwargs):
        config = self._commandor_res
        application = HTTPApplication(config)
        ioloop = tornado.ioloop.IOLoop.instance()

        application.configure_app(ioloop)

        http_server = httpserver.HTTPServer(application)
        http_server.listen(port)

        autoreload.start(io_loop=ioloop, check_time=100)
        self.display("Server running on 127.0.0.1:{0}".format(port))

        ioloop.start()


class Schema(Command):
    """Manipulate database schemas
    """

    commandor = Commandor

class Migrate(Command):
    """Database migration
    """
    parent = Schema

    def run(self, **kwargs):
        from alembic.config import Config as AlembicConfig
        config = self._commandor_res
        alembic_cfg = AlembicConfig()
        alembic_cfg.set_main_option("script_location",
                                   config['ALEMBIC_SCRIPT_LOCATION'])

        alembic_cfg.set_main_option("url","{ENGINE}://{USER}:{PASSWORD}@{HOST}:{PORT}/{NAME}".\
                                    format(**config['DATABASE']))


        self.display("Migrate database")


def main():
    parser = OptionParser(
        usage="%prog [options] <commands> [commands options]",
        add_help_option=False)

    commandor_options = [Option('-c', '--config',
                                metavar="FILE",
                                help='Configuration file')]

    manager = Commandor(parser, sys.argv[1:], commandor_options)
    manager.process()

if __name__ == '__main__':
    main()
