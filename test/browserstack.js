define(function(require) {
  'use strict';

  var config = require('./intern');
  var firefoxProfileWebcomponents = require('intern/dojo/text!./config/firefox-profile.webcomponents.txt');

  // https://www.browserstack.com/automate/capabilities
  config.capabilities = {
    project: 'ally.js',
    // 'browserstack.debug': true,
    // 'browserstack.video': true,
    // 'browserstack.ie.noFlash': true,

    // prevent download popup in chrome
    chromeOptions: {
      args: ['--multiple-automatic-downloads=1'],
    },
  };

  // https://theintern.github.io/intern/#option-environments
  // see https://www.browserstack.com/automate/capabilities
  /*eslint-disable camelcase */
  config.environments = [
    { browser: 'Edge', browser_version: '14.0', os: 'WINDOWS', os_version: '10', platform: 'WIN', browserName: 'Edge14' },
    { browser: 'Edge', browser_version: '13.0', os: 'WINDOWS', os_version: '10', platform: 'WIN', browserName: 'Edge13' },

    { browser: 'IE', browser_version: '11', os: 'WINDOWS', os_version: '8.1', platform: 'WIN', browserName: 'IE11' },
    { browser: 'IE', browser_version: '10', os: 'WINDOWS', os_version: '8', platform: 'WIN', browserName: 'IE10', nativeEvents: true },
    { browser: 'IE', browser_version: '9', os: 'WINDOWS', os_version: '7', platform: 'WIN', browserName: 'IE9' },

    { browser: 'Firefox', browser_version: '50', os: 'WINDOWS', os_version: '8.1', platform: 'WIN', browserName: 'Firefox 50' },
    { browser: 'Chrome', browser_version: '55', os: 'WINDOWS', os_version: '8.1', platform: 'WIN', browserName: 'Chrome 55' },

    { browser: 'Firefox', browser_version: '50', os: 'OS X', os_version: 'Yosemite', platform: 'MAC', browserName: 'Firefox 50' },
    { browser: 'Chrome', browser_version: '55', os: 'OS X', os_version: 'Yosemite', platform: 'MAC', browserName: 'Chrome 55' },

    {
      browser: 'Firefox',
      browser_version: '50',
      os: 'WINDOWS',
      os_version: '8.1',
      platform: 'WIN',
      browserName: 'Firefox 50 (ShadowDOM)',
      // dom.webcomponents.enabled=true
      firefox_profile: firefoxProfileWebcomponents,
    },

    {
      browser: 'Safari',
      browser_version: '10.0',
      os: 'OS X',
      os_version: 'Sierra',
      platform: 'MAC',
      browserName: 'Safari 10',
    },
    {
      browser: 'Safari',
      browser_version: '9.0',
      os: 'OS X',
      os_version: 'El Capitan',
      platform: 'MAC',
      browserName: 'Safari 9',
      'browserstack.safari.driver': '2.48',
    },
    {
      browser: 'Safari',
      browser_version: '8',
      os: 'OS X',
      os_version: 'Yosemite',
      platform: 'MAC',
      browserName: 'Safari 8',
      'browserstack.safari.driver': '2.48',
    },

    // Disabled because tests are flaky and BrowserStack-Support claims Intern is the culprit
    // { browserName: 'iPhone', platform: 'MAC', device: 'iPhone 6S' },
  ];
  /*eslint-enable camelcase */

  // https://theintern.github.io/intern/#option-maxConcurrency
  // OpenSauce allows 5 concurrent VMs
  //config.maxConcurrency = 5;
  config.maxConcurrency = 2;
  // https://theintern.github.io/intern/#option-tunnel
  config.tunnel = 'BrowserStackTunnel';
  config.tunnelOptions = {
    hostname: 'hub.browserstack.com',
    protocol: 'https',
    port: 443,
  };

  return config;
});
