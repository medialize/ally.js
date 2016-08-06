define(function(require) {
  'use strict';

  var config = require('./intern');

  // https://theintern.github.io/intern/#option-tunnel
  config.tunnel = 'SeleniumTunnel';
  config.tunnelOptions = {
    drivers: ['chrome'],
  };

  // https://theintern.github.io/intern/#option-environments
  config.environments = [
    { browserName: 'chrome' },
  ];

  return config;
});
