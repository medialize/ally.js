define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  '../helper/fixtures/shadow-input.fixture',
  '../helper/elements-string',
  'ally/supports/focus-invalid-tabindex',
  'ally/supports/css-shadow-piercing-deep-combinator',
  'ally/query/focusable',
], function(
  registerSuite,
  expect,
  focusableFixture,
  shadowInputFixture,
  elementsString,
  canFocusInvalidTabindex,
  cssShadowPiercingDeepCombinator,
  queryFocusable
) {

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

        if (canFocusInvalidTabindex) {
          expected = 'body, #tabindex--1, #tabindex-0, #tabindex-1, #tabindex-bad, #link, #link-tabindex--1, #input, #input-tabindex--1';
        }

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

      'Shadow DOM': function() {
        if (document.body.shadowRoot === undefined) {
          this.skip('Shadow DOM not supported');
        }

        if (!cssShadowPiercingDeepCombinator) {
          this.skip('Shadow DOM "shadow-piercing descendant combinator" not supported');
        }

        var host = document.createElement('div');
        host.id = 'first-shadow-host';
        fixture.root.appendChild(host);
        shadowInputFixture.createShadowRoot(fixture);

        var expected = 'body, #tabindex--1, #tabindex-0, #tabindex-1, #link, #link-tabindex--1, #input, #input-tabindex--1'
          + ', #first-input, #second-input, #third-input';
        var result = queryFocusable();

        expect(elementsString(result)).to.equal(expected);
      },
    };
  });
});
