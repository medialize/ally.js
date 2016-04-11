define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var pollUntil = require('intern/dojo/node!leadfoot/helpers/pollUntil');

  bdd.describe('fix/pointer-focus-input', function() {
    var timeout = 120000;

    function makeFocusClickTest(prefix, hasTarget) {
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

    bdd.before(function() {
      return this.remote
        .get(require.toUrl('test/pages/fix.pointer-focus-input.test.html'))
        .setPageLoadTimeout(timeout)
        .setFindTimeout(timeout)
        .setExecuteAsyncTimeout(timeout)
        // This fix is only relevant to Safari and Firefox on OSX
        .then(pollUntil('return window.platform'))
        .then(function(platform) {
          if (!platform.is.OSX || !platform.is.GECKO && !platform.is.WEBKIT) {
            this.skip('irrelevant to current browser');
          }
        }.bind(this));
    });

    bdd.describe('for <button> elements', function() {
      bdd.it('should handle direct click', makeFocusClickTest('button-', false));
      bdd.it('should handle click on nested element', makeFocusClickTest('nested-button-', true));
    });

    bdd.describe('for <input type="checkbox"> elements', function() {
      bdd.it('should handle direct click', makeFocusClickTest('checkbox-', false));
      bdd.it('should handle click on associated <label>', makeFocusClickTest('labeled-checkbox-', true));
      bdd.it('should handle clock on nested element of associated <label>', makeFocusClickTest('nested-labeled-checkbox-', true));
    });

    bdd.describe('for <input> elements', function() {
      bdd.it('should handle type="button"', makeFocusClickTest('input-button-', false));
      bdd.it('should handle type="range"', makeFocusClickTest('slider-', false));
      bdd.it('should handle type="radio"', makeFocusClickTest('radio-', false));
    });

    bdd.describe('for <label> elements', function() {
      bdd.it('should handle <label> without input', function() {
        this.timeout = timeout;
        return this.remote
          // make sure we're failing without the fix
          .findById('impotent-label')
            .click()
            .end()
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            var _activeElementId = activeElementId.toLowerCase();
            expect(_activeElementId).to.equal('body');
          });
      });
    });
  });
});
