define([
  './intern.base-config.js',
], function(config) {

  delete config.reporters;

  return config;
});
