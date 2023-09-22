'use strict';

module.exports = {
  sl_chrome: {
    base: 'SauceLabs',
    browserName: 'chrome',
    platform: 'Windows 10',
  },
  sl_firefox: {
    base: 'SauceLabs',
    browserName: 'firefox',
    platform: 'Windows 10',
  },
  sl_safari_13: {
    base: 'SauceLabs',
    browserName: 'safari',
    platform: 'OS X 10.15',
    version: '13'
  },
  sl_ios_safari_16: {
    base: 'SauceLabs',
    browserName: 'safari',
    deviceName: 'iPhone Simulator',
    platform: 'iOS',
    version: '16.1'
  },
  // Disable Android testing because I don't know how to get it to work with
  // SauceLabs
  //
  // sl_android_4: {
  //   base: 'SauceLabs',
  //   browserName: 'chrome',
  //   deviceName: 'Android Emulator',
  //   platform: 'Android',
  //   version: '4.4'
  // },
  // sl_android_5: {
  //   base: 'SauceLabs',
  //   browserName: 'chrome',
  //   deviceName: 'Android Emulator',
  //   platform: 'Android',
  //   version: '5.1'
  // },
  // sl_android_6: {
  //   base: 'SauceLabs',
  //   browserName: 'chrome',
  //   deviceName: 'Samsung Galaxy S7 Device',
  //   platform: 'Android',
  //   version: '6.0'
  // },
  sl_ie_edge: {
    base: 'SauceLabs',
    browserName: 'MicrosoftEdge',
    platform: 'Windows 10',
  },
  sl_ie_11: {
    base: 'SauceLabs',
    browserName: 'internet explorer',
    platform: 'Windows 8.1',
    version: '11'
  },
};
