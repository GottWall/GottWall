all: clean-pyc test

vm-start:
	cd tests && vagrant up

docs:
	cd docs && make html

test:
	python setup.py nosetests --stop --tests tests.py

travis:
	python setup.py nosetests --tests tests.py

shell:
	../venv/bin/ipython

audit:
	python setup.py autdit

version := $(shell sh -c "grep -oP 'VERSION = \"\K[0-9\.]*?(?=\")' ./setup.py")


release:
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

env:
	./buildenv.sh
	. venv/bin/activate

debug:
	python gottwall/runner.py --config=examples/config.py server start --reload

aggregator-debug:
	python gottwall/runner.py --config=examples/config.py aggregator start --reload

vagrant-debug:
	python gottwall/runner.py --config=examples/vagrant_config.py server start --reload

aggregator-vagrant-debug:
	python gottwall/runner.py --config=examples/vagrant_config.py aggregator start --reload