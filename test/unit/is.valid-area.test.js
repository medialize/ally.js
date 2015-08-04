define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/supports/focus-broken-image-map',
  'ally/is/valid-area',
], function(registerSuite, expect, customFixture, canFocusBrokenImageMap, isValidArea) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'is/valid-area',

      beforeEach: function() {
        fixture = customFixture([
          '<div id="non-area"></div>',
          '<map name="disconnected-map">',
            '<area id="disconnected-map-area" href="#void" shape="rect" coords="63,19,144,45">',
          '</map>',

          '<map name="image-map">',
            '<area id="image-map-area" href="#void" shape="rect" coords="63,19,144,45">',
            '<area id="image-map-area-nolink" shape="rect" coords="63,19,144,45">',
          '</map>',
          '<img usemap="#image-map" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="">',

          '<map id="noname-map">',
            '<area id="image-map-area" href="#void" shape="rect" coords="63,19,144,45">',
            '<area id="image-map-area-nolink" shape="rect" coords="63,19,144,45">',
          '</map>',
          '<img usemap="#noname-map" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="">',

          '<map name="interactive-map">',
            '<area id="interactive-map-area" href="#void" shape="rect" coords="63,19,144,45">',
          '</map>',
          '<a href="#">',
            '<img usemap="#interactive-map" src="data:image/gif;base64,broken-image" alt="">',
          '</a>',

          '<map name="broken-map">',
            '<area id="broken-map-area" href="#void" shape="rect" coords="63,19,144,45">',
          '</map>',
          '<img usemap="#broken-map" src="data:image/gif;base64,broken-image" alt="">',
        ].join(''));
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      'div element': function() {
        var element = document.getElementById('non-area');
        expect(isValidArea(element)).to.equal(true);
      },
      'area in disconnected map': function() {
        var element = document.getElementById('disconnected-map-area');
        expect(isValidArea(element)).to.equal(false);
      },
      'area in connected map': function() {
        // Firefox may not immediately show img.complete for DataURIs
        var deferred = this.async(500);
        setTimeout(deferred.callback(function() {
          var element = document.getElementById('image-map-area');
          expect(isValidArea(element)).to.equal(true, 'valid area');
          element = document.getElementById('image-map-area-nolink');
          expect(isValidArea(element)).to.equal(false, 'no href');
        }), 200);
      },
      'area in map for img in link': function() {
        var element = document.getElementById('interactive-map-area');
        expect(isValidArea(element)).to.equal(false);
      },
      'area in map for broken img': function() {
        var element = document.getElementById('broken-map-area');
        expect(isValidArea(element)).to.equal(false);
      },
    };
  });
});
