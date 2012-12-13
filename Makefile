all: clean-pyc test

vm-start:
	cd tests && vagrant up

test:
	python setup.py nosetests --stop --tests tests.py

travis:
	python setup.py nosetests --tests tests.py

coverage:
	python setup.py nosetests  --with-coverage --cover-package=gottwall --cover-html --cover-html-dir=coverage_out coverage


shell:
	../venv/bin/ipython

audit:
	python setup.py autdit

release:
	python setup.py sdist upload
	python setup.py bdist_wininst upload

clean-pyc:
	find . -name '*.pyc' -exec rm -f {} +
	find . -name '*.pyo' -exec rm -f {} +
	find . -name '*~' -exec rm -f {} +

find-print:
	grep -r --include=*.py --exclude-dir=venv --exclude=fabfile* --exclude=tests.py --exclude-dir=tests --exclude-dir=commands 'print' ./

env:
	./buildenv.sh
	. venv/bin/activate

debug:
	python gottwall/runner.py --config=examples/config.py server start --reload