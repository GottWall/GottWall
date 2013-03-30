Available Clients
=================

The following clients are officially recognized as production-ready, and support the current Sentry
protocol:

- stati-redis (`stati-redis-python <http://github.com/GottWall/stati-redis-python>`_) with redis transport.



Client Criteria
---------------

If you're developing a client for your platform, there's several things we highly encourage:

* It should fully implement the current version of the GottWall protocol.

* It should conform to the standard DSN configuration method.

* It should contain an acceptable level of documentation and tests.

* The client should be properly packaged, and named stati-<platform>.
