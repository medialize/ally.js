define(function(require) {
  'use strict';

  var config = require('./intern');

  // make sure to start the proxy, but not run the tests when
  // this config is used with the intern-runner CLI
  config.proxyOnly = true;
  // disable instrumentation to get clean files for debugging
  // and prevent the Proxy's internal cache for instrumented
  // files from serving changed content
  config.excludeInstrumentation = true;

  delete config.reporters;

  return config;
});
