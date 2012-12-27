Quickstart
==========

Some basic prerequisites which you'll need in order to run GottWall:

* Python 2.6, or 2.7
* python-setuptools, python-dev
* Likely a UNIX-based operating system


Environment configuration
-------------------------

We recomended to install GottWall to separated environment.

The first thing you'll need is the Python ``virtualenv`` package. You probably already
have this, but if not, you can install it with::

  easy_install -U virtualenv

Once that's done, choose a location for the environment, and create it with the ``virtualenv``
command. For our guide, we're going to choose ``/www/gottwall/``::

  virtualenv /www/gottwall

Finally, activate your virtualenv::

  source /www/gottwall/bin/activate

.. note:: Activating the environment adjusts your PATH, so that things like easy_install now
          install into the virtualenv by default.

Installation
------------

After environment activation install GottWall package to your env via ``easy_install``::

  easy_install -U gottwall

or ``pip``::

  pip install gottwall

After installation you can execute command in console ``gottwall -h``, it's show gottwall manager
documentation.


Configuration
-------------

Now you need to configure backands and storages.
