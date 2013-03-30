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

Now you’ll need to create the default configuration.

Copy ``examples/config.py`` to your location (as example ~/.gottwall/gottwall.conf.py.)

.. code-block:: python

   STORAGE = 'gottwall.storages.RedisStorage'

   BACKENDS = {
      'gottwall.backends.redis.RedisBackend': {
      'HOST': "127.0.0.1",
      'PORT': 6379,
      'PASSWORD': None,
      'DB': 2,
      'CHANNEL': 'gottwall'},
    }

   TEMPLATE_DEBUG = True

   STORAGE_SETTINGS = dict(
      HOST = 'localhost',
      PORT = 6379,
      PASSWORD = None,
      DB = 2
   )

   REDIS = {"CHANNEL": "gottwall"}


   USERS = ["you@email.com"]

   SECRET_KEY = "very secret key"



   PROJECTS = {"test_project": "my_public_key",
               "another_project": "public_key2"}

   cookie_secret="fkerwerwerwerw"

   TEMPLATE_DEBUG = True

   PREFIX = ""


Startings services
------------------

GottWall have 2 independent parts. Web interface application and aggregator application (application that process data).

Starting web dashboard
^^^^^^^^^^^^^^^^^^^^^^

To run web application execute command: ``gottwall --config="examples/config.py" server start``


Starting aggregator
^^^^^^^^^^^^^^^^^^^

To run aggregator application execute command: ``gottwall --config="examples/config.py" aggregator start``

