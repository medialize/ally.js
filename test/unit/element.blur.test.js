define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var focusableFixture = require('../helper/fixtures/focusable.fixture');
  var supports = require('../helper/supports');
  var platform = require('ally/util/platform');
  var elementFocus = require('ally/element/focus');
  var elementBlur = require('ally/element/blur');

  bdd.describe('element/blur', function() {
    var fixture;

    bdd.beforeEach(function() {
      fixture = focusableFixture();
    });

    bdd.afterEach(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        elementBlur(null);
      }).to.throw(TypeError, 'element/blur requires valid options.context');
    });

    bdd.it('should ignore non-focusable elements', function() {
      var element = document.getElementById('inert-div');
      var result = elementBlur(element);
      expect(result).to.equal(null);
    });

    bdd.it('should not blur unless the element is the activeElement', function() {
      var activeElement = document.getElementById('tabindex-1');
      activeElement.focus();

      var element = document.getElementById('tabindex-0');
      var result = elementBlur(element);
      expect(result).to.equal(null);
    });

    bdd.it('should blur the activeElement', function() {
      var element = document.getElementById('tabindex-0');
      element.focus();

      var result = elementBlur(element);
      expect(result).to.equal(document.body);
    });

    bdd.it('should not blur the body element', function() {
      var result = elementBlur(document.body);
      expect(result).to.equal(null);
    });

    bdd.it('should blur SVG elements', function() {
      var element = document.getElementById('svg-link');
      elementFocus(element, {
        defaultToAncestor: true,
      });

      var result = elementBlur(element);
      var canFocusSvg = supports.svgFocusMethod || platform.is.TRIDENT || platform.is.EDGE && platform.majorVersion < 13;
      expect(result).to.equal(canFocusSvg ? document.body : null);
    });

  });
});
