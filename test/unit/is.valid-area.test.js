define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var supports = require('../helper/supports');
  var isValidArea = require('ally/is/valid-area');
  var gif = require('ally/supports/media/gif');
  var invalidGif = require('ally/supports/media/gif.invalid');

  registerSuite(function() {
    var fixture;

    return {
      name: 'is/valid-area',

      beforeEach: function() {
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
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      invalid: function() {
        expect(function() {
          isValidArea(null);
        }).to.throw(TypeError, 'is/valid-area requires valid options.context');
      },
      'div element': function() {
        var element = document.getElementById('non-area');
        expect(isValidArea(element)).to.equal(false);
      },
      'area in disconnected map': function() {
        var element = document.getElementById('disconnected-map-area');
        expect(isValidArea(element)).to.equal(false);
      },
      'area in connected map': function() {
        // Firefox may not immediately show img.complete for DataURIs
        var deferred = this.async(10000);
        setTimeout(deferred.callback(function() {
          var element = document.getElementById('image-map-area');
          expect(isValidArea(element)).to.equal(true, 'valid area');
          element = document.getElementById('image-map-area-nolink');
          expect(isValidArea(element)).to.equal(supports.canFocusAreaWithoutHref, 'no href');
        }), 200);
      },
      'area in map for img in link': function() {
        var element = document.getElementById('interactive-map-area');
        expect(isValidArea(element)).to.equal(false);
      },
      'area in map for broken img': function() {
        var element = document.getElementById('broken-map-area');
        expect(isValidArea(element)).to.equal(supports.canFocusBrokenImageMap);
      },
    };
  });
});
