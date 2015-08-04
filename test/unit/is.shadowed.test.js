define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/shadow-input.fixture',
  'ally/is/shadowed',
], function(registerSuite, expect, shadowInputFixture, isShadowed) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'is/shadowed',

      beforeEach: function() {
        fixture = shadowInputFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      invalid: function() {
        expect(function() {
          isShadowed(null);
        }).to.throw(TypeError, 'is/shadowed requires an argument of type Element');
      },
      'non shadowed': function() {
        expect(isShadowed(fixture.input.outer)).to.equal(false);
      },
      shadowed: function() {
        expect(isShadowed(fixture.input.first)).to.equal(true);
      },
      'nested shadowed': function() {
        expect(isShadowed(fixture.input.second)).to.equal(true);
      },
    };
  });
});
