define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  'ally/supports/focus-invalid-tabindex',
  'ally/is/focusable',
], function(registerSuite, expect, focusableFixture, canFocusInvalidTabindex, isFocusable) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'is/focusable',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      'inert div': function() {
        var element = document.getElementById('inert-div');
        expect(isFocusable(element)).to.equal(false);
      },
      'tabindex="-1"': function() {
        var element = document.getElementById('tabindex--1');
        expect(isFocusable(element)).to.equal(true);
      },
      'tabindex="0"': function() {
        var element = document.getElementById('tabindex-0');
        expect(isFocusable(element)).to.equal(true);
      },
      'tabindex="1"': function() {
        var element = document.getElementById('tabindex-1');
        expect(isFocusable(element)).to.equal(true);
      },
      'tabindex="bad"': function() {
        var element = document.getElementById('tabindex-bad');
        expect(isFocusable(element)).to.equal(canFocusInvalidTabindex);
      },
      'anchor (<a> without href)': function() {
        var element = document.getElementById('anchor');
        expect(isFocusable(element)).to.equal(false);
      },
      link: function() {
        var element = document.getElementById('link');
        expect(isFocusable(element)).to.equal(true);
      },
      'link with tabindex="-1"': function() {
        var element = document.getElementById('link-tabindex--1');
        expect(isFocusable(element)).to.equal(true);
      },
      input: function() {
        var element = document.getElementById('input');
        expect(isFocusable(element)).to.equal(true);
      },
      'input with tabindex="-1"': function() {
        var element = document.getElementById('input-tabindex--1');
        expect(isFocusable(element)).to.equal(true);
      },
      'disabled input': function() {
        var element = document.getElementById('input-disabled');
        expect(isFocusable(element)).to.equal(false);
      },
      'input type="hidden"': function() {
        var element = document.getElementById('input-hidden');
        expect(isFocusable(element)).to.equal(false);
      },
    };
  });
});
