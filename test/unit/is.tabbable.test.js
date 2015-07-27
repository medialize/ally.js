define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  'ally/is/tabbable',
], function(registerSuite, expect, focusableFixture, isTabbable) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'is/tabbable',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      'inert elements': function() {
        Object.keys(fixture.inert).forEach(function(key) {
          expect(isTabbable(fixture.inert[key])).to.equal(false, key);
        });
      },
      'focusable elements': function() {
        Object.keys(fixture.focusable).forEach(function(key) {
          expect(isTabbable(fixture.focusable[key])).to.equal(false, key);
        });
      },
      'tabbable elements': function() {
        Object.keys(fixture.tabbable).forEach(function(key) {
          expect(isTabbable(fixture.tabbable[key])).to.equal(true, key);
        });
      },

    };
  });
});
