'use strict';

const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

module.exports = Object.assign(baseConfig, {
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ]
});
