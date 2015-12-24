'use strict';

const webpackConfig = require('./webpack.config');

module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: [
      'test/**/*.spec.js'
    ],
    exclude: [
    ],
    preprocessors: {
      './test/**/*.js': ['webpack', 'sourcemap']
    },
    reporters: ['spec'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: true,
    concurrency: Infinity,

    // Webpack preprocessor
    webpack: {
      module: webpackConfig.module,
      devtool: 'inline-source-map',
    }
  });
};
