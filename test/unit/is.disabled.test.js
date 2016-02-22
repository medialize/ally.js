define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  '../helper/supports',
  'ally/is/disabled',
], function(registerSuite, expect, customFixture, supports, isDisabled) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'is/disabled',

      beforeEach: function() {
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
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      invalid: function() {
        expect(function() {
          isDisabled(null);
        }).to.throw(TypeError, 'is/disabled requires an argument of type Element');
      },
      'non-input': function() {
        var element = document.getElementById('non-input');
        var res = isDisabled(element);
        expect(res).to.equal(false);
      },
      'non-disabled input': function() {
        var element = document.getElementById('non-disabled-input');
        var res = isDisabled(element);
        expect(res).to.equal(false);
      },
      'disabled input': function() {
        var element = document.getElementById('disabled-input');
        var res = isDisabled(element);
        expect(res).to.equal(true);
      },
      'disabled fieldset input': function() {
        var element = document.getElementById('disabled-fieldset-input');
        var res = isDisabled(element);
        expect(res).to.equal(true);
      },
      'non-disabled fieldset': function() {
        var element = document.getElementById('non-disabled-fieldset');
        var res = isDisabled(element);
        expect(res).to.equal(false);
      },
      'disabled fieldset': function() {
        var element = document.getElementById('disabled-fieldset');
        var res = isDisabled(element);
        expect(res).to.equal(!supports.canFocusDisabledFieldset);
      },
      'disabled form input': function() {
        var element = document.getElementById('disabled-form-input');
        var res = isDisabled(element);
        expect(res).to.equal(!supports.canFocusDisabledForm);
      },
      'non-disabled form': function() {
        var element = document.getElementById('non-disabled-form');
        var res = isDisabled(element);
        expect(res).to.equal(false);
      },
      'disabled form': function() {
        var element = document.getElementById('disabled-form');
        var res = isDisabled(element);
        expect(res).to.equal(!supports.canFocusDisabledForm);
      },
      'ally.element.disabled': function() {
        var element = document.getElementById('non-disabled-input');
        element.setAttribute('data-ally-disabled', 'true');
        var res = isDisabled(element);
        expect(res).to.equal(true);
      },
    };
  });
});
