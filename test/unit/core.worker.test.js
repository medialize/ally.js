define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var TestWorker = require('../helper/test-worker');
  var allyModules = require('../helper/ally-modules');

  bdd.describe('core: loading in Worker', function() {
    var worker;

    // 'ally.js/<namespace>/<module>'
    // 'ally.js/<module>'
    var modules = allyModules.map(function(namespace, module) {
      return ['ally.js', namespace, module].filter(Boolean).join('/');
    });

    bdd.before(function() {
      if (!TestWorker) {
        this.skip('Worker not supported');
      }

      worker = new TestWorker();
    });

    bdd.after(function() {
      worker && worker.terminate();
      worker = null;
    });

    bdd.describe('for individual modules', function() {
      modules.forEach(function(module) {
        bdd.it('should load ' + module, function() {
          var deferred = this.async(30000);

          worker.run(module, function(_module) {
            // we only care about the existence
            return Boolean(_module);
          }).test(deferred, function(_module) {
            expect(_module).to.equal(true);
          });
        });
      });
    });

    bdd.describe('for bundle', function() {
      bdd.it('should load dist/ally.min.js', function() {
        var deferred = this.async(30000);

        worker.run('../../dist/ally.min.js', function(_module) {
          return _module.version;
        }).test(deferred, function(_module) {
          expect(_module).to.be.a('string');
        });
      });
    });

  });
});
