define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var supports = require('../helper/supports');
  var isNativeDisabledSupported = require('ally/is/native-disabled-supported');

  bdd.describe('is/native-disabled-supported', function() {
    var fixture;

    bdd.before(function() {
      fixture = customFixture([
        /*eslint-disable indent */
        '<div tabindex="-1" id="non-input"></div>',
        '<input type="text" id="non-disabled-input">',
        '<input type="text" id="disabled-input" disabled>',
        '<fieldset disabled>',
          '<input type="text" id="disabled-fieldset-input">',
        '</fieldset>',
        '<fieldset id="non-disabled-fieldset" tabindex="-1"></fieldset>',
        '<fieldset id="disabled-fieldset" tabindex="-1" disabled></fieldset>',
        '<form id="form" disabled></form>',
        /*eslint-enable indent */
      ]);
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        isNativeDisabledSupported(null);
      }).to.throw(TypeError, 'is/native-disabled-supported requires valid options.context');
    });

    bdd.it('should return false for <div>', function() {
      var element = document.getElementById('non-input');
      var res = isNativeDisabledSupported(element);
      expect(res).to.equal(false);
    });

    bdd.it('should return true for <input>', function() {
      var element = document.getElementById('non-disabled-input');
      var res = isNativeDisabledSupported(element);
      expect(res).to.equal(true);
    });

    bdd.it('should return {browser-specific} for <form>', function() {
      var element = document.getElementById('form');
      var res = isNativeDisabledSupported(element);
      expect(res).to.equal(!supports.focusFormDisabled);
    });

    bdd.it('should return {browser-specific} for <fieldset>', function() {
      var element = document.getElementById('non-disabled-fieldset');
      var res = isNativeDisabledSupported(element);
      expect(res).to.equal(!supports.focusFieldsetDisabled);
    });
  });
});
