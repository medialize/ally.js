define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  '../helper/elements-string',
  '../helper/supports',
  'ally/query/tabbable',
], function(registerSuite, expect, focusableFixture, elementsString, supports, queryTabbable) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'query/tabbable',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      document: function() {
        var expected = '#tabindex-0, #tabindex-1, #link'
          + ', #image-map-area'
          + (supports.canFocusObjectSvg ? ', #object-svg' : '')
          + (supports.canFocusSvgMethod ? ', #svg-link' : '')
          + (supports.canFocusEmbed ? ', #embed' : '')
          + (supports.canFocusEmbedTabindex ? ', #embed-tabindex-0' : '')
          + (supports.canFocusObjectSvg ? ', #embed-svg' : '')
          + ', #audio-controls'
          + ', #input, #span-contenteditable'
          + ', #img-ismap-link';

        var result = queryTabbable();
        expect(elementsString(result)).to.equal(expected);
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
