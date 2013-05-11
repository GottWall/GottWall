#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
gottwall.runner
~~~~~~~~~~~~~~~

GottWall runner for standalone applications

:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details..
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""
import os.path
import sys
import time

import signal
import logging as logging_module
from logging import StreamHandler
from optparse import OptionParser, Option

import tornado.ioloop
from commandor import Command, Commandor
from tornado import httpserver, autoreload
from tornado.options import _LogFormatter

import gottwall.default_config
from gottwall.aggregator import AggregatorApplication
from gottwall.app import HTTPApplication
from gottwall.config import Config, generate_settings
from gottwall.log import logger


def configure_logging(logging):
    """Configure logging handler"""
    if logging.upper() not in ['DEBUG', 'INFO', 'CRITICAL',
                               'WARNING', 'ERROR']:
        return

    logger.setLevel(getattr(logging_module, logging.upper()))

    if not logger.handlers:
        channel = StreamHandler()
        channel.setFormatter(_LogFormatter(color=False))
        logger.addHandler(channel)
    logger.info("Logging handler configured with level {0}".format(logging))


class Commandor(Commandor):
    """Arguments management utilities
    """

    def run(self, options, args):
        """Prepare env befor command execution

        :param options: options object
        :param args: list or commandor args
        """

        if not options.config:
            return False

        config = Config()

        # Load default config
        config.from_module(gottwall.default_config)

        # Rewrite default settings
        config.from_file(options.config)

        return config


class Init(Command):
    """Config creation
    """
    commandor = Commandor

    def run(self, *args, **kwargs):
        if len(self._args) == 0:
            self.error("You need specify path to config file\n")
            self.exit()

        filename = os.path.abspath(self._args[0])

        if os.path.exists(filename):

            while True:
                ans = raw_input("Are you sure to rewrite {0}? [y/n]".format(filename))
                if not ans:
                    continue
                if ans not in ['y', 'Y', 'n', 'N']:
                    self.display('Please enter y or n.')
                    continue
                if ans in ['y', 'Y']:
                    self.display("Rewriting exists {0}".format(filename))
                    break
                if ans in ['n', 'N']:
                    self.display("{0} not rewrited".format(filename))
                    self.exit()
        try:
            with open(filename, 'w') as f:
                f.write(generate_settings())
        except IOError as e:
            self.display("Can't create config file at {0}\r\n{1}".format(filename, e))


class Aggregator(Command):
    """Tools for aggregator
    """
    commandor = Commandor


class Start(Command):
    """Aggregator starter
    """
    parent = Aggregator

    options = [
        Option("-p", "--port",
               metavar=int,
               default=8890,
               help="Port to run http server"),
        Option("-r", "--reload",
               action="store_true",
               dest="reload",
               default=False,
               help="Auto realod source on changes"),
        Option("-h", "--host",
               metavar="str",
               default="127.0.0.1",
               help="Port for server"),
        Option("-l", "--logging",
               metavar="str",
               default="none",
               help="Log level")]

    def run(self, port, reload, host, logging, **kwargs):
        config = self._commandor_res

        if not config:
            self.error("You need specify --config\n")
            self.exit()

        configure_logging(logging)

        self.application = AggregatorApplication(config)
        ioloop = tornado.ioloop.IOLoop.instance()

        self.application.configure_app(ioloop)

        self.http_server = httpserver.HTTPServer(self.application)
        self.http_server.listen(str(port), host)

        if reload:
            self.display("Autoreload enabled")
            autoreload.start(io_loop=ioloop, check_time=100)

        self.display("Aggregator running on {0}:{1}".format(host, port))

        # Init signals handler
        signal.signal(signal.SIGTERM, self.sig_handler)

        # This will also catch KeyboardInterrupt exception
        signal.signal(signal.SIGINT, self.sig_handler)

        ioloop.start()

    def sig_handler(self, sig, frame):
        """Catch signal and init callback
        """
        tornado.ioloop.IOLoop.instance().add_callback(self.shutdown)

    def shutdown(self):
        """Stop server and add callback to stop i/o loop"""
        self.display("Shutting down service")
        self.application.shutdown()
        self.http_server.stop()
        self.application.check_ready_to_stop(self.application)


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
               help="Port to run http server"),
        Option("-r", "--reload",
               action="store_true",
               dest="reload",
               default=False,
               help="Auto realod source on changes"),
        Option("-h", "--host",
               metavar="str",
               default="127.0.0.1",
               help="Port for server"),
        Option("-l", "--logging",
               metavar="str",
               default="none",
               help="Log level")]

    def run(self, port, reload, host, logging, **kwargs):
        config = self._commandor_res

        if not config:
            self.error("You need specify --config\n")
            self.exit()

        configure_logging(logging)

        application = HTTPApplication(config)
        ioloop = tornado.ioloop.IOLoop.instance()

        application.configure_app(ioloop)

        self.http_server = httpserver.HTTPServer(application)
        self.http_server.listen(port, host)

        if reload:
            self.display("Autoreload enabled")
            autoreload.start(io_loop=ioloop, check_time=100)

        self.display("Server running on http://{0}:{1}".format(host, port))

        # Init signals handler
        signal.signal(signal.SIGTERM, self.sig_handler)

        # This will also catch KeyboardInterrupt exception
        signal.signal(signal.SIGINT, self.sig_handler)

        ioloop.start()

    def sig_handler(self, sig, frame):
        """Catch signal and init callback
        """
        tornado.ioloop.IOLoop.instance().add_callback(self.shutdown)

    def shutdown(self):
        """Stop server and add callback to stop i/o loop"""
        self.display("Shutting down service")

        self.http_server.stop()

        io_loop = tornado.ioloop.IOLoop.instance()
        io_loop.add_timeout(time.time() + 2, io_loop.stop)


class Alembic(Command):
    """SqlAlchemy migration tools
    """
    commandor = Commandor

    # ALBEMIC INTEGRATION
    def __init__(self, *args, **kwargs):
        from alembic.config import CommandLine

        kwargs['parser'] = CommandLine(self.__class__.__name__).parser
        super(Alembic, self).__init__(*args, **kwargs)

    def process(self):
        """Execute command
        """
        self.configure()

        options = self.parse_args()
        return self.run(options, *options.cmd)

    def run(self, options, fn, positional, kwarg):
        from alembic.config import Config as AlembicConfig
        from alembic import util

        config = self._commandor_res

        alembic_cfg = AlembicConfig(os.path.join(os.path.dirname(
            gottwall.default_config.__file__), 'alembic.ini'))
        alembic_cfg.set_main_option("script_location",
                                   config['ALEMBIC_SCRIPT_LOCATION'])

        alembic_cfg.set_main_option("sqlalchemy.url",
                                    "{ENGINE}://{USER}:{PASSWORD}@{HOST}:{PORT}/{NAME}".\
                                    format(**config['DATABASE']))

        try:
            fn(alembic_cfg,
               *[getattr(options, k) for k in positional],
               **dict((k, getattr(options, k)) for k in kwarg))
        except util.CommandError, e:
            util.err(str(e))


def main():
    parser = OptionParser(
        usage="%prog [options] <commands> [commands options]",
        add_help_option=False)

    commandor_options = [Option('-c', '--config',
                                metavar="FILE", help='Configuration file')]

    manager = Commandor(parser, sys.argv[1:], commandor_options)
    manager.process()

if __name__ == '__main__':
    main()
