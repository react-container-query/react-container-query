'use strict';

const path = require('path');
const customLaunchers = require('./browserstack-browsers.json');
const webpackConfig = require('./webpack.config.base');

const webpackModule = Object.create(webpackConfig.module);

webpackModule.preLoaders = [
  // transpile all files except testing sources with babel as usual
  {
    test: /\.js$/,
    exclude: [
      path.resolve('node_modules/')
    ],
    loader: 'babel'
  },
];

const coverageReporters = [
  {
    type: 'html',
    subdir: (browser) => `${browser.toLowerCase().replace(/ /g, '-')}-html`
  },
  {
    type: 'json',
    subdir: (browser) => `${browser.toLowerCase().replace(/ /g, '-')}-json`
  },
];

if (!process.env.CI) {
  coverageReporters.push({
    type: 'text'
  });
}

module.exports = function (config) {
  config.set({
    basePath: '.',
    frameworks: ['jasmine'],
    files: [
      'test/index.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'test/index.js': ['webpack', 'sourcemap']
    },
    reporters: ['spec', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: process.env.CI ? Object.keys(customLaunchers) : ['Chrome'],
    singleRun: true,
    concurrency: 2,

    customLaunchers: customLaunchers,

    // Webpack preprocessor
    webpack: {
      devtool: 'inline-source-map',
      module: webpackModule,
    },

    // Coverage
    coverageReporter: {
      reporters: coverageReporters
    },

    // Saucelabs launcher
    browserStack: {
      project: 'react-container-query'
    },
  });
};
