Available Transport Backends
============================

GottWall supports several backends in core package.


The following transport are supported current GottWall servers:

- ``gottwall.backends.tcpip.TCPIPBackend`` [:ref:`backends/tcpip`] - TCP/IP transport backend (built in);

- ``gottwall.backends.udp.UDPBackend`` [:ref:`backends/udp`] - UDP transport backend (build in);

- ``gottwall.backends.http.HTTPBackend`` [:ref:`backends/http] - default transport backend (build in) with `stati.HTTPClient <http://github.com/GottWall/stati-python-net>`_ client.


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

- ``gw_backend_redis.RedisBackend`` - `redis transport backend <http://github.com/GottWall/gottwall-backend-redis>`_ with `stati-python-redis <http://github.com/GottWall/stati-python-redis>`_ client.

- ``gw_backend_amqp.AMQPBackend`` - ``AMQP transport backend <http://github.com/GottWall/gottwall-backend-amqp>`_ (TODO)
