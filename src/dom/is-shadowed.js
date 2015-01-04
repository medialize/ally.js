define(function defineDomIsShadowed(require) {
  'use strict';

  var shadowHost = require('./shadow-host');

  function isShadowed(element) {
    return Boolean(shadowHost(element));
  }

  return isShadowed;
});