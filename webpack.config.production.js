'use strict';

const webpack = require('webpack');

const webpackConfig = require('./webpack.config');

module.exports = Object.assign(webpackConfig, {
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  ]
});
