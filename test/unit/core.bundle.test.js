define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var TestWorker = require('../helper/test-worker');

  registerSuite(function() {
    var worker;

    var suite = {
      name: 'core: Bundle',

      before: function() {
        if (!TestWorker) {
          return;
        }

        worker = new TestWorker();
      },
      after: function() {
        worker && worker.terminate();
        worker = null;
      },

      'load bundle': function() {
        if (!worker) {
          this.skip('Worker not supported');
        }

        var deferred = this.async(30000);
        // referencing
        worker.run('../../dist/ally.min.js', function(_module) {
          return _module.version;
        }).test(deferred, function(_module) {
          expect(_module).to.be.a('string');
        });
      },
    };

    return suite;
  });
});
