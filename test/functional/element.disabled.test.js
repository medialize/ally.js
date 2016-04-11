define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var keys = require('intern/dojo/node!leadfoot/keys');
  require('../helper/leadfoot-commands');

  bdd.describe('element/disabled', function() {
    var timeout = 120000;

    bdd.before(function() {
      return this.remote
        .skipUnlessCapability(this, 'shiftFocusOnTab', 'Cannot test Tab focus via WebDriver in this browser')
        .setTimeouts(timeout)

        .get(require.toUrl('test/pages/element.disabled.test.html'))

        .skipPlatform(this, function(platform) {
          return platform.is.IE10;
        }, 'This Test will not run on BrowserStack in IE10');
    });

    bdd.it('should skip disabled elements', function() {
      this.timeout = timeout;

      return this.remote
        .focusById('before')
        .expectActiveElement('before', 'initial position')

        .pressKeys(keys.TAB)
        .expectActiveElement('after', 'after first Tab');
    });
  });
});
