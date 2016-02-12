define([
  'intern!object',
  'intern/chai!expect',
  'sinon',
  '../helper/fixtures/focusable.fixture',
  '../helper/supports',
  'ally/util/platform',
  'ally/element/focus',
], function(registerSuite, expect, sinon, focusableFixture, supports, platform, elementFocus) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'element/focus',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      invalid: function() {
        expect(function() {
          elementFocus(null);
        }).to.throw(TypeError, 'element/focus requires valid options.context');
      },

      'non focusable element': function() {
        var element = document.getElementById('inert-div');
        var result = elementFocus(element);
        expect(result).to.equal(null);
      },
      'focusable element': function() {
        var element = document.getElementById('tabindex-0');
        var result = elementFocus(element);
        expect(result).to.equal(element);
      },
      'child of focusable element': function() {
        var target = document.getElementById('tabindex-0');
        var element = document.createElement('span');
        element.textContent = 'hello world';
        target.appendChild(element);

        var result = elementFocus(element);
        expect(result).to.equal(target);
      },
      'focusable svg element': function() {
        var element = document.getElementById('svg-link');
        var result = elementFocus(element);
        var canFocusSvg = supports.svgFocusMethod || platform.is.TRIDENT && platform.majorVersion < 13;
        expect(result).to.equal(canFocusSvg ? element : null);
      },
      'child of focusable svg element': function() {
        var element = document.getElementById('svg-link-text');
        var target = document.getElementById('svg-link');
        var result = elementFocus(element);
        var canFocusSvg = supports.svgFocusMethod || platform.is.TRIDENT && platform.majorVersion < 13;
        expect(result).to.equal(canFocusSvg ? target : null);
      },
      'ignores flexbox': function() {
        var element = document.getElementById('flexbox-container-child');
        var result = elementFocus(element);
        expect(result).to.equal(null);
      },
      'ignores scroll-container': function() {
        var element = document.getElementById('div-section-overflow-scroll-body');
        var result = elementFocus(element);
        expect(result).to.equal(null);
      },
      'does not focus activeElement': function() {
        var element = document.getElementById('input');
        element.focus();

        var _focus = sinon.spy(element, 'focus');

        var result = elementFocus(element);
        expect(result).to.equal(element, 'returned element');
        expect(_focus.called).to.equal(false, 'calling focus()');

        _focus.restore();
      },
    };
  });
});
