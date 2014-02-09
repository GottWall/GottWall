Contibuting
===========

#. Check for open issues or open a fresh issue to start a discussion around a feature idea or a bug.
   There is a Contributor Friendly tag for issues that should be ideal for people who are not very familiar with the codebase yet.
#. Fork `the repository`_ on Github to start making your changes to the **develop** branch (or branch off of it).
#. Write a test which shows that the bug was fixed or that the feature works as expected.
#. Send a pull request and bug the maintainer until it gets merged and published.


Environment
-----------

We created environment vagrant kit for contributors.

It's named `gottwall vagrant dev kit <https://github.com/GottWall/gottwall-vagrant-test-kit>`_.
You need to clone this repository to local system, initialize submodules and execute ``vagrant up``
in repository directory. This cookbooks configure virtual box node,
installed needed services: postgresql, redis, rabbitmq.


Profiling
---------

Stability and performance is a main priotitets. We working on its every day.

We use next utils to profile aplication:

cProfile
========

Most power `tool <http://docs.python.org/2/library/profile.html>`_ to profile python applications.


1. To start profiling application need run next command::

	 python -m cProfile -o profiling/gottwall_aggregator.prof gottwall/runner.py --config=examples/config.py server start -h 0.0.0.0 --reload --logging=debug

2. After you need to send data for aggregation via clients.

3. Next step need to analyze profiling results via pstats::

	 python -m pstats profiling/gottwall_aggregator.prof

Also many helpful to use results map image.

To convert cProfile result to img need execute::

  python tools/gprof2dot.py -f pstats profiling/gottwall_aggregator.prof | dot -Tpng -o profiling/aggregator_profile.png


plop
====

Another `tool <https://github.com/bdarnell/plop>`_ to profile python application.

To profile an entire Python script, run::

  python -m plop.collector gottwall/runner.py --config=examples/config.py server start -h 0.0.0.0 --reload --logging=debug

This will write the profile to /tmp/plop.out

To use the viewer, run::

  cp /tmp/plop.out ./profiles/*

  python -m plop.viewer --datadir=profiles


and go to http://localhost:8888



.. _`the repository`: https://github.com/GottWall/GottWall/
