define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var sinon = require('sinon');
  var focusableFixture = require('../helper/fixtures/focusable.fixture');
  var supports = require('../helper/supports');
  var platform = require('ally/util/platform');
  var elementFocus = require('ally/element/focus');

  bdd.describe('element/focus', function() {
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
        elementFocus(null);
      }).to.throw(TypeError, 'element/focus requires valid options.context');
    });

    bdd.it('should ignore non-focusable elements', function() {
      var element = document.getElementById('inert-div');
      var result = elementFocus(element);
      expect(result).to.equal(null);
    });

    bdd.it('should ignore the activeElement', function() {
      var element = document.getElementById('input');
      element.focus();

      var _focus = sinon.spy(element, 'focus');

      var result = elementFocus(element);
      expect(result).to.equal(element, 'returned element');
      expect(_focus.called).to.equal(false, 'calling focus()');

      _focus.restore();
    });

    bdd.it('should focus non-input elements', function() {
      var element = document.getElementById('tabindex-0');
      var result = elementFocus(element);
      expect(result).to.equal(element);
    });

    bdd.it('should redirect focus from descendants of focusable elements', function() {
      var target = document.getElementById('tabindex-0');
      var element = document.createElement('span');
      element.textContent = 'hello world';
      target.appendChild(element);

      var result = elementFocus(element, {
        defaultToAncestor: true,
      });

      expect(result).to.equal(target);
    });

    bdd.it('should not consider flexbox elements focusable in IE10-11', function() {
      var element = document.getElementById('flexbox-container-child');
      var result = elementFocus(element);
      expect(result).to.equal(null);
    });

    bdd.it('should ignore non-focusable scrolling containers', function() {
      var element = document.getElementById('div-section-overflow-scroll-body');
      var result = elementFocus(element);
      expect(result).to.equal(null);
    });

    bdd.describe('for SVG elements', function() {
      var canFocusSvg = supports.svgFocusMethod || platform.is.TRIDENT && platform.majorVersion < 13;

      bdd.it('should focus SVG links', function() {
        var element = document.getElementById('svg-link');
        var result = elementFocus(element);
        expect(result).to.equal(canFocusSvg ? element : null);
      });

      bdd.it('should redirect focus from descendants of SVG links', function() {
        var element = document.getElementById('svg-link-text');
        var target = document.getElementById('svg-link');

        var result = elementFocus(element, {
          defaultToAncestor: true,
        });

        var canFocusSvg = supports.svgFocusMethod || platform.is.TRIDENT && platform.majorVersion < 13;
        expect(result).to.equal(canFocusSvg ? target : null);
      });
    });

  });
});
