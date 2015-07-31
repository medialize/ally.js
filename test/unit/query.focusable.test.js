define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  '../helper/elements-string',
  'ally/query/focusable',
], function(registerSuite, expect, focusableFixture, elementsString, queryFocusable) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'query/focusable',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      document: function() {
        var expected = 'body, #tabindex--1, #tabindex-0, #tabindex-1, #link, #link-tabindex--1, #input, #input-tabindex--1';
        var result = queryFocusable();

        expect(elementsString(result)).to.equal(expected);
      },

      context: function() {
        var expected = '#link, #link-tabindex--1';
        var result = queryFocusable({
          context: '.context',
        });

        expect(elementsString(result)).to.equal(expected);
      },

      'context and self': function() {
        fixture.root.querySelector('.context').setAttribute('tabindex', '-1');

        var expected = 'div, #link, #link-tabindex--1';
        var result = queryFocusable({
          context: '.context',
          includeContext: true,
        });

        expect(elementsString(result)).to.equal(expected);
      },
    };
  });
});
