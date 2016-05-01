define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var focusableFixture = require('../helper/fixtures/focusable.fixture');
  var platform = require('ally/util/platform');
  var supports = require('../helper/supports');
  var isFocusable = require('ally/is/focusable');
  var isTabbable = require('ally/is/tabbable');

  bdd.describe('is/tabbable', function() {
    var fixture;

    function isFocusableAndTabbable() {
      return isFocusable.apply(null, arguments) && isTabbable.apply(null, arguments);
    }

    var trueUnlessPlatform = !platform.is.IOS;

    bdd.before(function() {
      var deferred = this.async(10000);
      fixture = focusableFixture();
      // NOTE: Firefox decodes DataURIs asynchronously
      setTimeout(deferred.resolve, 200);
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        isTabbable(null);
      }).to.throw(TypeError, 'is/tabbable requires valid options.context');

      expect(function() {
        isTabbable([true]);
      }).to.throw(TypeError, 'is/tabbable requires options.context to be an Element');
    });

    bdd.it('should provide .rules() and .except()', function() {
      var element = document.getElementById('input');
      expect(isTabbable.rules({
        context: element,
      })).to.equal(true, '.rules()');

      expect(isTabbable.rules.except({})(element)).to.equal(true, '.rules.except()');
    });

    bdd.describe('for document structure', function() {
      bdd.it('should return false for document', function() {
        expect(isFocusableAndTabbable(document)).to.equal(false);
      });

      bdd.it('should return false for <html>', function() {
        expect(isFocusableAndTabbable(document.documentElement)).to.equal(false);
      });

      bdd.it('should return false for <body>', function() {
        expect(isFocusableAndTabbable(document.body)).to.equal(false);
      });

      bdd.it('should return false for <head>', function() {
        expect(isFocusableAndTabbable(document.head)).to.equal(false);
      });
    });

    bdd.describe('for <div> with tabindex attribute', function() {
      bdd.it('should return false for <div>', function() {
        var element = document.getElementById('inert-div');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <div tabindex="-1">', function() {
        var element = document.getElementById('tabindex--1');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });

      bdd.it('should return {browser-specific} for <div tabindex="0">', function() {
        var element = document.getElementById('tabindex-0');
        expect(isFocusableAndTabbable(element)).to.equal(trueUnlessPlatform);
      });

      bdd.it('should return {browser-specific} for <div tabindex="1">', function() {
        var element = document.getElementById('tabindex-1');
        expect(isFocusableAndTabbable(element)).to.equal(trueUnlessPlatform);
      });

      bdd.it('should return false for <div tabindex="bad">', function() {
        var element = document.getElementById('tabindex-bad');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });
    });

    bdd.describe('for <a>', function() {
      bdd.it('should return false for <a> (without href attribute)', function() {
        var element = document.getElementById('anchor');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });

      bdd.it('should return {browser-specific} for <a href="…">', function() {
        var element = document.getElementById('link');
        expect(isFocusableAndTabbable(element)).to.equal(trueUnlessPlatform);
      });

      bdd.it('should return false for <a tabindex="-1">', function() {
        var element = document.getElementById('link-tabindex--1');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });
    });

    bdd.describe('for <input>', function() {
      bdd.it('should return true for <input>', function() {
        var element = document.getElementById('input');
        expect(isFocusableAndTabbable(element)).to.equal(true);
      });

      bdd.it('should return false for <input tabindex="-1">', function() {
        var element = document.getElementById('input-tabindex--1');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <input disabled>', function() {
        var element = document.getElementById('input-disabled');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <fieldset disabled> <input>', function() {
        var element = document.getElementById('fieldset-disabled-input');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <input type="hidden">', function() {
        var element = document.getElementById('input-hidden');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });
    });

    bdd.describe('for editable elements', function() {
      bdd.it('should return true for <span contenteditable>', function() {
        var element = document.getElementById('span-contenteditable');
        expect(isFocusableAndTabbable(element)).to.equal(true);
      });

      bdd.it('should return false for <span contenteditable tabindex="-1">', function() {
        var element = document.getElementById('span-contenteditable');
        element.setAttribute('tabindex', '-1');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });

      bdd.it('should return {browser-specific} for <span style="user-modify: read-write">', function() {
        var _supports = document.body.style.webkitUserModify !== undefined;
        var element = document.getElementById('span-user-modify');
        expect(isFocusableAndTabbable(element)).to.equal(_supports);
      });

      bdd.it('should return false for <span style="user-modify: read-write" tabindex="-1">', function() {
        var element = document.getElementById('span-user-modify');
        element.setAttribute('tabindex', '-1');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });
    });

    bdd.describe('for <img>', function() {
      bdd.after(function() {
        var element = document.getElementById('img-usemap');
        element.removeAttribute('tabindex');
      });

      bdd.it('should return false for <img usemap="…">', function() {
        var element = document.getElementById('img-usemap');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <img usemap="…">', function() {
        var element = document.getElementById('img-usemap');
        element.setAttribute('tabindex', '-1');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });

      bdd.it('should return {browser-specific} for <a> <img ismap>', function() {
        var element = document.getElementById('img-ismap');
        expect(isFocusableAndTabbable(element)).to.equal(supports.focusImgIsmap);
      });
    });

    bdd.describe('for <area>', function() {
      bdd.it('should return {browser-specific} for <area>', function() {
        var element = document.getElementById('image-map-area');
        expect(isFocusableAndTabbable(element)).to.equal(trueUnlessPlatform);
      });

      bdd.it('should return false for <area tabindex="-1">', function() {
        var element = document.getElementById('image-map-area');
        element.setAttribute('tabindex', '-1');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });
    });

    bdd.describe('for <label>', function() {
      bdd.it('should return false for <label>', function() {
        var element = document.getElementById('label');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <label tabindex="-1">', function() {
        var element = document.getElementById('label');
        element.setAttribute('tabindex', '-1');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });

      bdd.it('should return {browser-specific} for <label tabindex="0">', function() {
        var element = document.getElementById('label');
        element.setAttribute('tabindex', '0');
        expect(isFocusableAndTabbable(element)).to.equal(supports.focusLabelTabindex);
      });
    });

    bdd.describe('for <audio>', function() {
      bdd.it('should return {browser-specific} for <audio controls>', function() {
        var element = document.getElementById('audio-controls');
        expect(isFocusableAndTabbable(element)).to.equal(trueUnlessPlatform);
      });

      bdd.it('should return false for <audio> without controls attribute', function() {
        var element = document.getElementById('audio');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });
    });

    bdd.describe('for SVG', function() {
      bdd.it('should return false for <svg>', function() {
        var element = document.getElementById('svg');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <svg tabindex="-1">', function() {
        var element = document.getElementById('svg');
        element.setAttribute('tabindex', '-1');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });

      bdd.it('should return {browser-specific} for <a xlink:href="…">', function() {
        var element = document.getElementById('svg-link');
        expect(isFocusableAndTabbable(element)).to.equal(supports.svgFocusMethod && trueUnlessPlatform);
      });

      bdd.it('should return {browser-specific} for <a xlink:href="…"> with except.onlyTabbable', function() {
        var element = document.getElementById('svg-link');
        var result = isTabbable.rules({
          context: element,
          except: {
            onlyTabbable: true,
          },
        });

        expect(result).to.equal(trueUnlessPlatform);
      });

      bdd.it('should return false for <text>', function() {
        var element = document.getElementById('svg-link-text');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });
    });

    bdd.describe('for <object>', function() {
      bdd.it('should return {browser-specific} for <object> referencing an SVG', function() {
        var element = document.getElementById('object-svg');
        expect(isFocusableAndTabbable(element)).to.equal(supports.focusObjectSvg && platform.is.GECKO);
      });

      bdd.it('should return false for <object tabindex="-1"> referencing an SVG', function() {
        var element = document.getElementById('object-tabindex-svg');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });
    });

    bdd.describe('for <embed>', function() {
      bdd.before(function() {
        var element = document.getElementById('embed');
        if (!element) {
          this.skip('skipping to avoid test colliding with QuickTime');
        }
      });

      bdd.it('should return false for <embed>', function() {
        var element = document.getElementById('embed');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <embed tabindex="0">', function() {
        var element = document.getElementById('embed-tabindex-0');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });
    });

    bdd.describe('for scrollable elements', function() {
      bdd.it('should return false for scrollable <div> without CSS overflow property', function() {
        var element = document.getElementById('scroll-container-without-overflow');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });

      bdd.it('should return {browser-specific} for scrollable <div> with CSS overflow property', function() {
        var element = document.getElementById('scroll-container');
        expect(isFocusableAndTabbable(element)).to.equal(platform.is.GECKO);
      });

      bdd.it('should return false for child of scrollable <div> without CSS overflow property', function() {
        var element = document.getElementById('scroll-body');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for scrollable elements with except.scrollable', function() {
        var element = document.getElementById('scroll-container');
        var result = isTabbable.rules({
          context: element,
          except: {
            scrollable: true,
          },
        });

        expect(result).to.equal(false);
      });
    });

    bdd.describe('for CSS Flexbox Layout', function() {
      bdd.before(function() {
        fixture.add([
          /*eslint-disable indent */
          '<div id="flexbox-parent" style="display: -webkit-flex; display: -ms-flexbox; display: flex;">',
            '<span id="flexbox-child" style="display: block;">hello</span>',
          '</div>',
          /*eslint-enable indent */
        ]);
      });

      bdd.it('should return false for child of flexbox container', function() {
        var element = document.getElementById('flexbox-child');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for flexbox container', function() {
        var element = document.getElementById('flexbox-parent');
        expect(isFocusableAndTabbable(element)).to.equal(false);
      });
    });

    bdd.describe('for ShadowDOM', function() {
      var host;
      var root;

      bdd.before(function() {
        if (document.body.createShadowRoot === undefined) {
          this.skip('ShadowDOM is not supported');
        }

        host = fixture.add([
          /*eslint-disable indent */
          '<div></div>',
          /*eslint-enable indent */
        ]).firstElementChild;
        root = host.createShadowRoot();
        root.innerHTML = '<input>';
      });

      bdd.it('should return false for ShadowHost', function() {
        expect(isFocusableAndTabbable(host)).to.equal(false);
      });

      bdd.it('should return false for ShadowHost with tabindex="-1"', function() {
        host.setAttribute('tabindex', '-1');
        expect(isFocusableAndTabbable(host)).to.equal(false);
      });

      bdd.it('should return {browser-specific} for ShadowHost with tabindex="0"', function() {
        host.setAttribute('tabindex', '0');
        expect(isFocusableAndTabbable(host)).to.equal(trueUnlessPlatform);
      });
    });

  });
});
