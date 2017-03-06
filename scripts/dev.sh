#!/usr/bin/env bash

rm -rf public lib
./node_modules/.bin/tsc

./node_modules/.bin/tsc -w &
./node_modules/.bin/webpack --config config/webpack.config.examples.js -w &
./node_modules/.bin/gulp examples:html -w &
./node_modules/.bin/browser-sync start --server public -f public --no-ui --no-ghost-mode --no-notify --directory &

wait
