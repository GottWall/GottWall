#!/bin/sh


if [ ! -d "./buildenv/" ]; then
    git submodule add https://github.com/Lispython/buildenv.sh.git buildenv
else
    cd buildenv && git pull && cd ..
fi

. ./buildenv/buildenv.sh