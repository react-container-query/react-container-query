'use strict';

const webpack = require('webpack');
const baseConfig = require('./webpack.config.base');

module.exports = Object.assign(baseConfig, {
  externals: null,

  entry: {
    index: './demo/index.js',
    perf: './demo/perf.js'
  },

  output: {
    filename: '[name].bundle.js',
    path: './demo'
  }
});
