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

    return {
      name: 'query/tabsequence',

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
        var deferred = this.async(500);

        var expected = '#tabindex-1, #tabindex-0, #link'
          + ', #image-map-area'
          + (platform.name === 'Firefox' ? ', #object-svg' : '')
          + (supports.canFocusSvgMethod ? ', #svg-link' : '')
          + ', #audio-controls'
          + ', #input, #span-contenteditable'
          + ', #img-ismap-link';

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
