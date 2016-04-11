define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var keys = require('intern/dojo/node!leadfoot/keys');
  var pollUntil = require('intern/dojo/node!leadfoot/helpers/pollUntil');

  registerSuite(function() {
    var timeout = 120000;

    // Since we cannot .focus() SVG content in Firefox and Internet Explorer,
    // we need to run this unit test as a functional test, so we can emit
    // proper TAB key to make the browser shift focus to the SVG element

    return {
      name: 'style/focus-within',

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

          .findById('second')
            .click()
            .end()
          .pressKeys(keys.TAB)
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            if (activeElementId !== 'third') {
              this.skip('Cannot test Tab to link focus via WebDriver in this browser');
            }
          }.bind(this))

          .get(require.toUrl('test/pages/style.focus-within.test.html'))
          .setPageLoadTimeout(timeout)
          .setFindTimeout(timeout)
          .setExecuteAsyncTimeout(timeout)
          // wait until we're really initialized
          .then(pollUntil('return window.platform'));
      },

      'follow focus into SVG': function() {
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
          .execute('return [].map.call(document.querySelectorAll(".ally-focus-within"), function(e) { return e.id || e.nodeName })')
          .then(function(elements) {
            var expected = ['HTML', 'BODY', 'before'];
            expect(elements).to.deep.equal(expected, '.ally-focus-within after first Tab');
          })

          .pressKeys(keys.TAB)
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('svg-link', 'activeElement after first Tab');
          })
          .execute('return [].map.call(document.querySelectorAll(".ally-focus-within"), function(e) { return e.id || e.nodeName })')
          .then(function(elements) {
            var expected = ['HTML', 'BODY', 'container', 'svg', 'svg-link'];
            expect(elements).to.deep.equal(expected, '.ally-focus-within after first Tab');
          })

          .pressKeys(keys.TAB)
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('after', 'after second Tab');
          })
          .execute('return [].map.call(document.querySelectorAll(".ally-focus-within"), function(e) { return e.id || e.nodeName })')
          .then(function(elements) {
            var expected = ['HTML', 'BODY', 'container', 'after'];
            expect(elements).to.deep.equal(expected, '.ally-focus-within after second Tab');
          });
      },
    };
  });
});
