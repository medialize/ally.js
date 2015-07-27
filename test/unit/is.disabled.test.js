define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/is/disabled',
  'ally/supports/focus-fieldset-disabled',
], function(registerSuite, expect, customFixture, isDisabled, canFocusDisabledFieldset) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'is/disabled',

      beforeEach: function() {
        fixture = customFixture([
          '<div tabindex="-1" id="non-input"></div>',
          '<input type="text" id="non-disabled-input">',
          '<input type="text" id="disabled-input" disabled>',
          '<fieldset disabled>',
            '<input type="text" id="disabled-fieldset-input">',
          '</fieldset>',
          '<fieldset id="non-disabled-fieldset" tabindex="-1"></fieldset>',
          '<fieldset id="disabled-fieldset" tabindex="-1" disabled></fieldset>',
        ].join(''));
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
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
        expect(res).to.equal(!canFocusDisabledFieldset);
      },
    };
  });
});
