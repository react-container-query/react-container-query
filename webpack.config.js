'use strict';

module.exports = {
  entry: './demo/index.js',
  output: {
    filename: 'bundle.js',
    path: './demo',
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
