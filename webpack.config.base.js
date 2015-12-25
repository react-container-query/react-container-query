'use strict';

const reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

module.exports = {
  externals: {
    react: reactExternal
  },

  output: {
    library: 'ReactCreateContainerQueryMixin',
    libraryTarget: 'umd'
  },

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
