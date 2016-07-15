'use strict';

const join = require('path').join;

module.exports = {
  entry: {
    'simple': join(__dirname, '../examples/simple/index.js')
  },

  output: {
    filename: '[name]/index.js',
    path: join(__dirname, '../public')
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  }
};
