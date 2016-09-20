define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var sinon = require('sinon');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var supports = require('../helper/supports');
  var logger = require('ally/util/logger');
  var elementDisabled = require('ally/element/disabled');
  var mp4 = require('ally/supports/media/mp4');

  bdd.describe('element/disabled', function() {
    var fixture;

    function modifiesAttribute(elementId, attribute, value, initialValue) {
      return function() {
        var element = document.getElementById(elementId);
        if (initialValue !== null) {
          element.setAttribute(attribute, initialValue);
        }

        expect(element.getAttribute(attribute)).to.equal(initialValue, 'before disable');

        elementDisabled(element, true);
        expect(element.getAttribute(attribute)).to.equal(value, 'after disable');

        elementDisabled(element, true);
        expect(element.getAttribute(attribute)).to.equal(value, 'after second disable');

        elementDisabled(element, false);
        expect(element.getAttribute(attribute)).to.equal(initialValue, 'after disable undo');
      };
    }

    function detectDisabledState(elementId) {
      return function() {
        var element = document.getElementById(elementId);
        expect(elementDisabled(element)).to.equal(false, 'before disable');

        elementDisabled(element, true);
        expect(elementDisabled(element)).to.equal(true, 'after disable');

        elementDisabled(element, true);
        expect(elementDisabled(element)).to.equal(true, 'after second disable');

        elementDisabled(element, false);
        expect(elementDisabled(element)).to.equal(false, 'after disable undo');
      };
    }

    function overwriteFocusMethod(elementId, Element, engaged) {
      return function() {
        var element = document.getElementById(elementId);
        expect(element.focus === Element.prototype.focus).to.equal(true, 'available before disable');

        elementDisabled(element, true);
        expect(element.focus === Element.prototype.focus).to.equal(!engaged, 'patched after disable');

        elementDisabled(element, true);
        expect(element.focus === Element.prototype.focus).to.equal(!engaged, 'patched after second disable');

        element.focus();
        expect(logger.warn.calledOnce).to.equal(engaged, 'one warning logged');
        expect(logger.warn.calledWith('trying to focus inert element', element))
          .to.equal(engaged, 'proper warning logged');

        elementDisabled(element, false);
        expect(element.focus === Element.prototype.focus).to.equal(true, 'available after disable undo');
      };
    }

    function overwriteCssPointerEvents(elementId, engaged) {
      return function() {
        var element = document.getElementById(elementId);
        expect(element.style.pointerEvents).to.equal('', 'before disable');

        elementDisabled(element, true);
        expect(element.style.pointerEvents).to.equal(engaged ? 'none' : '', 'after disable');

        elementDisabled(element, true);
        expect(element.style.pointerEvents).to.equal(engaged ? 'none' : '', 'after second disable');

        elementDisabled(element, false);
        expect(element.style.pointerEvents).to.equal('', 'after disable undo');
      };
    }

    bdd.beforeEach(function() {
      sinon.spy(logger, 'warn');
      fixture = customFixture([
        /*eslint-disable indent */
        '<div tabindex="0" id="non-input"></div>',
        '<input type="text" id="input">',
        '<svg xmlns="https://www.w3.org/2000/svg" xmlns:xlink="https://www.w3.org/1999/xlink" id="svg">',
          '<a xlink:href="#void" id="svg-link">',
            '<text x="10" y="20" id="svg-link-text">text</text>',
          '</a>',
          '<text x="10" y="20" id="svg-text" focusable="true">text</text>',
        '</svg>',
        /*eslint-enable indent */
      ]);
    });

    bdd.afterEach(function() {
      logger.warn.restore();
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        elementDisabled(null);
      }).to.throw(TypeError, 'element/disabled requires valid options.context');
    });

    bdd.describe('for non-input elements', function() {
      bdd.it('should return boolean state', detectDisabledState('non-input'));
      bdd.it('should overwrite focus method', overwriteFocusMethod('non-input', HTMLElement, true));
      bdd.it('should overwrite CSS pointer-events', overwriteCssPointerEvents('non-input', true));
      bdd.it('should set data-ally-disabled attribute', modifiesAttribute('non-input', 'data-ally-disabled', 'true', null));
      bdd.it('should overwrite tabindex="0"', modifiesAttribute('non-input', 'tabindex', '-1', '0'));
      bdd.it('should set aria-disabled="true"', modifiesAttribute('non-input', 'aria-disabled', 'true', null));
      bdd.it('should overwrite aria-disabled="false"', modifiesAttribute('non-input', 'aria-disabled', 'true', 'false'));
    });

    bdd.describe('for input elements', function() {
      bdd.it('should set disabled state', function() {
        var element = document.getElementById('input');
        expect(element.disabled).to.equal(false, 'before disable');

        elementDisabled(element, true);
        expect(element.disabled).to.equal(true, 'after disable');

        elementDisabled(element, true);
        expect(element.disabled).to.equal(true, 'after second disable');

        elementDisabled(element, false);
        expect(element.disabled).to.equal(false, 'after disable undo');
      });

      bdd.it('should return boolean state', detectDisabledState('input'));
      bdd.it('should not overwrite focus method', overwriteFocusMethod('input', HTMLElement, false));
      bdd.it('should not overwrite CSS pointer-events', overwriteCssPointerEvents('input', false));
      bdd.it('should not set data-ally-disabled attribute', modifiesAttribute('input', 'data-ally-disabled', null, null));
      bdd.it('should not modify the tabindex attribute', modifiesAttribute('input', 'tabindex', null, null));
      bdd.it('should not set aria-disabled="true"', modifiesAttribute('input', 'aria-disabled', null, null));
    });

    bdd.describe('for video elements', function() {
      bdd.before(function() {
        if (supports.AVOID_MEDIA) {
          this.skip('Browser cannot deal with <video> and <audio>');
        }
      });
      bdd.beforeEach(function() {
        fixture.add('<video id="video" src="' + mp4 + '"></video>').firstElementChild;
      });

      bdd.it('should remove the controls attribute', function() {
        var element = document.getElementById('video');
        element.setAttribute('controls', '');
        expect(element.hasAttribute('controls')).to.equal(true, 'controls before disable');

        elementDisabled(element, true);
        expect(element.hasAttribute('controls')).to.equal(false, 'controls after disable');
        expect(element.hasAttribute('data-ally-disabled')).to.equal(true, 'data-ally-disabled after disable');

        elementDisabled(element, true);
        expect(element.hasAttribute('controls')).to.equal(false, 'controls after second disable');
        expect(element.hasAttribute('data-ally-disabled')).to.equal(true, 'data-ally-disabled after second disable');

        elementDisabled(element, false);
        expect(element.hasAttribute('controls')).to.equal(true, 'controls after disable undo');
        expect(element.hasAttribute('data-ally-disabled')).to.equal(false, 'data-ally-disabled after disable undo');
      });
      bdd.it('should disable without control attribute present', function() {
        var element = document.getElementById('video');
        expect(element.hasAttribute('controls')).to.equal(false, 'controls before disable');

        elementDisabled(element, true);

        expect(element.hasAttribute('controls')).to.equal(false, 'controls after disable');
        expect(element.hasAttribute('data-ally-disabled')).to.equal(true, 'data-ally-disabled after disable');

        elementDisabled(element, true);
        expect(element.hasAttribute('controls')).to.equal(false, 'controls after second disable');
        expect(element.hasAttribute('data-ally-disabled')).to.equal(true, 'data-ally-disabled after second disable');

        elementDisabled(element, false);
        expect(element.hasAttribute('controls')).to.equal(false, 'controls after disable undo');
        expect(element.hasAttribute('data-ally-disabled')).to.equal(false, 'data-ally-disabled after disable undo');
      });

      bdd.it('should return boolean state', detectDisabledState('video'));
      bdd.it('should overwrite focus method', overwriteFocusMethod('video', HTMLElement, true));
      bdd.it('should overwrite CSS pointer-events', overwriteCssPointerEvents('video', true));
      bdd.it('should set data-ally-disabled attribute', modifiesAttribute('video', 'data-ally-disabled', 'true', null));
      bdd.it('should set tabindex="-1"', modifiesAttribute('video', 'tabindex', '-1', null));
      bdd.it('should overwrite tabindex="0"', modifiesAttribute('video', 'tabindex', '-1', '0'));
      bdd.it('should set aria-disabled="true"', modifiesAttribute('video', 'aria-disabled', 'true', null));
      bdd.it('should overwrite aria-disabled="false"', modifiesAttribute('video', 'aria-disabled', 'true', 'false'));
    });

    bdd.describe('for SVG elements', function() {
      bdd.it('should set focusable="false"', modifiesAttribute('svg-link', 'focusable', supports.focusSvgFocusableAttribute ? 'false' : null, null));
      bdd.it('should overwrite focusable="true"', modifiesAttribute('svg-text', 'focusable', supports.focusSvgFocusableAttribute ? 'false' : 'true', 'true'));
      bdd.it('should set focusable="false" on <svg>', modifiesAttribute('svg', 'focusable', supports.focusSvgFocusableAttribute ? 'false' : null, null));
      bdd.it('should remove links elements', function() {
        var element = document.getElementById('svg-link');

        var initialValue = element.getAttribute('xlink:href');
        expect(element.hasAttribute('xlink:href')).to.equal(true, 'before disable');

        elementDisabled(element, true);
        var expected = supports.focusSvgFocusableAttribute || supports.focusSvgTabindexAttribute;
        expect(element.hasAttribute('xlink:href')).to.equal(expected, 'after disable');

        elementDisabled(element, false);
        expect(element.getAttribute('xlink:href')).to.equal(initialValue, 'after disable undo');
      });

      bdd.it('should return boolean state', detectDisabledState('svg-link'));
      bdd.it('should overwrite focus method', overwriteFocusMethod('svg-link', SVGElement, true));
      bdd.it('should overwrite CSS pointer-events', overwriteCssPointerEvents('svg-link', true));
      bdd.it('should set data-ally-disabled attribute', modifiesAttribute('svg-link', 'data-ally-disabled', 'true', null));
      bdd.it('should set tabindex="-1"', modifiesAttribute('svg-link', 'tabindex', '-1', null));
      bdd.it('should overwrite tabindex="0"', modifiesAttribute('svg-link', 'tabindex', '-1', '0'));
      bdd.it('should set aria-disabled="true"', modifiesAttribute('svg-link', 'aria-disabled', 'true', null));
      bdd.it('should overwrite aria-disabled="false"', modifiesAttribute('svg-link', 'aria-disabled', 'true', 'false'));
    });

  });
});
