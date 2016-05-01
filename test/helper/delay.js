define(function(require) {
  'use strict';

  var Promise = require('intern/dojo/Promise');

  return function delay(duration) {
    var dfd = new Promise.Deferred();
    setTimeout(dfd.resolve, duration);
    return dfd.promise;
  };

});