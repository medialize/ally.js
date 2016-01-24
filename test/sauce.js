define([
  './intern.base-config.js',
], function(config) {

  // https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/
  config.environments = [
    // Intern 3.0.6+ is not yet able to run on MS Edge
    // { browserName: 'MicrosoftEdge', version: '20.10240', platform: 'Windows 10' },
    { browserName: 'internet explorer', version: '11', platform: 'Windows 8.1' },
    { browserName: 'internet explorer', version: '10', platform: 'Windows 8' },
    { browserName: 'internet explorer', version: '9', platform: 'Windows 7' },

    { browserName: 'firefox', version: '43', platform: [ 'OS X 10.11', 'Windows 8.1' ] },
    { browserName: 'chrome', version: '47', platform: [ 'OS X 10.10', 'Windows 8.1' ] },

    // Safari VMs doen't work on SauceLabs
    // { browserName: 'safari', version: '9', platform: 'OS X 10.11' },
    // { browserName: 'safari', version: '8', platform: 'OS X 10.10' },
    // { browserName: 'safari', version: '7', platform: 'OS X 10.9' },
    // { browserName: 'safari', version: '6', platform: 'OS X 10.8' },
  ];
  // https://theintern.github.io/intern/#option-maxConcurrency
  // OpenSauce allows 5 concurrent VMs
  config.maxConcurrency = 5;
  // https://theintern.github.io/intern/#option-tunnel
  config.tunnel = 'SauceLabsTunnel';

  return config;
});
