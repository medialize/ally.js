define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  require('../helper/leadfoot-commands');

  bdd.describe('fix/pointer-focus-children', function() {
    var timeout = 120000;

    function makeFocusClickTest(prefix, fails) {
      return function() {
        this.timeout = timeout;
        return this.remote
          // make sure we're failing without the fix
          .focusById(prefix + 'fail-source')
          .expectActiveElement(fails ? (prefix + 'fail-source') : (prefix + 'fail-target'), 'confirming browser behavior')

          // I have no clue why, but IE11 needs this for
          // the next click to actually focus something.
          .focusBody()

          // make sure we're not failing with the fix
          .focusById(prefix + 'fixed-source')
          .expectActiveElement(prefix + 'fixed-target', 'confirming fix');
      };
    }

    bdd.before(function() {
      function isIrrelevantBrowser(platform) {
        // This fix is only relevant to IE10 (Trident/6) and IE11 (Trident/7)
        return !(platform.is.IE10 || platform.is.IE11);
      }

      return this.remote
        .setTimeouts(timeout)
        .get(require.toUrl('test/pages/fix.pointer-focus-children.test.html'))
        .skipPlatform(this, isIrrelevantBrowser, 'irrelevant to current browser');
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
        .focusBody()
        .focusById('natural-fixed-source')
        .expectActiveElement('natural-fixed-source', 'initial position');
    });
  });
});
