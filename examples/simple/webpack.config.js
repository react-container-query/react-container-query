'use strict';

const join = require('path').join;

module.exports = {
  entry: join(__dirname, '/index.js'),

  output: {
    filename: join(__dirname, '../../public/examples/simple/index.js'),
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
      }
    ]
  }
};
