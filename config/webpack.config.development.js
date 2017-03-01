'use strict';

// eslint-disable-next-line import/no-extraneous-dependencies
const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

module.exports = Object.assign(baseConfig, {
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ]
});
