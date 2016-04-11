define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var keys = require('intern/dojo/node!leadfoot/keys');
  var pollUntil = require('intern/dojo/node!leadfoot/helpers/pollUntil');
  require('../helper/leadfoot-commands');

  bdd.describe('maintain/tab-focus', function() {
    var timeout = 120000;

    bdd.before(function() {
      return this.remote
        .skipUnlessCapability(this, 'shiftFocusOnTab', 'Cannot test Tab focus via WebDriver in this browser')
        .setTimeouts(timeout)

        .get(require.toUrl('test/pages/maintain.tab-focus.test.html'))
        // wait until we're really initialized
        .then(pollUntil('return window.platform'));
    });

    bdd.it('should wrap tab to next element', function() {
      this.timeout = timeout;
      return this.remote
        .focusById('first')
        .expectActiveElement('first', 'initial position')

        .pressKeys(keys.TAB)
        .expectActiveElement('second', 'after first Tab')

        .pressKeys(keys.TAB)
        .expectActiveElement('third', 'after second Tab')

        .pressKeys(keys.TAB)
        .expectActiveElement('first', 'after third Tab');
    });

    bdd.it('should wrap shift-tab to previous element', function() {
      this.timeout = timeout;
      return this.remote
        .skipUnlessCapability(this, 'shiftModifierKey', 'Cannot test Shift Tab focus via WebDriver in this browser')

        .focusById('third')
        .expectActiveElement('third', 'initial position')

        .pressKeys([keys.SHIFT, keys.TAB])
        .pressKeys(keys.NULL)
        .expectActiveElement('second', 'after first Tab')

        .pressKeys([keys.SHIFT, keys.TAB])
        .pressKeys(keys.NULL)
        .expectActiveElement('first', 'after second Tab')

        .pressKeys([keys.SHIFT, keys.TAB])
        .pressKeys(keys.NULL)
        .expectActiveElement('third', 'after third Tab');
    });

    bdd.it('should shift focus back into tabsequence', function() {
      this.timeout = timeout;
      return this.remote
        .focusById('before')
        .expectActiveElement('before', 'initial position')

        .pressKeys(keys.TAB)
        .expectActiveElement('first', 'after first Tab');
    });
  });
});
