#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
gottwall.models
~~~~~~~~~~~~~~~

Model that store statistics info

:copyright: (c) 2012 by GottWall team, see AUTHORS for more details.
:license: BSD, see LICENSE for more details.
:github: http://github.com/Lispython/gottwall
"""
from sqlalchemy import Column, Integer, String, Sequence
from sqlalchemy.ext.declarative import declarative_base


Base = declarative_base()

class Project(Base):
    """Metric project
    """
    __tablename__ = "projects"
    id = Column(Integer, Sequence('project_id_seq'), primary_key=True)
    name = Column(String)
    key = Column(String) # Private api key


    def __repr__(self):
        return u"<Project({0}, {1}".format(self.id, self.name)


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, Sequence('user_id_seq'), primary_key=True)
    name = Column(String)
    fullname = Column(String)
    password = Column(String)

    def __repr__(self):
        return u"<User('%s','%s', '%s')>" % (self.name, self.fullname, self.password)
