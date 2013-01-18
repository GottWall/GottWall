#!/usr/bin/env python
# -*- coding:  utf-8 -*-
"""
gottwall
~~~~~~~~

Realtime statistics aggregation platform

:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
"""

import sys
import os
try:
    import subprocess
    has_subprocess = True
except:
    has_subprocess = False

from setuptools import Command, setup, find_packages

try:
    readme_content = open(os.path.join(os.path.abspath(
        os.path.dirname(__file__)), "README.rst")).read()
except Exception, e:
    print(e)
    readme_content = __doc__


VERSION = "0.1.20"


class run_audit(Command):
    """Audits source code using PyFlakes for following issues:
        - Names which are used but not defined or used before they are defined.
        - Names which are redefined without having been used.
    """
    description = "Audit source code with PyFlakes"
    user_options = []

    def initialize_options(self):
        all = None

    def finalize_options(self):
        pass

    def run(self):
        try:
            import pyflakes.scripts.pyflakes as flakes
        except ImportError:
            print "Audit requires PyFlakes installed in your system."""
            sys.exit(-1)

        dirs = ['gottwall']
        # Add example directories
        for dir in []:
            dirs.append(os.path.join('examples', dir))
        # TODO: Add test subdirectories
        warns = 0
        for dir in dirs:
            for filename in os.listdir(dir):
                if filename.endswith('.py') and filename != '__init__.py':
                    warns += flakes.checkPath(os.path.join(dir, filename))
        if warns > 0:
            print ("Audit finished with total %d warnings." % warns)
        else:
            print ("No problems found in sourcecode.")


def run_tests():
    from tests import suite
    return suite()

py_ver = sys.version_info

#: Python 2.x?
is_py2 = (py_ver[0] == 2)

#: Python 3.x?
is_py3 = (py_ver[0] == 3)

tests_require = [
    'nose',
    'mock==1.0.1']

install_requires = [
    "redis==2.7.2",
    "tornado==2.4.1",
    "python-dateutil==2.1",
    "tornado-redis==1.0.1",
    "commandor==0.1.1",
    "SQLAlchemy==0.7.9",
    "alembic==0.4.0",
    "Jinja2==2.6"]

if not (is_py3 or (is_py2 and py_ver[1] >= 7)):
    install_requires.append("importlib==1.0.2")

PACKAGE_DATA = []
PROJECT = 'gottwall'
for folder in ['static', 'templates']:
    for root, dirs, files in os.walk(os.path.join(PROJECT, folder)):
        for filename in files:
            PACKAGE_DATA.append("%s/%s" % (root[len(PROJECT) + 1:], filename))

setup(
    name="gottwall",
    version=VERSION,
    description="Realtime statistics aggregation platform",
    long_description=readme_content,
    author="Alex Lispython",
    author_email="alex@obout.ru",
    maintainer="Alexandr Lispython",
    maintainer_email="alex@obout.ru",
    url="https://github.com/gottwall/gottwall",
    packages=find_packages(),
    package_data={'': PACKAGE_DATA},
    entry_points={
        'console_scripts': [
            'gottwall = gottwall.runner:main',
        ]},
    install_requires=install_requires,
    tests_require=tests_require,
    license="BSD",
#    test_suite="nose.collector",
    platforms = ['Linux', 'Mac'],
    classifiers=[
        "Environment :: Web Environment",
        "License :: OSI Approved :: BSD License",
        "Programming Language :: Python",
        "Operating System :: MacOS :: MacOS X",
        "Operating System :: POSIX",
        "Topic :: Internet",
        "Topic :: Software Development :: Libraries"
        ],
    cmdclass={'audit': run_audit},
    test_suite = '__main__.run_tests'
    )
