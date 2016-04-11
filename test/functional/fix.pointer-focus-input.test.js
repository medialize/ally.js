define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  require('../helper/leadfoot-commands');

  bdd.describe('fix/pointer-focus-input', function() {
    var timeout = 120000;

    function makeFocusClickTest(prefix, hasTarget) {
      return function() {
        var test = this;
        this.timeout = timeout;
        return this.remote
          // make sure we're failing without the fix
          .focusById(prefix + 'fail-source')
          .withActiveElement(function(activeElementId) {
            var expected = hasTarget ? (prefix + 'fail-target') : (prefix + 'fail-source');
            if (activeElementId === expected) {
              test.skip('Element focused naturally');
            }
          })

          // I have no clue why, but IE11 needs this for
          // the next click to actually focus something.
          .focusBody()

          // make sure we're not failing with the fix
          .focusById(prefix + 'fixed-source')
          .expectActiveElement(hasTarget ? (prefix + 'fixed-target') : (prefix + 'fixed-source'), 'confirming fix');
      };
    }

    bdd.before(function() {
      function isIrrelevantBrowser(platform) {
        // This fix is only relevant to Safari and Firefox on OSX
        return !(platform.is.OSX && (platform.is.GECKO || platform.is.WEBKIT));
      }

      return this.remote
        .setTimeouts(timeout)
        .get(require.toUrl('test/pages/fix.pointer-focus-input.test.html'))
        .skipPlatform(this, isIrrelevantBrowser, 'irrelevant to current browser');
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
          .focusById('impotent-label')
          .expectActiveElement('BODY', 'initial position');
      });
    });
  });
});
