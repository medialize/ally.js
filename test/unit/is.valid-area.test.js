define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var supports = require('../helper/supports');
  var isValidArea = require('ally/is/valid-area');
  var gif = require('ally/supports/media/gif');
  var invalidGif = require('ally/supports/media/gif.invalid');

  bdd.describe('is/valid-area', function() {
    var fixture;

    bdd.before(function() {
      var deferred = this.async(10000);

      fixture = customFixture([
        /*eslint-disable indent */
        '<div id="non-area"></div>',
        '<map name="disconnected-map">',
          '<area id="disconnected-map-area" href="#void" shape="rect" coords="63,19,144,45">',
        '</map>',

        '<map name="image-map">',
          '<area id="image-map-area" href="#void" shape="rect" coords="63,19,144,45">',
          '<area id="image-map-area-nolink" shape="rect" coords="63,19,144,45">',
        '</map>',
        '<img usemap="#image-map" src="' + gif + '" alt="">',

        '<map id="noname-map">',
          '<area id="image-map-area" href="#void" shape="rect" coords="63,19,144,45">',
          '<area id="image-map-area-nolink" shape="rect" coords="63,19,144,45">',
        '</map>',
        '<img usemap="#noname-map" src="' + gif + '" alt="">',

        '<map name="interactive-map">',
          '<area id="interactive-map-area" href="#void" shape="rect" coords="63,19,144,45">',
        '</map>',
        '<a href="#">',
          '<img usemap="#interactive-map" src="' + invalidGif + '" alt="">',
        '</a>',

        '<map name="broken-map">',
          '<area id="broken-map-area" href="#void" shape="rect" coords="63,19,144,45">',
        '</map>',
        '<img usemap="#broken-map" src="' + invalidGif + '" alt="">',
        /*eslint-enable indent */
      ]);

      // NOTE: Firefox decodes DataURIs asynchronously
      setTimeout(deferred.resolve, 200);
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        isValidArea(null);
      }).to.throw(TypeError, 'is/valid-area requires valid options.context');
    });

    bdd.describe('for document structure', function() {
      bdd.it('should return false for document', function() {
        expect(function() {
          isValidArea(document);
        }).to.throw(TypeError, 'is/valid-area requires options.context to be an Element');
      });

      bdd.it('should return false for <html>', function() {
        expect(isValidArea(document.documentElement)).to.equal(false);
      });

      bdd.it('should return false for <body>', function() {
        expect(isValidArea(document.body)).to.equal(false);
      });

      bdd.it('should return false for <head>', function() {
        expect(isValidArea(document.head)).to.equal(false);
      });
    });

    bdd.describe('for non area elements', function() {
      bdd.it('should return false', function() {
        var element = document.getElementById('non-area');
        expect(isValidArea(element)).to.equal(false);
      });
    });

    bdd.describe('for area elements', function() {
      bdd.it('should return false without associated image', function() {
        var element = document.getElementById('disconnected-map-area');
        expect(isValidArea(element)).to.equal(false);
      });

      bdd.it('should return {browser-specific}', function() {
        var element = document.getElementById('image-map-area');
        expect(isValidArea(element)).to.equal(true, 'valid area');
        element = document.getElementById('image-map-area-nolink');
        expect(isValidArea(element)).to.equal(supports.focusAreaWithoutHref, 'no href');
      });

      bdd.it('should return false if associated image is child of <a>', function() {
        var element = document.getElementById('interactive-map-area');
        expect(isValidArea(element)).to.equal(false);
      });

      bdd.it('should return {browser-specific} if associated image is not loaded', function() {
        var element = document.getElementById('broken-map-area');
        expect(isValidArea(element)).to.equal(supports.focusBrokenImageMap);
      });
    });

  });
});
