#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os.path

BACKENDS = {}

STORAGE = "gottwall.storages.MemoryStorage"
STORAGE_SETTINGS = {}

PROJECTS = {}

USERS = []

ANONYMOUS_LOGIN = False

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

site_title=u"GottWall is a scalable realtime metrics collecting and aggregation platform and service."

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
PERIODIC_PROCESSOR_TIME = 1000*60*1

cookie_secret = 'cookie_secret'

MAX_LOADING = 150


JINJA2_EXTENSIONS = (
    'jinja2.ext.do',
    'jinja2.ext.i18n'
)


EMBEDDED_PARAMS = {
    "height": 400,
    "width": 800,
    "renderer": "line", # area, stack, bar, line, and scatterplot,
    "interpolation": 'linear' # linear, step-after, cardinal,  basis
    }

RENDERERS = [
    "area",
    "stack",
    "bar",
    "line",
    "scatterplot",
    ]

INTERPOLATIONS = [
    "linear",
    "step-after",
    "cardinal",
    "basis"
    ]
