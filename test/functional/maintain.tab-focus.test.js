define([
  'intern!object',
  'intern/chai!expect',
  'require',
  // https://theintern.github.io/leadfoot/keys.html
  'intern/dojo/node!leadfoot/keys',
  // https://theintern.github.io/leadfoot/pollUntil.html
  'intern/dojo/node!leadfoot/helpers/pollUntil',
], function(registerSuite, expect, require, keys, pollUntil) {

  registerSuite(function() {
    var timeout = 120000;
    var advancesFocusOnTab = false;
    var setsShiftKey = false;

    return {
      name: 'maintain/tab-focus',

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
            advancesFocusOnTab = activeElementId === 'second';
          })

          .execute('window.events.length = 0')
          .pressKeys([keys.TAB, keys.TAB])
          .sleep(500)
          .execute('return window.events[1]')
          .then(function(tabKeyEvent) {
            setsShiftKey = tabKeyEvent.indexOf(':shift') > -1;
          })

          .get(require.toUrl('test/pages/maintain.tab-focus.test.html'))
          .setPageLoadTimeout(timeout)
          .setFindTimeout(timeout)
          .setExecuteAsyncTimeout(timeout)
          // wait until we're really initialized
          .then(pollUntil('return window.platform'));
      },

      forward: function() {
        this.timeout = timeout;
        if (!advancesFocusOnTab) {
          this.skip('Cannot test Tab focus via WebDriver in this browser');
        }

        return this.remote
          .findById('first')
            .click()
            .end()
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('first', 'initial position');
          })

          .pressKeys(keys.TAB)
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('second', 'after first Tab');
          })

          .pressKeys(keys.TAB)
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('third', 'after second Tab');
          })

          .pressKeys(keys.TAB)
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('first', 'after third Tab');
          });
      },
      backward: function() {
        this.timeout = timeout;
        if (!advancesFocusOnTab) {
          this.skip('Cannot test Tab focus via WebDriver in this browser');
        }
        if (!setsShiftKey) {
          this.skip('Cannot test Shift Tab focus via WebDriver in this browser');
        }

        return this.remote
          .findById('third')
            .click()
            .end()
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('third', 'initial position');
          })

          .pressKeys([keys.SHIFT, keys.TAB])
          .pressKeys(keys.NULL)
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('second', 'after first Tab');
          })

          .pressKeys([keys.SHIFT, keys.TAB])
          .pressKeys(keys.NULL)
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('first', 'after second Tab');
          })

          .pressKeys([keys.SHIFT, keys.TAB])
          .pressKeys(keys.NULL)
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('third', 'after third Tab');
          });
      },
      'out of tabsequence': function() {
        this.timeout = timeout;
        if (!advancesFocusOnTab) {
          this.skip('Cannot test Tab focus via WebDriver in this browser');
        }

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
            expect(activeElementId).to.equal('first', 'after first Tab');
          });
      },

    };
  });
});
