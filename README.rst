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

Screenshots
-----------




Installation
------------

To use gottwall  use `pip` or `easy_install`:

``pip install gottwall``

or

``easy_install gottwall``

or you can use official `gottwall chef cookbook <https://github.com/GottWall/gottwall-cookbook>`_
for automatic setup on system.


Configuration
-------------

See gottwall/examples/config.py


Usage
-----

GottWall have 2 parts. Web interface application and aggregator application (application that process data).

To run web application execute command: ``gottwall --config="examples/config.py" server start``

To run aggregator application execute command: ``gottwall --config="examples/config.py" aggregator start``


Available storages
------------------

Storages that store metrics:

- Memory storage (not optimal for hightload projects)
- Redis storage (fast for counters increment, but time complexity O(N) for data range select)
- TODO: mongodb
- TODO: SQL


Available transport backends
----------------------------

The following transport available:

- Redis transport backend
- TCP/IP transport backend
- HTTP transport backend


Available clients
-----------------

The following clients are officially recognized as production-ready, and support the current GottWall protocol:

- stati-redis (`stati-redis-python <http://github.com/GottWall/stati-redis-python>`_) with redis transport.




CONTRIBUTE
----------

We need you help.

#. Check for open issues or open a fresh issue to start a discussion around a feature idea or a bug.
   There is a Contributor Friendly tag for issues that should be ideal for people who are not very familiar with the codebase yet.
#. Fork `the repository`_ on Github to start making your changes to the **develop** branch (or branch off of it).
#. Write a test which shows that the bug was fixed or that the feature works as expected.
#. Send a pull request and bug the maintainer until it gets merged and published.

.. _`the repository`: https://github.com/GottWall/GottWall/
