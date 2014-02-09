Welcome to GottWall's documentation!
====================================

GottWall is a scalable realtime metrics collecting and aggregation platform and service.
This package, at its core, is just a simple aggregation server and
beautiful customizable web dashboard for visualizing metrics with charts.

It will handle authenticating clients (such as stati)
and all of the logic behind storage and aggregation.


.. image:: https://travis-ci.org/GottWall/GottWall.png
	   :target: https://travis-ci.org/GottWall/GottWall

.. image:: https://obout.ru/s/empty.gif
	   :height: 1px
	   :width: 1px

Features
--------

- Beautiful customizable dashboard for visualizing metrics with charts.
- Data aggregation
- Data collection
- Embedded charts (`HTML <http://demo.gottwall.com/api/embedded/hash.html>`_, iframe, `javascript <http://demo.gottwall.com/api/mbedded/hash.js>`_, `JSON <http://demo.gottwall.com/api/embedded/hash.json>`_)

Demo
----

You can try free demo charts on `demo.gottwall.com <http://demo.gottwall.com>`_.
Login opened for all users.


Screenshots
-----------

Dashboard
^^^^^^^^^

.. image:: https://raw.github.com/GottWall/GottWall/master/docs/source/images/GottWall_6_thumb.png
	   :target: https://raw.github.com/GottWall/GottWall/master/docs/source/images/GottWall_6.png

.. image:: https://raw.github.com/GottWall/GottWall/master/docs/source/images/GottWall_7_thumb.png
	   :target: https://raw.github.com/GottWall/GottWall/master/docs/source/images/GottWall_7.png

Custom graph type and title
^^^^^^^^^^^^^^^^^^^^^^^^^^^

.. image:: https://raw.github.com/GottWall/GottWall/master/docs/source/images/GottWall_8_thumb.png
	   :target: https://raw.github.com/GottWall/GottWall/master/docs/source/images/GottWall_8.png

.. image:: https://raw.github.com/GottWall/GottWall/master/docs/source/images/GottWall_11_thumb.png
	   :target: https://raw.github.com/GottWall/GottWall/master/docs/source/images/GottWall_11.png


Simple chart charing
^^^^^^^^^^^^^^^^^^^^

.. image:: https://raw.github.com/GottWall/GottWall/master/docs/source/images/GottWall_9_thumb.png
	   :target: https://raw.github.com/GottWall/GottWall/master/docs/source/images/GottWall_9.png

.. image:: https://raw.github.com/GottWall/GottWall/master/docs/source/images/GottWall_10_thumb.png
	   :target: https://raw.github.com/GottWall/GottWall/master/docs/source/images/GottWall_10.png


Installation
------------

To use gottwall  use `pip` or `easy_install`::

  pip install gottwall

or ::

  easy_install gottwall


Also you need to install `storage` application(example)::

  pip install gottwall_storage_redis

or you can use official `gottwall chef cookbook <https://github.com/GottWall/gottwall-cookbook>`_
for automatic setup on system.


Configuration
-------------

See gottwall/examples/config.py

or create default config by command::

  gottwall init ./config.py


Usage
-----

GottWall have 2 independent parts. Web interface application and aggregator application (application that process data).

Starting web dashboard
^^^^^^^^^^^^^^^^^^^^^^

To run web application execute command::

  gottwall --config="examples/config.py" server start


Starting aggregator
^^^^^^^^^^^^^^^^^^^

To run aggregator application execute command::

  gottwall --config="examples/config.py" aggregator start


Available storages
------------------

Storages that store metrics:

- Memory storage (for tests only)
- `Redis storage <http://github.com/GottWall/gottwall-storage-redis>`_ (fast for counters increment, but time complexity O(N) for data range select)
- TODO: `mongodb <http://github.com/GottWall/gottwall-storage-mongodb>`_ (We need your help).
- TODO: SQL


Available transport backends with clients
-----------------------------------------

The following transport available:

- `Redis transport backend <http://github.com/GottWall/gottwall-backend-redis>`_ with `stati-python-redis <http://github.com/GottWall/stati-python-redis>`_ client.
- TCP/IP transport backend (builtin) with `stati.TCPIP<http://github.com/GottWall/stati-python-net>`_ client.
- UDP transport backend (builtin) with `stati.UDPClient <http://github.com/GottWall/stati-python-net>`_ client.
- HTTP transport backend (builtin) with `stati.HTTPClient <http://github.com/GottWall/stati-python-net>`_ client


.. _available-clients:

Available clients
-----------------

The following clients are officially recognized as production-ready, and support the current GottWall protocol:

- `stati-http-python <http://github.com/GottWall/stati-python-net>`_ with json http transport.
- `stati-redis-python <http://github.com/GottWall/stati-python-redis>`_ with redis transport.


CONTRIBUTE
----------

We need you help.

#. Check for open issues or open a fresh issue to start a discussion around a feature idea or a bug.
   There is a Contributor Friendly tag for issues that should be ideal for people who are not very familiar with the codebase yet.
#. Fork `the repository`_ on Github to start making your changes to the **develop** branch (or branch off of it).
#. Write a test which shows that the bug was fixed or that the feature works as expected.
#. Send a pull request and bug the maintainer until it gets merged and published.

.. _`the repository`: https://github.com/GottWall/GottWall/


ETC
---

* Graphs widgets rendered with `rickshaw <http://code.shutterstock.com/rickshaw/>`_ (HTML5 + SVG and `d3.js <http://d3js.org/>`_) library.
