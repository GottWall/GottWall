#!/bin/sh

#sudo apt-get install binutils gdal-bin postgresql-8.4-postgis libgeoip1 gdal-bin libgdal-dev swig

py(){
	virtualenv --python=python2.7 --clear venv
	. venv/bin/activate
	./venv/bin/easy_install pip
}

js(){
	nodeenv -v --requirement=./js-req.txt -n 0.6.5 jsvenv
}


case $1 in
	"py") py;;

	"js") js;;

	*) py;;
esac