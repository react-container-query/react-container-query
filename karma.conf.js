'use strict';

const webpackConfig = require('./webpack.config');

const customLaunchers = {
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 7',
    version: '35'
  },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    version: '30'
  },
  sl_ios_safari: {
    base: 'SauceLabs',
    browserName: 'iphone',
    platform: 'OS X 10.9',
    version: '7.1'
  },
  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  }
};

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
    reporters: ['spec', 'saucelabs'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    // browsers: ['Chrome'],
    browsers: Object.keys(customLaunchers),
    singleRun: true,
    concurrency: Infinity,

    customLaunchers: customLaunchers,

    // Webpack preprocessor
    webpack: {
      module: webpackConfig.module,
      devtool: 'inline-source-map',
    },

    // Saucelabs launcher
    sauceLabs: {
      testName: 'react-container-query',
      public: 'public'
    }
  });
};
