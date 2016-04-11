define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var keys = require('intern/dojo/node!leadfoot/keys');

  // This is a test of Intern/WebDriver capability regarding events dispatched
  // when simulating user actions, triggered by the following leadfoot issue
  // https://github.com/theintern/leadfoot/issues/17#issuecomment-61653817

  registerSuite(function() {
    var timeout = 120000;

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

    return {
      name: 'intern/events',

      before: function() {
        return this.remote
          .get(require.toUrl('test/pages/intern.events.test.html'))
          .setPageLoadTimeout(timeout)
          .setFindTimeout(timeout)
          .setExecuteAsyncTimeout(timeout);
      },

      platform: function() {
        this.timeout = timeout;
        return this.remote
          .execute('return window.platform')
          .then(function(platform) {
            this.skip(platform.name + ' ' + platform.version);
          }.bind(this));
      },

      'click input': function() {
        this.timeout = timeout;
        return this.remote
          .findById('first')
            .click()
            .end()
          .sleep(500)
          .execute('var _events = window.events.slice(0); window.events.length = 0; return _events;')
          .then(function(events) {
            this.skip(events.join(', '));
          }.bind(this));
      },

      'press+release input': function() {
        this.timeout = timeout;
        return this.remote
          .findById('first')
            .pressMouseButton(0)
            .sleep(10)
            .releaseMouseButton(0)
            .end()
          .sleep(500)
          .execute('var _events = window.events.slice(0); window.events.length = 0; return _events;')
          .then(function(events) {
            this.skip(events.join(', '));
          }.bind(this));
      },

      'pressKeys(TAB) input': function() {
        this.timeout = timeout;
        return this.remote
          .findById('first')
            .click()
            .end()

          .sleep(500)
          .execute('window.events.length = 0; return null;')

          .findById('first')
            .pressKeys(keys.TAB)
            .end()

          .execute('var _events = window.events.slice(0); window.events.length = 0; return _events;')
          .then(function(events) {
            this.skip(events.join(', '));
          }.bind(this));
      },

      'pressKeys(SHIFT TAB) input': function() {
        this.timeout = timeout;
        return this.remote
          .findById('second')
            .click()
            .end()

          .sleep(500)
          .execute('window.events.length = 0; return null;')

          .findById('first')
            .pressKeys([keys.SHIFT, keys.TAB])
            .pressKeys(keys.NULL)
            .end()

          .execute('var _events = window.events.slice(0); window.events.length = 0; return _events;')
          .then(function(events) {
            this.skip(events.join(', '));
          }.bind(this));
      },

      'pressKeys(TAB)': function() {
        this.timeout = timeout;
        return this.remote
          .findById('first')
            .click()
            .end()

          .sleep(500)
          .execute('window.events.length = 0; return null;')

          .pressKeys(keys.TAB)

          .execute('var _events = window.events.slice(0); window.events.length = 0; return _events;')
          .then(function(events) {
            this.skip(events.join(', '));
          }.bind(this));
      },

      'pressKeys(SHIFT TAB)': function() {
        this.timeout = timeout;
        return this.remote
          .findById('second')
            .click()
            .end()

          .sleep(500)
          .execute('window.events.length = 0; return null;')

          .pressKeys([keys.SHIFT, keys.TAB])
          .pressKeys(keys.NULL)

          .execute('var _events = window.events.slice(0); window.events.length = 0; return _events;')
          .then(function(events) {
            this.skip(events.join(', '));
          }.bind(this));
      },

    };
  });
});
