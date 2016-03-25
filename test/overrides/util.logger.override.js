define([], function() {
  'use strict';

  var noop = function() {};

  return {
    log: noop,
    debug: noop,
    info: noop,
    warn: noop,
    error: noop,
  };
});
