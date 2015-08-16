define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  '../helper/elements-string',
  '../helper/supports',
  'ally/query/tabsequence',
], function(registerSuite, expect, focusableFixture, elementsString, supports, queryTabsequence) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'query/tabsequence',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      document: function() {
        var expected = '#tabindex-1, #tabindex-0, #link'
          + ', #image-map-area'
          + (supports.canFocusObjectSvg ? ', #object-svg' : '')
          + (supports.canFocusSvgMethod ? ', #svg-link' : '')
          + ', #input, #span-contenteditable'
          + ', #img-ismap-link';

        var result = queryTabsequence();
        expect(elementsString(result)).to.equal(expected);
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
