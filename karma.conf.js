'use strict';

const path = require('path');
const customLaunchers = require('./config/saucelabs-browsers');
const webpackConfig = require('./config/webpack.config.base');

const webpackModule = Object.create(webpackConfig.module);

webpackModule.rules = [
  // transpile all files except testing sources with babel as usual
  {
    test: /\.js$/,
    exclude: [
      path.resolve('node_modules/')
    ],
    loader: 'babel-loader',
    enforce: 'pre',
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
      'test/client/index.js'
    ],
    exclude: [
    ],
    preprocessors: {
      'test/client/index.js': ['webpack', 'sourcemap']
    },
    reporters: process.env.CI ? ['spec', 'coverage', 'saucelabs'] : ['spec', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: process.env.CI ? Object.keys(customLaunchers) : ['Chrome'],
    singleRun: true,
    concurrency: 2, // SanceLabs free account for open source
    browserDisconnectTolerance: 3,

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
    sauceLabs: {
      testName: 'react-container-query',
      public: 'public'
    },
  });
};
