'use strict';

module.exports = {
  entry: {
    'index': './demo/index.js',
    'perf': './demo/perf.js'
  },
  output: {
    filename: '[name].bundle.js',
    path: './demo'
  },
  devtool: 'source-map',

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?presets[]=react,presets[]=es2015-loose'
      }
    ]
  }
};
