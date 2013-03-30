Available Transport Backends
============================

GottWall supports several backends in core package.


The following transport are supported current GottWall servers:

- ``gottwall.backends.redis.RedisBackends`` - redis transport backends

- ``gottwall.backends.tcpip.TCPIPBackend`` - TCP/IP transport backend

- ``gottwall.backends.http.HTTPBackend`` - default transport backends


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
