Available Transport Backends
============================

GottWall supports several backends in core package.


The following transport are supported current GottWall servers:

- ``gottwall.backends.tcpip.TCPIPBackend`` [:ref:`backends/tcpip`] - TCP/IP transport backend (built in)

- ``gottwall.backends.http.HTTPBackend`` [:ref:`backends/http] - default transport backend (build in) with `stati-python-http <http://github.com/GottWall/stati-python-http>`_ client.


Backend development
-------------------

Also you can develop custom backend for your own server.
You need make package that included backend class
inherited from ``gottwall.backends.base.BaseBackend``.

For use this backend need to add import path to ``BACKANDS`` dict in gottwall config:

.. code-block:: python

   BACKENDS = {
     "custom.transport.backend.Backend": {
        "BACKEND_PARAM": "value"
     }
   }



Custom backend must override methods: ``setup_backend``


Third party transport backends
------------------------------

- ``gottwall.backends.redis.RedisBackends`` - `redis transport backend <http://github.com/GottWall/gottwall-backend-redis>`_ with `stati-python-redis <http://github.com/GottWall/stati-python-redis>`_ client.
