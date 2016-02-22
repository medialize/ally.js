define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/util/image-map',
  'ally/supports/media/gif',
], function(registerSuite, expect, customFixture, imageMap, gif) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'util/image-map',

      beforeEach: function() {
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
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      getMapByName: function() {
        var map = imageMap.getMapByName('disconnected-map', document);
        expect(map.getAttribute('name')).to.equal('disconnected-map');
      },
      'getMapByName, unknown map': function() {
        var map = imageMap.getMapByName('unknown-map', document);
        expect(map).to.equal(null);
      },

      getMapOfImage: function() {
        var image = document.getElementById('image-with-map');
        var map = imageMap.getMapOfImage(image);
        expect(map.getAttribute('name')).to.equal('image-map');
      },
      'getMapOfImage, without usemap': function() {
        var image = document.getElementById('image-without-map');
        var map = imageMap.getMapOfImage(image);
        expect(map).to.equal(null);
      },
      'getMapOfImage, without unknown map': function() {
        var image = document.getElementById('image-with-unknown-map');
        var map = imageMap.getMapOfImage(image);
        expect(map).to.equal(null);
      },

      getImageOfArea: function() {
        var area = document.getElementById('image-map-area');
        var image = imageMap.getImageOfArea(area);
        expect(image.id).to.equal('image-with-map');
      },
      'getImageOfArea, without image': function() {
        var area = document.getElementById('disconnected-map-area');
        var image = imageMap.getImageOfArea(area);
        expect(image).to.equal(null);
      },
      'getImageOfArea, invalid parent': function() {
        var area = document.getElementById('non-map-area');
        var image = imageMap.getImageOfArea(area);
        expect(image).to.equal(null);
      },
    };
  });
});
