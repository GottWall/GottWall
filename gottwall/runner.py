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
import os.path
import time
import signal
from logging import StreamHandler
from optparse import OptionParser, Option

from commandor import Command, Commandor
import tornado.ioloop
from tornado import httpserver
from tornado import autoreload
from tornado.options import _LogFormatter

import gottwall.default_config
from gottwall.config import Config
from gottwall.app import HTTPApplication
from gottwall.log import logger


def configure_logging(logging):
    """Configure logging handler"""
    if logging.upper() not in ['DEBUG', 'INFO', 'CRITICAL', 'WARNING', 'ERROR']:
        return
    print("Setup {0} log level".format(logging))
    logger.setLevel(logging.upper())

    if not logger.handlers:
        channel = StreamHandler()
        channel.setFormatter(_LogFormatter(color=False))
        logger.addHandler(channel)


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

        configure_logging(logging)

        application = HTTPApplication(config)
        ioloop = tornado.ioloop.IOLoop.instance()

        application.configure_app(ioloop)

        self.http_server = httpserver.HTTPServer(application)
        self.http_server.listen(port, host)

        if reload:
            self.display("Autoreload enabled")
            autoreload.start(io_loop=ioloop, check_time=100)

        self.display("Server running on 127.0.0.1:{0}".format(port))

        # Init signals handler
        #signal.signal(signal.SIGTERM, self.sig_handler)

        # This will also catch KeyboardInterrupt exception
        #signal.signal(signal.SIGINT, self.sig_handler)

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

        alembic_cfg = AlembicConfig(os.path.join(os.path.dirname(gottwall.default_config.__file__), 'alembic.ini'))
        alembic_cfg.set_main_option("script_location",
                                   config['ALEMBIC_SCRIPT_LOCATION'])

        alembic_cfg.set_main_option("sqlalchemy.url","{ENGINE}://{USER}:{PASSWORD}@{HOST}:{PORT}/{NAME}".\
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
                                metavar="FILE",
                                help='Configuration file')]

    manager = Commandor(parser, sys.argv[1:], commandor_options)
    manager.process()

if __name__ == '__main__':
    main()
