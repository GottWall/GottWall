#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os.path

BACKENDS = {}

STORAGE = "gottwall.storages.MemoryStorage"
STORAGE_SETTINGS = {}

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


TEMPLATES_PATH = [
    os.path.join(os.path.dirname(__file__), "templates")
    ]

static_path = os.path.join(os.path.dirname(__file__), "static")
static_url_prefix = "/static/"

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

PREFIX = '/gottwall'

# Run every minute
PERIODIC_PROCESSOR_TIME = 1000*60*5

cookie_secret = 'cookie_secret'
