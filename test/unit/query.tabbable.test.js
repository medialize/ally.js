define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  '../helper/elements-string',
  'platform',
  '../helper/supports',
  'ally/query/tabbable',
], function(registerSuite, expect, focusableFixture, elementsString, platform, supports, queryTabbable) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'query/tabbable',

      beforeEach: function() {
        fixture = focusableFixture();
        // remove elements from tabbing test, because their behavior is undefined
        [].forEach.call(document.querySelectorAll('#embed, #embed-tabindex-0, #embed-svg'), function(element) {
          element.parentNode.removeChild(element);
        });
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      document: function() {
        var deferred = this.async(10000);

        var expected = '#tabindex-0, #tabindex-1, #link'
          + ', #image-map-area'
          + (platform.name === 'Firefox' ? ', #object-svg' : '')
          + (supports.canFocusSvgMethod ? ', #svg-link' : '')
          + ', #audio-controls'
          + ', #input, #span-contenteditable'
          + ', #img-ismap-link';

        // NOTE: Firefox decodes DataURIs asynchronously
        setTimeout(deferred.callback(function() {
          var result = queryTabbable();
          expect(elementsString(result)).to.equal(expected);
        }), 200);
      },

      context: function() {
        var expected = '#link';
        var result = queryTabbable({
          context: '.context',
        });

        expect(elementsString(result)).to.equal(expected);
      },

      'context and self': function() {
        fixture.root.querySelector('.context').setAttribute('tabindex', '-1');

        var expected = '#link';
        var result = queryTabbable({
          context: '.context',
          includeContext: true,
        });

        expect(elementsString(result)).to.equal(expected);
      },
    };
  });
});
