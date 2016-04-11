define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var pollUntil = require('intern/dojo/node!leadfoot/helpers/pollUntil');

  registerSuite(function() {
    var timeout = 120000;

    function makeFocusClickTest(prefix, fails) {
      return function() {
        this.timeout = timeout;
        return this.remote
          // make sure we're failing without the fix
          .findById(prefix + 'fail-source')
            .click()
            .end()
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal(fails ? (prefix + 'fail-source') : (prefix + 'fail-target'));
          })

          // I have no clue why, but IE11 needs this for
          // the next click to actually focus something.
          .findByCssSelector('body')
            .click()
            .end()
          .sleep(500)

          // make sure we're not failing with the fix
          .findById(prefix + 'fixed-source')
            .click()
            .end()
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal(prefix + 'fixed-target');
          });
      };
    }

    return {
      name: 'fix/pointer-focus-children',

      before: function() {
        return this.remote
          .get(require.toUrl('test/pages/fix.pointer-focus-children.test.html'))
          .setPageLoadTimeout(timeout)
          .setFindTimeout(timeout)
          .setExecuteAsyncTimeout(timeout)
          // This fix is only relevant to IE10 (Trident/6) and IE11 (Trident/7)
          .then(pollUntil('return window.platform'))
          .then(function(platform) {
            if (!platform.is.IE10 && !platform.is.IE11) {
              this.skip('irrelevant to current browser');
            }
          }.bind(this));
      },

      'div[tabindex="-1"] > span': makeFocusClickTest('normal-', false),
      'div[tabindex="-1"]{flexbox} > span': makeFocusClickTest('child-', true),
      'div[tabindex="-1"] > div{flexbox} > span': makeFocusClickTest('nested-', true),
      'input + label': makeFocusClickTest('redirect-', false),
      'input + label{flexbox} > span': makeFocusClickTest('redirect-flexed-', false),

      'div[tabindex="-1"]': function() {
        this.timeout = timeout;
        return this.remote

          // I have no clue why, but IE11 needs this for
          // the next click to actually focus something.
          .findByCssSelector('body')
            .click()
            .end()
          .sleep(500)

          // make sure we're not failing with the fix
          .findById('natural-fixed-source')
            .click()
            .end()
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('natural-fixed-source');
          });
      },
    };
  });
});
