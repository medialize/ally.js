define([
  'intern!object',
  'intern/chai!expect',
  'require',
  'intern/dojo/node!leadfoot/helpers/pollUntil',
], function(registerSuite, expect, require, pollUntil) {

  registerSuite(function() {
    var timeout = 120000;

    function makeFocusClickTest(prefix, hasTarget) {
      return function() {
        this.timeout = timeout;
        return this.remote

          // This fix is only relevant to WebKit
          .then(pollUntil('return window.platform'))
          .then(function(platform) {
            if (!platform.is.WEBKIT) {
              this.skip('irrelevant to current browser');
            }
          }.bind(this))

          // make sure we're failing without the fix
          .findById(prefix + 'fail-source')
            .click()
            .end()
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            var expected = hasTarget ? (prefix + 'fail-target') : (prefix + 'fail-source');
            if (activeElementId === expected) {
              this.skip('Element focused naturally');
            }
          }.bind(this))

          // I have no clue why, but IE11 needs this for
          // the next click to actually focus something.
          .findByCssSelector('body')
            .click()
            .end()
          .sleep(500)

          // make sure we're not failing with the fix
          .findById(prefix + 'fixed-source')
            .click()
            .end()
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            var expected = hasTarget ? (prefix + 'fixed-target') : (prefix + 'fixed-source');
            expect(activeElementId).to.equal(expected);
          });
      };
    }

    return {
      name: 'fix/pointer-focus-parent',

      before: function() {
        return this.remote
          .get(require.toUrl('test/pages/fix.pointer-focus-parent.test.html'))
          .setPageLoadTimeout(timeout)
          .setFindTimeout(timeout)
          .setExecuteAsyncTimeout(timeout);
      },

      // '<button>': makeFocusClickTest('button-', false),
      // '<button><span>': makeFocusClickTest('nested-button-', true),
      '<a href="">': makeFocusClickTest('link-', false),
      // '<span tabindex="-1">': makeFocusClickTest('focusable-', false),
    };
  });
});
