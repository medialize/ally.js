define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var sinon = require('sinon');
  var focusableFixture = require('../helper/fixtures/focusable.fixture');
  var supports = require('../helper/supports');
  var elementFocus = require('ally/element/focus');
  var visibleArea = require('ally/util/visible-area');

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
      bdd.it('should focus SVG links', function() {
        var element = document.getElementById('svg-link');
        var result = elementFocus(element);
        expect(result).to.equal(supports.focusingSvgElements ? element : null);
      });

      bdd.it('should redirect focus from descendants of SVG links', function() {
        var element = document.getElementById('svg-link-text');
        var target = document.getElementById('svg-link');

        var result = elementFocus(element, {
          defaultToAncestor: true,
        });

        expect(result).to.equal(supports.focusingSvgElements ? target : null);
      });
    });

    bdd.describe('for option.undoScrolling', function() {
      bdd.beforeEach(function() {
        // shift #link-tabindex--1 out of sight
        var container = document.querySelector('.context');
        var spacer = document.getElementById('link');

        container.setAttribute('style', 'overflow: auto; height: 100px;');
        spacer.setAttribute('style', 'margin: 100px 0; display: block;');
      });

      bdd.it('should by scroll focused element into view by default', function() {
        var target = document.getElementById('link-tabindex--1');

        expect(visibleArea(target)).to.equal(0);

        var result = elementFocus(target);

        expect(result).to.equal(target);
        // Trident scrolls the element to about 98% visibility
        expect(visibleArea(target)).to.be.at.least(0.9);
      });

      bdd.it('should revert scroll positions after focusing element', function() {
        var target = document.getElementById('link-tabindex--1');

        expect(visibleArea(target)).to.equal(0);

        var result = elementFocus(target, {
          undoScrolling: true,
        });

        expect(result).to.equal(target);
        expect(visibleArea(target)).to.equal(0);
      });
    });

  });
});
