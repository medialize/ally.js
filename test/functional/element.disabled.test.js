define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var keys = require('intern/dojo/node!leadfoot/keys');
  var pollUntil = require('intern/dojo/node!leadfoot/helpers/pollUntil');

  registerSuite(function() {
    var timeout = 120000;

    return {
      name: 'element/disabled',

      before: function() {
        return this.remote
          .get(require.toUrl('test/pages/intern.events.test.html'))
          .findById('first')
            .click()
            .end()
          .pressKeys(keys.TAB)
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            if (activeElementId !== 'second') {
              this.skip('Cannot test Tab focus via WebDriver in this browser');
            }
          }.bind(this))

          .get(require.toUrl('test/pages/element.disabled.test.html'))
          .setPageLoadTimeout(timeout)
          .setFindTimeout(timeout)
          .setExecuteAsyncTimeout(timeout)
          // wait until we're really initialized
          .then(pollUntil('return window.platform'));
      },

      'skips disabled elements': function() {
        this.timeout = timeout;

        return this.remote
          .findById('before')
            .click()
            .end()
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('before', 'initial position');
          })

          .pressKeys(keys.TAB)
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('after', 'after first Tab');
          });
      },

    };
  });
});
