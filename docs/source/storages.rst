Available Storages
==================

Storage is a component of system that store calculated metrics data and
performs calculation operations.

GottWall supports several storages in core package.

The following storages are supported current GottWall server:

- ``gottwall.storages.memory.Memory`` - stored metrics in memory

- ``gottwall.storages.memory.Redis`` - stored metrics in redis database

To use specified store need to setup ``STORAGE`` variable in GottWall config.



Storage development
-------------------

Also you can develop custom storage for your own server.
You need make package that included backend class
inherited from ``gottwall.storages.base.BaseBackend``.

Custom storage must override methods:

.. py:class:: CustomStorage(gottwall.storages.base.BaseBackend)

   .. py:method:: incr(project, name, timestamp, value=1, filters={}, **kwargs):

      Add count for metric `name` and `filters`

   .. py:method:: decr

      Sub value from metric `name` in `project`

   .. py:method:: slise_data

      Get data by range and filters

   .. py:method:: metrics

      Get metrics list


Third party storages
--------------------
