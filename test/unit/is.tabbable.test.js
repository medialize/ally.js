define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  'platform',
  'ally/is/focusable',
  'ally/is/tabbable',
], function(registerSuite, expect, focusableFixture, platform, isFocusable, isTabbable) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'is/tabbable',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      invalid: function() {
        expect(function() {
          isTabbable(null);
        }).to.throw(TypeError, 'is/tabbable requires an argument of type Element');
      },
      'inert div': function() {
        var element = document.getElementById('inert-div');
        expect(isFocusable(element) && isTabbable(element)).to.equal(false);
      },
      'tabindex="-1"': function() {
        var element = document.getElementById('tabindex--1');
        expect(isFocusable(element) && isTabbable(element)).to.equal(false);
      },
      'tabindex="0"': function() {
        var element = document.getElementById('tabindex-0');
        expect(isFocusable(element) && isTabbable(element)).to.equal(true);
      },
      'tabindex="1"': function() {
        var element = document.getElementById('tabindex-1');
        expect(isFocusable(element) && isTabbable(element)).to.equal(true);
      },
      'anchor (<a> without href)': function() {
        var element = document.getElementById('anchor');
        expect(isFocusable(element) && isTabbable(element)).to.equal(false);
      },
      link: function() {
        var element = document.getElementById('link');
        expect(isFocusable(element) && isTabbable(element)).to.equal(true);
      },
      'link with tabindex="-1"': function() {
        var element = document.getElementById('link-tabindex--1');
        expect(isFocusable(element) && isTabbable(element)).to.equal(false);
      },
      input: function() {
        var element = document.getElementById('input');
        expect(isFocusable(element) && isTabbable(element)).to.equal(true);
      },
      'input with tabindex="-1"': function() {
        var element = document.getElementById('input-tabindex--1');
        expect(isFocusable(element) && isTabbable(element)).to.equal(false);
      },
      'disabled input': function() {
        var element = document.getElementById('input-disabled');
        expect(isFocusable(element) && isTabbable(element)).to.equal(false);
      },
      'input type="hidden"': function() {
        var element = document.getElementById('input-hidden');
        expect(isFocusable(element) && isTabbable(element)).to.equal(false);
      },
      'extended: scroll container without overflow': function() {
        var element = document.getElementById('scroll-container-without-overflow');
        expect(isFocusable(element)).to.equal(false);
      },
      'extended: scroll container': function() {
        var element = document.getElementById('scroll-container');
        expect(isFocusable(element)).to.equal(platform.name === 'Firefox');
      },
      'extended: scroll body': function() {
        var element = document.getElementById('scroll-body');
        expect(isFocusable(element)).to.equal(false);
      },

    };
  });
});
