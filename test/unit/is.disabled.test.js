define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var supports = require('../helper/supports');
  var isDisabled = require('ally/is/disabled');

  bdd.describe('is/disabled', function() {
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
        '<form disabled>',
          '<input type="text" id="disabled-form-input">',
        '</form>',
        '<form id="non-disabled-form" tabindex="-1"></form>',
        '<form id="disabled-form" tabindex="-1" disabled></form>',
        /*eslint-enable indent */
      ]);
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        isDisabled(null);
      }).to.throw(TypeError, 'is/disabled requires valid options.context');
    });

    bdd.describe('for elements', function() {
      bdd.it('should return false for <div>', function() {
        var element = document.getElementById('non-input');
        var res = isDisabled(element);
        expect(res).to.equal(false);
      });

      bdd.it('should return true for <div data-ally-disabled="true">', function() {
        var element = document.getElementById('non-input');
        element.setAttribute('data-ally-disabled', 'true');
        var res = isDisabled(element);
        expect(res).to.equal(true);
      });

      bdd.it('should return false for <input>', function() {
        var element = document.getElementById('non-disabled-input');
        var res = isDisabled(element);
        expect(res).to.equal(false);
      });

      bdd.it('should return true for <input disabled>', function() {
        var element = document.getElementById('disabled-input');
        var res = isDisabled(element);
        expect(res).to.equal(true);
      });
    });

    bdd.describe('for elements in <fieldset>', function() {
      bdd.it('should return false for <fieldset> <input>', function() {
        var element = document.getElementById('non-disabled-fieldset');
        var res = isDisabled(element);
        expect(res).to.equal(false);
      });

      bdd.it('should return true for <fieldset disabled> <input>', function() {
        var element = document.getElementById('disabled-fieldset-input');
        var res = isDisabled(element);
        expect(res).to.equal(true);
      });

      bdd.it('should return true for <fieldset disabled>', function() {
        var element = document.getElementById('disabled-fieldset');
        var res = isDisabled(element);
        expect(res).to.equal(!supports.focusFieldsetDisabled);
      });
    });

    bdd.describe('for elements in <form>', function() {
      bdd.it('should return false for <form> <input>', function() {
        var element = document.getElementById('non-disabled-form');
        var res = isDisabled(element);
        expect(res).to.equal(false);
      });

      bdd.it('should return true for <form disabled> <input>', function() {
        var element = document.getElementById('disabled-form-input');
        var res = isDisabled(element);
        expect(res).to.equal(!supports.focusFormDisabled);
      });

      bdd.it('should return true for <form disabled>', function() {
        var element = document.getElementById('disabled-form');
        var res = isDisabled(element);
        expect(res).to.equal(!supports.focusFormDisabled);
      });
    });

  });
});
