define([
  'intern!object',
  'intern/chai!expect',
  '../helper/test-worker',
], function(registerSuite, expect, TestWorker) {

  registerSuite(function() {
    var worker;

    var modules = [
      'ally.js/element/disabled',
      'ally.js/event/active-element',
      'ally.js/event/shadow-focus',
      'ally.js/fix/pointer-focus-children',
      'ally.js/fix/pointer-focus-input',
      'ally.js/fix/pointer-focus-parent',
      'ally.js/get/active-elements',
      'ally.js/get/focus-redirect-target',
      'ally.js/get/focus-target',
      'ally.js/get/insignificant-branches',
      'ally.js/get/parents',
      'ally.js/get/shadow-host-parents',
      'ally.js/get/shadow-host',
      'ally.js/is/disabled',
      'ally.js/is/active-element',
      'ally.js/is/focus-relevant',
      'ally.js/is/focusable',
      'ally.js/is/native-disabled-supported',
      'ally.js/is/only-tabbable',
      'ally.js/is/shadowed',
      'ally.js/is/tabbable',
      'ally.js/is/valid-area',
      'ally.js/is/valid-tabindex',
      'ally.js/is/visible',
      'ally.js/maintain/disabled',
      'ally.js/maintain/hidden',
      'ally.js/observe/interaction-type',
      'ally.js/prototype/element.prototype.matches',
      'ally.js/prototype/svgelement.prototype.focus',
      'ally.js/prototype/window.customevent',
      'ally.js/query/first-tabbable',
      'ally.js/query/focusable',
      'ally.js/query/tabbable',
      'ally.js/query/tabsequence.sort-area',
      'ally.js/query/tabsequence.sort-tabindex',
      'ally.js/query/tabsequence',
      'ally.js/style/focus-within',
      'ally.js/style/focus-source',
      'ally.js/util/context-to-element',
      'ally.js/util/decorate-context',
      'ally.js/util/decorate-service',
      'ally.js/util/merge-dom-order',
      'ally.js/util/node-array',
      'ally.js/util/tabindex-value',
      'ally.js/util/visible-area',
      'ally.js/when/focusable',
      'ally.js/when/key',
      'ally.js/when/visible-area',
      'ally.js/version',
      'ally.js/ally',
    ];

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
