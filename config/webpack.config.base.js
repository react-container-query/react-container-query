'use strict';

const reactExternal = {
  root: 'React',
  commonjs2: 'react',
  commonjs: 'react',
  amd: 'react'
};

const reactDomExternal = {
  root: 'ReactDOM',
  commonjs2: 'react-dom',
  commonjs: 'react-dom',
  amd: 'react-dom'
};

module.exports = {
  externals: {
    react: reactExternal,
    'react-dom': reactDomExternal
  },

  output: {
    library: 'ReactContainerQuery',
    libraryTarget: 'umd'
  },

  devtool: 'source-map',

  module: {
    loaders: [
      {
        loader: 'babel-loader',
        exclude: /node_modules/,
        test: /\.js$/
      }
    ]
  }
};
