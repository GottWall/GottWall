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


.. _`the repository`: https://github.com/GottWall/GottWall/
