#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os.path

BACKENDS = []

STORAGE = "gottwall.storages.MemoryStorage"

PROJECTS = {}

USERS = []

PERIODS = [
    "week",
    "day",
    "year",
    "month",
    "hour",
    "all",
    "minute"]


template_path=os.path.join(os.path.dirname(__file__), "templates")
static_path=os.path.join(os.path.dirname(__file__), "static")

login_url = '/login'

site_title=u"GottWall - statistics aggregator"

ALEMBIC_SCRIPT_LOCATION = 'gottwall:migrations'


DATABASE = {
    "ENGINE": "postgresql",
    "NAME": "gottwall",
    "USER": "",
    "PASSWORD": "",
    "HOST": "",
    "PORT": ""}