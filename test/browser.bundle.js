define(function(require) {
  'use strict';

  var config = require('./browser');
  var allyModules = require('./helper/ally-modules');
  var allyBundle = require('../dist/ally.min');

  // intercept all ally.js modules and redirect them to
  // the functions exposed in the built bundle
  allyModules.map(function(namespace, module, internal) {
    if (!namespace || internal) {
      // not all modules are exposed in the dist bundle,
      // but we'll want to run tests regardless
      return;
    }

    var path = 'ally/' + namespace + '/' + module;
    // for some reason the loader won't resolve this
    // define(path, ['dist/ally.min'], function(ally) {});
    define(path, [], function() {
      var _module = allyModules.camelCase(module);
      return allyBundle[namespace][_module];
    });
  });

  return config;
});
