define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var keys = require('intern/dojo/node!leadfoot/keys');
  var pollUntil = require('intern/dojo/node!leadfoot/helpers/pollUntil');
  var makeCustomCommand = require('../helper/leadfoot-commands');

  var FocusWithinCommand = makeCustomCommand({
    expectHierarchy: function(expected, message) {
      return this.parent
        .execute(
          'return [].map.call(document.querySelectorAll(".ally-focus-within"), '
          + 'function(e) { return e.id || e.nodeName.toUpperCase(); })'
        )
        .then(function(elements) {
          expect(elements).to.deep.equal(expected, message);
        });
    },
  });

  bdd.describe('style/focus-within', function() {
    var timeout = 120000;

    // Since we cannot .focus() SVG content in Firefox and Internet Explorer,
    // we need to run this unit test as a functional test, so we can emit
    // proper TAB key to make the browser shift focus to the SVG element

    bdd.before(function() {
      return this.remote
        .skipUnlessCapability(this, 'shiftFocusOnTab', 'Cannot test Tab focus via WebDriver in this browser')
        .skipUnlessCapability(this, 'shiftFocusOnTabToLink', 'Cannot test Tab to link via WebDriver in this browser')
        .setTimeouts(timeout)

        .get(require.toUrl('test/pages/style.focus-within.test.html'))
        // wait until we're really initialized
        .then(pollUntil('return window.platform'));
    });

    bdd.it('should follow into inline SVG', function() {
      this.timeout = timeout;
      return this.remote
        .useCommand(FocusWithinCommand)

        .focusById('before')
        .expectActiveElement('before', 'initial position')
        .expectHierarchy(['HTML', 'BODY', 'before'], '.ally-focus-within initial')

        .pressKeys(keys.TAB)
        .expectActiveElement('svg-link', 'activeElement after first Tab')
        .expectHierarchy(['HTML', 'BODY', 'container', 'svg', 'svg-link'], '.ally-focus-within after first Tab')

        .pressKeys(keys.TAB)
        .expectActiveElement('after', 'activeElement after second Tab')
        .expectHierarchy(['HTML', 'BODY', 'container', 'after'], '.ally-focus-within after second Tab');
    });
  });
});
