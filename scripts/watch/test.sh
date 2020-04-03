#!/usr/bin/env bash

export NODE_ENV=test

rm -rf lib coverage
./node_modules/.bin/tsc

./node_modules/.bin/tsc -w &
./node_modules/.bin/karma start --no-single-run &

wait
