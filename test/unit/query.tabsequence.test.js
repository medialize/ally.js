define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  '../helper/elements-string',
  'platform',
  '../helper/supports',
  'ally/query/tabsequence',
], function(registerSuite, expect, focusableFixture, elementsString, platform, supports, queryTabsequence) {

  registerSuite(function() {
    var fixture;

    var mutateFixtureForImageMaps = function() {
      // create known end-point
      var last = fixture.add('<input type="text" id="end-of-line">').firstElementChild;
      // move image map before #end-of-line to separate <img> from <map>
      var img = document.getElementById('img-usemap');
      last.parentNode.insertBefore(img, last);
      // add second area to test order within map
      var area = document.getElementById('image-map-area');
      var newArea = area.cloneNode(true);
      newArea.id = 'image-map-area-2';
      area.parentNode.appendChild(newArea);
    };

    return {
      name: 'query/tabsequence',

      beforeEach: function() {
        fixture = focusableFixture();
        mutateFixtureForImageMaps();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      document: function() {
        var deferred = this.async(10000);

        var _imageMapSequence = ', #image-map-area, #image-map-area-2';
        var expected = '#tabindex-1, #tabindex-0, #link'
          + (supports.tabsequenceSortsAreaAtImagePosition ? '' : _imageMapSequence)
          + (platform.name === 'Firefox' ? ', #object-svg' : '')
          + (supports.canFocusSvgMethod ? ', #svg-link' : '')
          + ', #audio-controls'
          + ', #input, #span-contenteditable'
          + ', #img-ismap-link'
          + (supports.tabsequenceSortsAreaAtImagePosition ? _imageMapSequence : '')
          + ', #end-of-line';

        // NOTE: Firefox decodes DataURIs asynchronously
        setTimeout(deferred.callback(function() {
          var result = queryTabsequence();
          expect(elementsString(result)).to.equal(expected);
        }), 200);
      },

      context: function() {
        var context = fixture.root.querySelector('.context');
        var input = document.createElement('input');
        input.setAttribute('tabindex', '3');
        input.setAttribute('id', 'tabindex-3');
        context.appendChild(input);

        var expected = '#tabindex-3, #link';
        var result = queryTabsequence({
          context: '.context',
        });

        expect(elementsString(result)).to.equal(expected);
      },

      'context and self': function() {
        fixture.root.querySelector('.context').setAttribute('tabindex', '0');

        var expected = 'div, #link';
        var result = queryTabsequence({
          context: '.context',
          includeContext: true,
        });

        expect(elementsString(result)).to.equal(expected);
      },
    };
  });
});
