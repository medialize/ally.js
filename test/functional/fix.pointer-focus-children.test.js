define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var pollUntil = require('intern/dojo/node!leadfoot/helpers/pollUntil');

  bdd.describe('fix/pointer-focus-children', function() {
    var timeout = 120000;

    function makeFocusClickTest(prefix, fails) {
      return function() {
        this.timeout = timeout;
        return this.remote
          // make sure we're failing without the fix
          .findById(prefix + 'fail-source')
            .click()
            .end()
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal(fails ? (prefix + 'fail-source') : (prefix + 'fail-target'));
          })

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
            expect(activeElementId).to.equal(prefix + 'fixed-target');
          });
      };
    }

    bdd.before(function() {
      return this.remote
        .get(require.toUrl('test/pages/fix.pointer-focus-children.test.html'))
        .setPageLoadTimeout(timeout)
        .setFindTimeout(timeout)
        .setExecuteAsyncTimeout(timeout)
        // This fix is only relevant to IE10 (Trident/6) and IE11 (Trident/7)
        .then(pollUntil('return window.platform'))
        .then(function(platform) {
          if (!platform.is.IE10 && !platform.is.IE11) {
            this.skip('irrelevant to current browser');
          }
        }.bind(this));
    });

    bdd.describe('for all elements', function() {
      bdd.it('should ignore non-flexbox elements', makeFocusClickTest('normal-', false));
      bdd.it('should handle child of focusable flexbox container', makeFocusClickTest('child-', true));
      bdd.it('should handle child of inert flexbox container', makeFocusClickTest('nested-', true));
    });

    bdd.describe('for label elements', function() {
      bdd.it('should ignore non-flexbox labels', makeFocusClickTest('redirect-', false));
      bdd.it('should handle child of flexboxed label', makeFocusClickTest('redirect-flexed-', false));
    });

    bdd.it('should ignore regularly focusable elements', function() {
      this.timeout = timeout;
      return this.remote

        // I have no clue why, but IE11 needs this for
        // the next click to actually focus something.
        .findByCssSelector('body')
          .click()
          .end()
        .sleep(500)

        // make sure we're not failing with the fix
        .findById('natural-fixed-source')
          .click()
          .end()
        .sleep(500)
        .execute('return document.activeElement.id || document.activeElement.nodeName')
        .then(function(activeElementId) {
          expect(activeElementId).to.equal('natural-fixed-source');
        });
    });
  });
});
