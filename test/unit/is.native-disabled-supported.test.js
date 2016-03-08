define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  '../helper/supports',
  'ally/is/native-disabled-supported',
], function(registerSuite, expect, customFixture, supports, isNativeDisabledSupported) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'is/native-disabled-supported',

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
          /*eslint-enable indent */
        ]);
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      invalid: function() {
        expect(function() {
          isNativeDisabledSupported(null);
        }).to.throw(TypeError, 'is/native-disabled-supported requires valid options.context');
      },
      'non-input': function() {
        var element = document.getElementById('non-input');
        var res = isNativeDisabledSupported(element);
        expect(res).to.equal(false);
      },
      'non-disabled input': function() {
        var element = document.getElementById('non-disabled-input');
        var res = isNativeDisabledSupported(element);
        expect(res).to.equal(true);
      },
      'disabled input': function() {
        var element = document.getElementById('disabled-input');
        var res = isNativeDisabledSupported(element);
        expect(res).to.equal(true);
      },
      'disabled fieldset input': function() {
        var element = document.getElementById('disabled-fieldset-input');
        var res = isNativeDisabledSupported(element);
        expect(res).to.equal(true);
      },
      'non-disabled fieldset': function() {
        var element = document.getElementById('non-disabled-fieldset');
        var res = isNativeDisabledSupported(element);
        expect(res).to.equal(!supports.canFocusDisabledFieldset);
      },
      'disabled fieldset': function() {
        var element = document.getElementById('disabled-fieldset');
        var res = isNativeDisabledSupported(element);
        expect(res).to.equal(!supports.canFocusDisabledFieldset);
      },
    };
  });
});
