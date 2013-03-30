Welcome to gottwall's documentation!
======================================

GottWall is a scalable realtime metrics aggragation platform.
It also comes with beautiful customizable dashboard for visualizing metrics with charts.

.. image:: https://secure.travis-ci.org/GottWall/GottWall.png
	   :target: https://secure.travis-ci.org/GottWall/GottWall

Features
--------

- Beautiful customizable dashboard for visualizing metrics with charts.
- Data aggregation


Backend
-------

- TCP/IP backend
- Redis Pub/Sub backend
- HTTP Backend

Storages
--------

Storages used to store statistics

- Memory storage (not optimal for hightload projects)
- Redis storage (fast for counters increment, but time complexity O(N) for data range select)
- TODO: mongodb
- TODO: SQL


INSTALLATION
------------

To use gottwall  use `pip` or `easy_install`:

``pip install gottwall``

or

``easy_install gottwall``


CONFIGURATION
-------------

See gottwall/examples/config.py


USAGE
-----

GottWall have 2 parts. Web interface application and aggregator application (application that process data).

To run web application execute command: `gottwall --config="examples/config.py" server start`

To run aggregator application execute command: `gottwall --config="examples/config" aggregator start`


AVAILABLE CLIENTS
-----------------

The following clients are officially recognized as production-ready, and support the current GottWall protocol:

- stati-redis (`stati-redis-python <http://github.com/GottWall/stati-redis-python>`_) with redis transport.




CONTRIBUTE
----------

Fork https://github.com/GottWall/gottwall/ , create commit and pull request.

