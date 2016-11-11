define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  require('../helper/leadfoot-commands');

  bdd.describe('maintain/tab-focus', function() {
    var timeout = 120000;

    bdd.before(function() {
      return this.remote
        .skipUnlessCapability(this, 'shiftFocusOnTab', 'Cannot test Tab focus via WebDriver in this browser')
        .setTimeouts(timeout)

        .get(require.toUrl('test/pages/maintain.tab-focus.test.html'))

        // see https://gist.github.com/rodneyrehm/23df2ae750ca5bac96f7ad93ffcf69bd
        .skipPlatform(this, function(platform) {
          return platform.is.IE10;
        }, 'This Test will not run on BrowserStack in IE10')
    });

    bdd.it('should wrap tab to next element', function() {
      this.timeout = timeout;
      return this.remote
        .focusById('first')
        .expectActiveElement('first', 'initial position')

        .focusForward()
        .expectActiveElement('second', 'after first Tab')

        .focusForward()
        .expectActiveElement('third', 'after second Tab')

        .focusForward()
        .expectActiveElement('first', 'after third Tab');
    });

    bdd.it('should wrap shift-tab to previous element', function() {
      this.timeout = timeout;
      return this.remote
        .skipUnlessCapability(this, 'shiftModifierKey', 'Cannot test Shift Tab focus via WebDriver in this browser')

        .focusById('third')
        .expectActiveElement('third', 'initial position')

        .focusBackward()
        .expectActiveElement('second', 'after first Tab')

        .focusBackward()
        .expectActiveElement('first', 'after second Tab')

        .focusBackward()
        .expectActiveElement('third', 'after third Tab');
    });

    bdd.it('should shift focus back into tabsequence', function() {
      this.timeout = timeout;
      return this.remote
        .focusById('before')
        .expectActiveElement('before', 'initial position')

        .focusForward()
        .expectActiveElement('first', 'after first Tab');
    });
  });
});
