'use strict';

const webpack = require('webpack');
const objectExtend = require('object-extend');
const baseConfig = require('./webpack.config.base');

module.exports = objectExtend(baseConfig, {

  devtool: 'source-map',

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin()
  ]
});
