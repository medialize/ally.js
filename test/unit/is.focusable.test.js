define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  'ally/is/focusable',
], function(registerSuite, expect, focusableFixture, isFocusable) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'is/focusable',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      'inert elements': function() {
        Object.keys(fixture.inert).forEach(function(key) {
          expect(isFocusable(fixture.inert[key])).to.equal(false, key);
        });
      },
      'focusable elements': function() {
        Object.keys(fixture.focusable).forEach(function(key) {
          expect(isFocusable(fixture.focusable[key])).to.equal(true, key);
        });
      },
      'tabbable elements': function() {
        Object.keys(fixture.tabbable).forEach(function(key) {
          expect(isFocusable(fixture.tabbable[key])).to.equal(true, key);
        });
      },

    };
  });
});
