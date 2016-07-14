#!/usr/bin/env bash

rm -rf public lib
tsc

tsc -w &
webpack --config config/webpack.config.examples.js -w &
gulp examples:html -w &
browser-sync start --server public -f public --no-ui --no-ghost-mode --no-notify --directory &

wait
