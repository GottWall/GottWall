#!/bin/sh

REQ_FILE=./req.txt


if [ ! -d "./tools/buildenv.sh" ]; then

	curl https://raw.github.com/Lispython/buildenv.sh/master/buildenv.sh > tools/buildenv.sh

fi

. ./tools/buildenv.sh
