define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  require('../helper/leadfoot-commands');

  bdd.describe('element/disabled', function() {
    var timeout = 120000;

    bdd.before(function() {
      return this.remote
        .skipUnlessCapability(this, 'shiftFocusOnTab', 'Cannot test Tab focus via WebDriver in this browser')
        .setTimeouts(timeout)

        .get(require.toUrl('test/pages/element.disabled.test.html'))

        // see https://gist.github.com/rodneyrehm/23df2ae750ca5bac96f7ad93ffcf69bd
        .skipPlatform(this, function(platform) {
          return platform.is.IE10;
        }, 'This Test will not run on BrowserStack in IE10')

        .execute('window.disableElements();');
    });

    bdd.it('should skip disabled elements', function() {
      this.timeout = timeout;

      return this.remote
        .focusById('before')
        .expectActiveElement('before', 'initial position')

        .focusForward()
        .expectActiveElement('after', 'after first Tab');
    });
  });
});
