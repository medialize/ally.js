define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  require('../helper/leadfoot-commands');

  // NOTE: The SafariDriver does *not* behave like Safari in regards to
  // how mouse events are processed. While Safari, when used directly,
  // exhibits bug https://bugs.webkit.org/show_bug.cgi?id=139945,
  // Safari when used via WebDriver (and thus SafariDriver), does NOT.
  // Chrome 27 is the last of the WebKit based versions and exhibits
  // the same bug. However, BrowserStack's Chrome 27 won't run our Intern suite.
  // This means we cannot test fix/pointer-focus-parent.js in a way that
  // actually proves the script does something the browser would otherwise not.

  bdd.describe('fix/pointer-focus-parent', function() {
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
        // This fix is only relevant to WebKit
        return !platform.is.WEBKIT;
      }

      return this.remote
        .setTimeouts(timeout)
        .get(require.toUrl('test/pages/fix.pointer-focus-parent.test.html'))
        .skipPlatform(this, isIrrelevantBrowser, 'irrelevant to current browser');
    });

    bdd.it('should handle links nested in focusable containers', makeFocusClickTest('link-', false));
  });
});
