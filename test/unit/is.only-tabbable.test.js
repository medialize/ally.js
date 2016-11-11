define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var focusableFixture = require('../helper/fixtures/focusable.fixture');
  var platform = require('ally/util/platform');
  var isOnlyTabbable = require('ally/is/only-tabbable');

  bdd.describe('is/only-tabbable', function() {
    var fixture;

    bdd.before(function() {
      var deferred = this.async(10000);
      fixture = focusableFixture();
      fixture.add([
        /*eslint-disable indent */
        '<label tabindex="0" id="label-tabindex-0">text</label>',
        '<label tabindex="-1" id="label-tabindex--1">text</label>',
        /*eslint-enable indent */
      ], 'svg-container');
      // NOTE: Firefox decodes DataURIs asynchronously
      setTimeout(deferred.resolve, 200);
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        isOnlyTabbable(null);
      }).to.throw(TypeError, 'is/only-tabbable requires valid options.context');

      expect(function() {
        isOnlyTabbable([true]);
      }).to.throw(TypeError, 'is/only-tabbable requires options.context to be an Element');
    });

    bdd.it('should provide .rules() and .except()', function() {
      var element = document.getElementById('inert-div');
      expect(isOnlyTabbable.rules({
        context: element,
      })).to.equal(false, '.rules()');

      expect(isOnlyTabbable.rules.except({})(element)).to.equal(false, '.rules.except()');
    });

    bdd.describe('for document structure', function() {
      bdd.it('should return false for document', function() {
        expect(isOnlyTabbable(document)).to.equal(false);
      });

      bdd.it('should return false for <html>', function() {
        expect(isOnlyTabbable(document.documentElement)).to.equal(false);
      });

      bdd.it('should return false for <body>', function() {
        expect(isOnlyTabbable(document.body)).to.equal(false);
      });

      bdd.it('should return false for <head>', function() {
        expect(isOnlyTabbable(document.head)).to.equal(false);
      });
    });

    bdd.describe('for <div> with tabindex attribute', function() {
      bdd.it('should return false for <div>', function() {
        var element = document.getElementById('inert-div');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <div tabindex="-1">', function() {
        var element = document.getElementById('tabindex--1');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <div tabindex="0">', function() {
        var element = document.getElementById('tabindex-0');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <div tabindex="1">', function() {
        var element = document.getElementById('tabindex-1');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <div tabindex="bad">', function() {
        var element = document.getElementById('tabindex-bad');
        expect(isOnlyTabbable(element)).to.equal(false);
      });
    });

    bdd.describe('for <a>', function() {
      bdd.it('should return false for <a> (without href attribute)', function() {
        var element = document.getElementById('anchor');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <a href="…">', function() {
        var element = document.getElementById('link');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <a tabindex="-1">', function() {
        var element = document.getElementById('link-tabindex--1');
        expect(isOnlyTabbable(element)).to.equal(false);
      });
    });

    bdd.describe('for <input>', function() {
      bdd.it('should return false for <input>', function() {
        var element = document.getElementById('input');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <input tabindex="-1">', function() {
        var element = document.getElementById('input-tabindex--1');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <input disabled>', function() {
        var element = document.getElementById('input-disabled');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <fieldset disabled> <input>', function() {
        var element = document.getElementById('fieldset-disabled-input');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <input type="hidden">', function() {
        var element = document.getElementById('input-hidden');
        expect(isOnlyTabbable(element)).to.equal(false);
      });
    });

    bdd.describe('for editable elements', function() {
      bdd.it('should return false for <span contenteditable>', function() {
        var element = document.getElementById('span-contenteditable');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <span style="user-modify: read-write">', function() {
        var element = document.getElementById('span-user-modify');
        expect(isOnlyTabbable(element)).to.equal(false);
      });
    });

    bdd.describe('for <img>', function() {
      bdd.it('should return false for <img usemap="…">', function() {
        var element = document.getElementById('img-usemap');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <img usemap="…" tabindex="-1">', function() {
        var element = document.getElementById('img-usemap');
        element.setAttribute('tabindex', '-1');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <a> <img ismap>', function() {
        var element = document.getElementById('img-ismap');
        expect(isOnlyTabbable(element)).to.equal(false);
      });
    });

    bdd.describe('for <area>', function() {
      bdd.it('should return false for <area>', function() {
        var element = document.getElementById('image-map-area');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <area tabindex="-1">', function() {
        var element = document.getElementById('image-map-area');
        element.setAttribute('tabindex', '-1');
        expect(isOnlyTabbable(element)).to.equal(false);
      });
    });

    bdd.describe('for <label>', function() {
      bdd.it('should return false for <label>', function() {
        var element = document.getElementById('label');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <label tabindex="-1">', function() {
        var element = document.getElementById('label');
        element.setAttribute('tabindex', '-1');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return {browser-specific} for <label tabindex="0">', function() {
        var element = document.getElementById('label');
        element.setAttribute('tabindex', '0');
        expect(isOnlyTabbable(element)).to.equal(platform.is.GECKO);
      });
    });

    bdd.describe('for <audio>', function() {
      bdd.it('should return false for <audio controls>', function() {
        var element = document.getElementById('audio-controls');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <audio> without controls attribute', function() {
        var element = document.getElementById('audio');
        expect(isOnlyTabbable(element)).to.equal(false);
      });
    });

    bdd.describe('for SVG', function() {
      bdd.it('should return {browser-specific} for <svg>', function() {
        var element = document.getElementById('svg');
        var expected = platform.is.TRIDENT || platform.is.EDGE;
        expect(isOnlyTabbable(element)).to.equal(expected);
      });

      bdd.it('should return {browser-specific} for <svg tabindex="-1">', function() {
        var element = document.getElementById('svg');
        element.setAttribute('tabindex', '-1');
        var expected = platform.is.TRIDENT || platform.is.EDGE;
        expect(isOnlyTabbable(element)).to.equal(expected);
      });

      bdd.it('should return {browser-specific} for <a xlink:href="…">', function() {
        var element = document.getElementById('svg-link');
        var expected = platform.is.TRIDENT || platform.is.EDGE || platform.is.GECKO;
        expect(isOnlyTabbable(element)).to.equal(expected);
      });

      bdd.it('should return false for <text>', function() {
        var element = document.getElementById('svg-link-text');
        expect(isOnlyTabbable(element)).to.equal(false);
      });
    });

    bdd.describe('for <object>', function() {
      bdd.it('should return false for <object> referencing an SVG', function() {
        var element = document.getElementById('object-svg');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <object tabindex="-1"> referencing an SVG', function() {
        var element = document.getElementById('object-tabindex-svg');
        expect(isOnlyTabbable(element)).to.equal(false);
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
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for <embed tabindex="0">', function() {
        var element = document.getElementById('embed-tabindex-0');
        expect(isOnlyTabbable(element)).to.equal(false);
      });
    });

    bdd.describe('for scrollable elements', function() {
      bdd.it('should return false for scrollable <div> without CSS overflow property', function() {
        var element = document.getElementById('scroll-container-without-overflow');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for scrollable <div> with CSS overflow property', function() {
        var element = document.getElementById('scroll-container');
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for child of scrollable <div> without CSS overflow property', function() {
        var element = document.getElementById('scroll-body');
        expect(isOnlyTabbable(element)).to.equal(false);
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
        expect(isOnlyTabbable(element)).to.equal(false);
      });

      bdd.it('should return false for flexbox container', function() {
        var element = document.getElementById('flexbox-parent');
        expect(isOnlyTabbable(element)).to.equal(false);
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
        expect(isOnlyTabbable(host)).to.equal(false);
      });

      bdd.it('should return false for ShadowHost with tabindex="-1"', function() {
        host.setAttribute('tabindex', '-1');
        expect(isOnlyTabbable(host)).to.equal(false);
      });
    });

  });
});
