define([
  './intern',
], function(config) {

  // make sure to start the proxy, but not run the tests when
  // this config is used with the intern-runner CLI
  config.proxyOnly = true;

  delete config.reporters;

  return config;
});
