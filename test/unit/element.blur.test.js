define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var focusableFixture = require('../helper/fixtures/focusable.fixture');
  var supports = require('../helper/supports');
  var platform = require('ally/util/platform');
  var elementFocus = require('ally/element/focus');
  var elementBlur = require('ally/element/blur');

  registerSuite(function() {
    var fixture;

    return {
      name: 'element/blur',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      invalid: function() {
        expect(function() {
          elementBlur(null);
        }).to.throw(TypeError, 'element/blur requires valid options.context');
      },

      'non focusable element': function() {
        var element = document.getElementById('inert-div');
        var result = elementBlur(element);
        expect(result).to.equal(null);
      },
      'not active element': function() {
        var activeElement = document.getElementById('tabindex-1');
        activeElement.focus();

        var element = document.getElementById('tabindex-0');
        var result = elementBlur(element);
        expect(result).to.equal(null);
      },
      'blur active element': function() {
        var element = document.getElementById('tabindex-0');
        element.focus();

        var result = elementBlur(element);
        expect(result).to.equal(document.body);
      },
      'blur body element': function() {
        var result = elementBlur(document.body);
        expect(result).to.equal(null);
      },
      'focusable svg element': function() {
        var element = document.getElementById('svg-link');
        elementFocus(element);
        var result = elementBlur(element);
        var canFocusSvg = supports.svgFocusMethod || platform.is.TRIDENT && platform.majorVersion < 13;
        expect(result).to.equal(canFocusSvg ? document.body : null);
      },
    };
  });
});
