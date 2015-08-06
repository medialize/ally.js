define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  'ally/supports/focus-invalid-tabindex',
  'ally/supports/focus-img-ismap',
  'ally/supports/focus-scroll-container-without-overflow',
  'ally/supports/focus-scroll-container',
  'ally/supports/focus-scroll-body',
  'ally/is/focusable',
], function(
  registerSuite,
  expect,
  focusableFixture,
  canFocusInvalidTabindex,
  canFocusImgIsmap,
  canFocusScrollContainerWithoutOverflow,
  canFocusScrollContainer,
  canFocusScrollBody,
  isFocusable
) {

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

      invalid: function() {
        expect(function() {
          isFocusable(null);
        }).to.throw(TypeError, 'is/focusable requires an argument of type Element');
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
      'contenteditable attribute': function() {
        var element = document.getElementById('span-contenteditable');
        expect(isFocusable(element)).to.equal(true);
      },
      'extended: CSS user-modify': function() {
        var supports = document.body.style.WebkitUserModify !== undefined;
        var element = document.getElementById('span-user-modify');
        expect(isFocusable(element)).to.equal(supports);
      },
      'extended: img with ismap attribute': function() {
        var element = document.getElementById('img-ismap');
        expect(isFocusable(element)).to.equal(canFocusImgIsmap);
      },
      'extended: scroll container without overflow': function() {
        var element = document.getElementById('scroll-container-without-overflow');
        expect(isFocusable(element)).to.equal(canFocusScrollContainerWithoutOverflow);
      },
      'extended: scroll container': function() {
        var element = document.getElementById('scroll-container');
        expect(isFocusable(element)).to.equal(canFocusScrollContainer);
      },
      'extended: scroll body': function() {
        var element = document.getElementById('scroll-body');
        expect(isFocusable(element)).to.equal(canFocusScrollBody);
      },
    };
  });
});
