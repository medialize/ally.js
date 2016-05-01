define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var imageMap = require('ally/util/image-map');
  var gif = require('ally/supports/media/gif');

  bdd.describe('util/image-map', function() {
    var fixture;

    bdd.before(function() {
      fixture = customFixture([
        /*eslint-disable indent */
        '<div id="non-map">',
          '<area id="non-map-area" href="#void" shape="rect" coords="63,19,144,45">',
        '</div>',

        '<map name="disconnected-map">',
          '<area id="disconnected-map-area" href="#void" shape="rect" coords="63,19,144,45">',
        '</map>',

        '<map name="image-map">',
          '<area id="image-map-area" href="#void" shape="rect" coords="63,19,144,45">',
        '</map>',
        '<img id="image-with-map" usemap="#image-map" src="' + gif + '" alt="">',
        '<img id="image-with-unknown-map" usemap="#unknown-image-map" src="' + gif + '" alt="">',
        '<img id="image-without-map" src="' + gif + '" alt="">',
        /*eslint-enable indent */
      ]);
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.describe('getMapByName()', function() {
      bdd.it('should return `<map>` for known name', function() {
        var map = imageMap.getMapByName('disconnected-map', document);
        expect(map.getAttribute('name')).to.equal('disconnected-map');
      });

      bdd.it('should return null for unknown map', function() {
        var map = imageMap.getMapByName('unknown-map', document);
        expect(map).to.equal(null);
      });
    });

    bdd.describe('getMapOfImage()', function() {
      bdd.it('should return map referenced by image', function() {
        var image = document.getElementById('image-with-map');
        var map = imageMap.getMapOfImage(image);
        expect(map.getAttribute('name')).to.equal('image-map');
      });

      bdd.it('should return null for image not referencing a map', function() {
        var image = document.getElementById('image-without-map');
        var map = imageMap.getMapOfImage(image);
        expect(map).to.equal(null);
      });

      bdd.it('should return null for image referencing unknown map', function() {
        var image = document.getElementById('image-with-unknown-map');
        var map = imageMap.getMapOfImage(image);
        expect(map).to.equal(null);
      });
    });

    bdd.describe('getImageOfArea()', function() {
      bdd.it('should return the image referencing the parent `<map>` of an `<area>`', function() {
        var area = document.getElementById('image-map-area');
        var image = imageMap.getImageOfArea(area);
        expect(image.id).to.equal('image-with-map');
      });

      bdd.it('should return null for `<area>`s whose parent `<map>` is not referenced by an image', function() {
        var area = document.getElementById('disconnected-map-area');
        var image = imageMap.getImageOfArea(area);
        expect(image).to.equal(null);
      });

      bdd.it('should return null for `<area>`s not within a `<map>`', function() {
        var area = document.getElementById('non-map-area');
        var image = imageMap.getImageOfArea(area);
        expect(image).to.equal(null);
      });
    });

  });
});
