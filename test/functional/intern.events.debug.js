define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var keys = require('intern/dojo/node!leadfoot/keys');
  require('../helper/leadfoot-commands');

  // This is a test of Intern/WebDriver capability regarding events dispatched
  // when simulating user actions, triggered by the following leadfoot issue
  // https://github.com/theintern/leadfoot/issues/17#issuecomment-61653817

  /*
    Chrome 47.0.2526.111 (local)
      click input [
        mousedown:first,
        focus:first,
        focusin:first,
        DOMFocusIn:first,
        mouseup:first,
        click:first,
      ]
      press+release input [
        mousedown: first,
        focus: first,
        focusin: first,
        DOMFocusIn: first,
        mouseup: first,
        click: first,
      ]
      pressKeys(TAB) input [
        keydown:first,
        blur:first,
        focusout:first,
        DOMFocusOut:first,
        focus:second,
        focusin:second,
        DOMFocusIn:second,
        keyup:second,
      ]
      pressKeys(SHIFT TAB) input [
        keydown:second,
        keydown:second,
        blur:second,
        focusout:second,
        DOMFocusOut:second,
        focus:first,
        focusin:first,
        DOMFocusIn:first,
        keyup:first,
        keyup:first,
      ]
      pressKeys(TAB) [
        keydown:first:9,
        blur:first,
        focusout:first,
        DOMFocusOut:first,
        focus:second,
        focusin:second,
        DOMFocusIn:second,
        keyup:second:9,
      ]
      pressKeys(SHIFT TAB) [
        keydown:second:16:shift,
        keydown:second:9:shift,
        blur:second,
        focusout:second,
        DOMFocusOut:second,
        focus:first,
        focusin:first,
        DOMFocusIn:first,
        keyup:first:9:shift,
        keyup:first:16,
      ]

    IE 11.0 (SauceLabs)
      click input [
        focusin:BODY,
        focus:BODY,
        mousedown:first,
        focusout:BODY,
        focusin:first,
        blur:BODY,
        focus:first,
        mouseup:first,
        click:first,
      ]
      press+release input [
        focusin:BODY,
        focus:BODY,
        mousedown:first,
        focusout:BODY,
        focusin:first,
        blur:BODY,
        focus:first,
        mouseup:first,
        click:first,
      ]
      pressKeys(TAB) input [
        keydown:first,
        focusout:first,
        focusin:second,
        blur:first,
        focus:second,
        keyup:second,
      ]
      pressKeys(SHIFT TAB) input [
        keydown:second,
        keydown:second,
        focusout:second,
        focusin:first,
        blur:second,
        focus:first,
        keyup:first,
        keyup:first,
      ]
      pressKeys(TAB) [
        keydown:first:9,
        focusout:first,
        focusin:second,
        blur:first,
        focus:second,
        keyup:second:9,
      ]
      // NOTE: event.shiftKey is not set
      pressKeys(SHIFT TAB) (
        keydown:second:16,
        keydown:second:9,
        focusout:second,
        focusin:first,
        blur:second,
        focus:first,
        keyup:first:9,
        keyup:first:16,
      ]
  */

  bdd.describe('intern/events', function() {
    var timeout = 120000;

    function skipLoggingEvents(events) {
      this.skip(events.join(', '));
    }

    var focusBody = 'document.activeElement && document.activeElement.blur() || document.body.focus()';
    var resetAndReturnEvents = 'var _events = window.events.slice(0); window.events.length = 0; return _events;';
    var resetEvents = 'window.events.length = 0; return null;';

    bdd.before(function() {
      return this.remote
        .setTimeouts(timeout)
        .get(require.toUrl('test/pages/intern.events.test.html'));
    });

    bdd.beforeEach(function() {
      return this.remote
        .execute(focusBody)
        .execute(resetEvents);
    });

    bdd.it('should print the current platform (using skipped test message)', function() {
      var test = this;
      return this.remote
        .execute('return window.platform')
        .then(function(platform) {
          test.skip(platform.name + ' ' + platform.version);
        });
    });

    bdd.describe('for Mouse Events', function() {
      bdd.it('should print events for click', function() {
        this.timeout = timeout;
        return this.remote
          .findById('first')
            .click()
            .end()

          .execute(resetAndReturnEvents)
          .then(skipLoggingEvents.bind(this));
      });

      bdd.it('should print events for mousedown and mouseup', function() {
        this.timeout = timeout;
        return this.remote
          .findById('first')
            .pressMouseButton(0)
            .sleep(10)
            .releaseMouseButton(0)
            .end()

          .execute(resetAndReturnEvents)
          .then(skipLoggingEvents.bind(this));
      });
    });

    bdd.describe('for Keyboard Events', function() {
      bdd.it('should print events for pressing TAB', function() {
        this.timeout = timeout;
        return this.remote
          .findById('first')
            .click()
            .end()

          .execute(resetEvents)

          .findById('first')
            .pressKeys(keys.TAB)
            .end()

          .execute(resetAndReturnEvents)
          .then(skipLoggingEvents.bind(this));
      });

      bdd.it('should print events for pressing SHIFT TAB', function() {
        this.timeout = timeout;
        return this.remote
          .findById('second')
            .click()
            .end()

          .execute(resetEvents)

          .findById('first')
            .pressKeys([keys.SHIFT, keys.TAB])
            .pressKeys(keys.NULL)
            .end()

          .execute(resetAndReturnEvents)
          .then(skipLoggingEvents.bind(this));
      });
    });
  });
});
