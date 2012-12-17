Writing a Client
================

A client at its core is simply a set of utilities for capturing various
logging parameters. Given these parameters, it then builds a JSON payload
which it will send to a GottWall server using some sort of authentication
method.

The following items are expected of production-ready clients:

* DSN configuration
* Graceful failures

Additionally, the following features are highly encouraged:

* Non-blocking event submission



Client Usage (End-user)
-----------------------

Generally, a client consists of three steps to the end user, which should look
almost identical no matter the language:

1. Creation of the client (sometimes this is hidden to the user)

  ::

      var my_client = new RedisClient('http://public_key:secret_key@example.com/default');

or

  ::
      var my_client = new RedisClient(private_key="private_key",
                                      public_key="public_key",
                                      project="project_name",
                                      host="host")

2. Send data

  ::

     my_client.incr(name="metric_name", value=2, timestamp=ts, filters={"status": "New", "user":"registered"})
