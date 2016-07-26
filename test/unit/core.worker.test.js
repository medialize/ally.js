define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var TestWorker = require('../helper/test-worker');
  var allyModules = require('../helper/ally-modules');

  registerSuite(function() {
    var worker;

    // 'ally.js/<namespace>/<module>'
    // 'ally.js/<module>'
    var modules = allyModules.map(function(namespace, module) {
      return ['ally.js', namespace, module].filter(Boolean).join('/');
    });

    var suite = {
      name: 'core: WebWorker',

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
    };

    function generateTestForModule(module) {
      return function() {
        if (!worker) {
          this.skip('Worker not supported');
        }

        var deferred = this.async(30000);
        worker.run(module, function(_module) {
          return Boolean(_module);
        }).test(deferred, function(_module) {
          expect(_module).to.equal(true);
        });
      };
    }

    modules.forEach(function(module) {
      suite['load ' + module] = generateTestForModule(module);
    });

    return suite;
  });
});
