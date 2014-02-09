STATIC_DIR =$(CURDIR)/gottwall/static/
SERVER_HOST=0.0.0.0


all: clean-pyc test

vm-start:
	cd tests && vagrant up

docs:
	cd docs && make html

test:
	python setup.py nosetests --stop --tests tests.py

dev-test:
	GOTTWALL_REDIS_HOST=127.0.0.1 python setup.py test

travis:
	python setup.py test

shell:
	../venv/bin/ipython

audit:
	python setup.py autdit

version := $(shell sh -c "grep -oP 'VERSION = \"\K[0-9\.]*?(?=\")' ./setup.py")

build:
	python setup.py sdist

release: static clean-pyc
	git add ./gottwall/static/
	git commit -m "Compiled static for v$(version)"; echo "";
	git tag -f v$(version) && git push --tags
	python setup.py sdist upload

clean-pyc:
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -name '*~' -exec rm -f {} +

clean: clean-pyc
	find . -name '*.egg' -exec rm -rf {} +

find-print:
	grep -r --include=*.py --exclude-dir=venv --exclude=fabfile* --exclude=tests.py --exclude-dir=tests --exclude-dir=commands 'print' ./

activate:
	. venv/bin/activate

MINIFIED_JS = $(STATIC_DIR)js/app.min.js
BUILD_JS = $(STATIC_DIR)js/app.build.js

MINIFIED_CSS = $(STATIC_DIR)css/main.min.css
BUILD_CSS = $(STATIC_DIR)css/main.build.css

EMBEDDED_JS_FILES=\
	$(STATIC_DIR)js/jquery.js\
	$(STATIC_DIR)js/d3.v2.js\
	$(STATIC_DIR)vendor/rickshaw.js\

EMBEDDED_JS_BUILD = $(STATIC_DIR)js/embedded.build.js
EMBEDDED_JS_MINIFIED = $(STATIC_DIR)js/embedded.min.js

EMBEDDED_CSS_BUILD = $(STATIC_DIR)css/embedded.build.css
EMBEDDED_CSS_MINIFIED = $(STATIC_DIR)css/embedded.min.css

static: activate
	echo "Building single minified css and js files for producition"
	r.js -o ./gottwall/static/build.js out=$(BUILD_JS)
# java -jar venv/bin/compiler.jar --js $(BUILD_JS) --compilation_level ADVANCED_OPTIMIZATIONS --js_output_file $(MINIFIED_JS)
# Google closure make better minification, but broken file
	yui-compressor $(BUILD_JS) -o $(MINIFIED_JS) --charset utf-8 --type=js

	echo "Embedded js minification"
	cat $(EMBEDDED_JS_FILES) > $(EMBEDDED_JS_BUILD)
	yui-compressor $(EMBEDDED_JS_BUILD) -o $(EMBEDDED_JS_MINIFIED) --charset utf-8 --type=js
# Css minification
	# Main css minification
	r.js -o ./gottwall/static/css_build.js out=$(BUILD_CSS) cssIn=$(STATIC_DIR)css/main.css
	yui-compressor $(BUILD_CSS) -o $(MINIFIED_CSS) --charset utf-8 --type=css

	# Embedded css minification
	r.js -o ./gottwall/static/css_build.js out=$(EMBEDDED_CSS_BUILD) cssIn=$(STATIC_DIR)css/embedded.css
	yui-compressor $(EMBEDDED_CSS_BUILD) -o $(EMBEDDED_CSS_MINIFIED) --charset utf-8 --type=css

env:
	./buildenv.sh
	. venv/bin/activate

debug:
	python gottwall/runner.py --config=examples/config.py server start  --reload --logging=debug

aggregator-debug:
	python gottwall/runner.py --config=examples/config.py aggregator start  --reload --logging=debug

vagrant-debug:
	python gottwall/runner.py --config=examples/vagrant_config.py server start  --reload --logging=debug

aggregator-vagrant-debug:
	python gottwall/runner.py --config=examples/vagrant_config.py aggregator start  --reload --logging=debug

profile-server:
	python -m cProfile -o profiling/gottwall_server.pyprof gottwall/runner.py --config=examples/vagrant_config.py server start   --reload --logging=debug
	python tools/gprof2dot.py -f pstats profiling/gottwall_server.pyprof | dot -Tpng -o profiling/server_profile.png

profile-aggregator:
	python -m cProfile -o profiling/gottwall_aggregator.pyprof gottwall/runner.py --config=examples/vagrant_config.py server start --reload --logging=debug
	python tools/gprof2dot.py -f pstats profiling/gottwall_aggregator.pyprof | dot -Tpng -o profiling/aggregator_profile.png


profile-plop-server:
	python -m plop.collector gottwall/runner.py --config=examples/config.py server start  --reload --logging=debug

profile-plop-aggregator:
	python -m plop.collector gottwall/runner.py --config=examples/config.py server start  --reload --logging=debug

view-plop-profiles:
	python -m plop.viewer --address=0.0.0.0 --datadir=profiles/
