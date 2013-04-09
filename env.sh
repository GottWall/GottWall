#!/bin/sh

. ./buildenv/buildenv.sh


wget -P venv/bin/ http://closure-compiler.googlecode.com/files/compiler-latest.zip
cd venv/bin/
unzip compiler-latest.zip
