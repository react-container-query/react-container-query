'use strict';

const path = require('path');
const webpackConfig = require('./webpack.config.base');

const webpackModule = Object.create(webpackConfig.module);

webpackModule.preLoaders = [
  // transpile all files except testing sources with babel as usual
  {
    test: /\.js$/,
    exclude: [
      path.resolve('src/'),
      path.resolve('node_modules/')
    ],
    loader: 'babel'
  },
  // transpile and instrument only testing sources with isparta
  {
    test: /\.js$/,
    include: path.resolve('src/'),
    loader: 'isparta'
  }
];

const customLaunchers = {
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 10',
    // version: '46.0'
  },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    platform: 'Windows 10',
    // version: '42.0'
  },
  sl_safari_8: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.10',
    version: '8'
  },
  sl_safari_9: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.11',
    version: '9'
  },
  sl_ios_safari_7: {
    base: 'SauceLabs',
    browserName: 'iphone',
    platform: 'OS X 10.9',
    version: '7.1'
  },
  sl_ios_safari_8: {
    base: 'SauceLabs',
    browserName: 'iphone',
    platform: 'OS X 10.9',
    version: '8.4'
  },
  sl_ios_safari_9: {
    base: 'SauceLabs',
    browserName: 'iphone',
    platform: 'OS X 10.9',
    version: '9.2'
  },
  sl_android_4: {
    base: 'SauceLabs',
    browserName: 'android',
    deviceName: 'Android Emulator',
    platform: 'Linux',
    version: '4.4'
  },
  sl_android_5: {
    base: 'SauceLabs',
    browserName: 'android',
    deviceName: 'Android Emulator',
    platform: 'Linux',
    version: '5.1'
  },
  sl_ie_9: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 7',
    version: '9'
  },
  sl_ie_10: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8',
    version: '10'
  },
  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  },
  sl_ie_edge: {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10',
    // version: '20.10240'
  }
};

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
    reporters: process.env.TRAVIS ? ['spec', 'saucelabs', 'coverage'] : ['spec', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: process.env.TRAVIS ? Object.keys(customLaunchers) : ['Chrome'],
    singleRun: true,
    concurrency: Infinity,

    customLaunchers: customLaunchers,

    // Webpack preprocessor
    webpack: {
      devtool: 'inline-source-map',
      module: webpackModule,
      isparta: {
        embedSource: true,
        noAutoWrap: true
      }
    },

    // Saucelabs launcher
    sauceLabs: {
      testName: 'react-container-query',
      public: 'public'
    },

    coverageReporter: {
      reporters: [
        {type: 'html', subdir: 'report-html'},
        {type: 'text'}
      ]
    }
  });
};
