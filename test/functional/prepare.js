define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var keys = require('intern/dojo/node!leadfoot/keys');
  var pollUntil = require('intern/dojo/node!leadfoot/helpers/pollUntil');

  bdd.describe('browser capabilites', function() {
    var timeout = this.timeout = 120000;

    bdd.before(function() {
      return this.remote
        .get(require.toUrl('test/pages/intern.events.test.html'))
        .setPageLoadTimeout(timeout)
        .setFindTimeout(timeout)
        .setExecuteAsyncTimeout(timeout)
        // wait until we're really initialized
        .then(pollUntil('return window._platform'));
    });

    bdd.it('should understand "shiftFocusOnTab"', function() {
      return this.remote
        .focusById('first')
        .pressKeys(keys.TAB)
        .withActiveElement(function(activeElementId) {
          this.session.capabilities.shiftFocusOnTab = activeElementId === 'second';
        });
    });

    bdd.it('should understand "shiftFocusOnShiftTab"', function() {
      return this.remote
        .focusById('second')
        .pressKeys([keys.SHIFT, keys.TAB])
        .pressKeys(keys.NULL)
        .withActiveElement(function(activeElementId) {
          this.session.capabilities.shiftFocusOnShiftTab = activeElementId === 'first';
        });
    });

    bdd.it('should understand "shiftFocusOnTabToLink"', function() {
      return this.remote
        .focusById('second')
        .pressKeys(keys.TAB)
        .withActiveElement(function(activeElementId) {
          this.session.capabilities.shiftFocusOnTabToLink = activeElementId === 'third';
        });
    });

    bdd.it('should understand "shiftFocusOnAltTabToLink"', function() {
      return this.remote
        .skipPlatform(this, function(platform) {
          return !(platform.is.WEBKIT && platform.is.OSX);
        }, 'ALT+TAB is a matter of Safari on OSX')

        .focusById('second')
        .pressKeys([keys.ALT, keys.TAB])
        .pressKeys(keys.NULL)
        .withActiveElement(function(activeElementId) {
          this.session.capabilities.shiftFocusOnAltTabToLink = activeElementId === 'third';
        });
    });

    bdd.it('should understand "shiftModifierKey"', function() {
      return this.remote
        .execute('window.events.length = 0')
        .pressKeys([keys.SHIFT, keys.TAB])
        .pressKeys(keys.NULL)
        .execute('return window.events[1]')
        .then(function(tabKeyEvent) {
          this.session.capabilities.shiftModifierKey = tabKeyEvent.indexOf(':shift') > -1;
        });
    });

  });
});
