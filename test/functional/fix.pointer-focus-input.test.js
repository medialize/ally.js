define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var pollUntil = require('intern/dojo/node!leadfoot/helpers/pollUntil');

  registerSuite(function() {
    var timeout = 120000;

    function makeFocusClickTest(prefix, hasTarget) {
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
            var expected = hasTarget ? (prefix + 'fail-target') : (prefix + 'fail-source');
            if (activeElementId === expected) {
              this.skip('Element focused naturally');
            }
          }.bind(this))

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
            var expected = hasTarget ? (prefix + 'fixed-target') : (prefix + 'fixed-source');
            expect(activeElementId).to.equal(expected);
          });
      };
    }

    return {
      name: 'fix/pointer-focus-input',

      before: function() {
        return this.remote
          .get(require.toUrl('test/pages/fix.pointer-focus-input.test.html'))
          .setPageLoadTimeout(timeout)
          .setFindTimeout(timeout)
          .setExecuteAsyncTimeout(timeout)
          // This fix is only relevant to Safari and Firefox on OSX
          .then(pollUntil('return window.platform'))
          .then(function(platform) {
            if (!platform.is.OSX || !platform.is.GECKO && !platform.is.WEBKIT) {
              this.skip('irrelevant to current browser');
            }
          }.bind(this));
      },

      '<button>': makeFocusClickTest('button-', false),
      '<button><span>': makeFocusClickTest('nested-button-', true),
      '<input type="button">': makeFocusClickTest('input-button-', false),
      '<input type="checkbox">': makeFocusClickTest('checkbox-', false),
      '<input type="checkbox"> clicking on <label>': makeFocusClickTest('labeled-checkbox-', true),
      '<input type="checkbox"> clicking on <label><span>': makeFocusClickTest('nested-labeled-checkbox-', true),
      '<input type="range">': makeFocusClickTest('slider-', false),
      '<input type="radio">': makeFocusClickTest('radio-', false),
      '<label> without input': function() {
        this.timeout = timeout;
        return this.remote
          // make sure we're failing without the fix
          .findById('impotent-label')
            .click()
            .end()
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            var _activeElementId = activeElementId.toLowerCase();
            expect(_activeElementId).to.equal('body');
          });
      },
    };
  });
});
