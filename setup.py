#!/usr/bin/env python
# -*- coding:  utf-8 -*-
"""
gottwall
~~~~~~~~

GottWall is scalable realtime metrics collecting and aggregation platform and service

:copyright: (c) 2012 - 2013 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/GottWall/GottWall
"""

import sys
import os


from setuptools import setup, find_packages

try:
    readme_content = open(os.path.join(os.path.abspath(
        os.path.dirname(__file__)), "README.rst")).read()
except Exception, e:
    print(e)
    readme_content = __doc__


VERSION = "0.3.6"


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
    "tornado-redis==2.4.1",
    "commandor==0.1.5",
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
    description="GottWall is scalable realtime metrics collecting and aggregation platform and service",
    long_description=readme_content,
    author="Alex Lispython",
    author_email="alex@obout.ru",
    maintainer="Alexandr Lispython",
    maintainer_email="alex@obout.ru",
    url="https://github.com/GottWall/GottWall",
    packages=find_packages(),
    package_data={'': PACKAGE_DATA},
    entry_points={
        'console_scripts': [
            'gottwall = gottwall.runner:main',
        ]},
    install_requires=install_requires,
    tests_require=tests_require,
    license="BSD",
    platforms = ['Linux', 'Mac'],
    classifiers=[
        "Environment :: Web Environment",
        "License :: OSI Approved :: BSD License",
        "Programming Language :: Python",
        "Programming Language :: Python :: 2.6",
        "Programming Language :: Python :: 2.7",
        "Operating System :: MacOS :: MacOS X",
        "Operating System :: POSIX",
        "Topic :: Internet",
        "Topic :: Software Development :: Libraries",
        "Development Status :: 4 - Beta",
        "Development Status :: 5 - Production/Stable",
        "Topic :: System :: Installation/Setup",
        "Topic :: System :: Logging",
        "Topic :: System :: Monitoring",
        "Topic :: System :: Networking",
        "Intended Audience :: Customer Service",
        "Intended Audience :: Developers",
        "Intended Audience :: Information Technology",
        "Intended Audience :: System Administrators",
        "Topic :: Internet :: Log Analysis",
        "Topic :: Scientific/Engineering :: Information Analysis",
        "Topic :: Scientific/Engineering :: Visualization",
        "Topic :: System :: Networking",
        "Topic :: System :: Networking :: Monitoring"
        ],
    test_suite = '__main__.run_tests'
    )
