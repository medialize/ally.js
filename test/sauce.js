define([
  './intern.base-config.js',
], function(config) {

  // https://theintern.github.io/intern/#option-environments
  // see https://saucelabs.com/platforms/ for a list of supported platforms
  config.environments = [
    { browserName: 'internet explorer', version: '11', platform: 'Windows 8.1' },
    { browserName: 'internet explorer', version: '10', platform: 'Windows 8' },
    // { browserName: 'internet explorer', version: '9', platform: 'Windows 7' },
    { browserName: 'firefox', version: '40', platform: [ 'OS X 10.10', 'Windows 8.1', 'Linux' ] },
    // disabled firefox dev, see https://github.com/theintern/intern/issues/467#issuecomment-140313211
    // { browserName: 'firefox', version: 'dev', platform: [ 'OS X 10.10', 'Windows 8.1', 'Linux' ] },
    { browserName: 'chrome', version: '45', platform: [ 'OS X 10.10', 'Windows 8.1', 'Linux' ] },
    { browserName: 'chrome', version: 'dev', platform: [ 'OS X 10.10', 'Windows 8.1', 'Linux' ] },
    { browserName: 'safari', version: '6', platform: 'OS X 10.8' },
    { browserName: 'safari', version: '7', platform: 'OS X 10.9' },
    { browserName: 'safari', version: '8', platform: 'OS X 10.10' },
    // { browserName: 'safari', version: '8.1', platform: 'OS X 10.11' },
  ];
  // https://theintern.github.io/intern/#option-maxConcurrency
  // OpenSauce allows 5 concurrent VMs
  config.maxConcurrency = 5;
  // https://theintern.github.io/intern/#option-tunnel
  config.tunnel = 'SauceLabsTunnel';

  return config;
});
