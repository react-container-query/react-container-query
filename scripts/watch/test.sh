#!/usr/bin/env bash

export NODE_ENV=test

rm -rf lib coverage
tsc

tsc -w &
karma start --no-single-run &

wait
