'use strict';

module.exports = {
  entry: {
    script: './js/index.js'
  },

  output: {
    filename: '[name].js',
    path: '.'
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        loader: 'babel',
        exclude: /node_modules/,
        test: /\.js$/
      }
    ]
  }
};
