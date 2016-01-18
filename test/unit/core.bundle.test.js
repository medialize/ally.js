define([
  'intern!object',
  'intern/chai!expect',
  '../helper/test-worker',
  'ally/version',
], function(registerSuite, expect, TestWorker, version) {

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
          expect(_module).to.equal(version);
        });
      },
    };

    return suite;
  });
});
