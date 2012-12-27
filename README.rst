Welcome to gottwall's documentation!
======================================

Simple statistics aggregation platform


.. image:: https://secure.travis-ci.org/GottWall/gottwall.png
	   :target: https://secure.travis-ci.org/GottWall/gottwall

Features
--------

- Web interface
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

To use gottwall  use pip or easy_install:

`pip install gottwall`

or

`easy_install gottwall`


CONFIGURATION
-------------

See gottwall/examples/config.py



CONTRIBUTE
----------

Fork https://github.com/GottWall/gottwall/ , create commit and pull request.

