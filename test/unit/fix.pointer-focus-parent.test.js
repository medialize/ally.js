define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/fix/pointer-focus-parent',
], function(registerSuite, expect, customFixture, fixPointerFocusParent) {

  registerSuite(function() {
    var fixture;
    var handle;

    return {
      name: 'fix/pointer-focus-parent',

      beforeEach: function() {
        fixture = customFixture([
          '<div></div>',
        ].join(''));
      },
      afterEach: function() {
        // make sure a failed test cannot leave listeners behind
        handle && handle.disengage({ force: true });
        fixture.remove();
        fixture = null;
      },

      lifecycle: function() {
        expect(fixPointerFocusParent).to.be.a('function');
        handle = fixPointerFocusParent();
        expect(handle.disengage).to.be.a('function');
        handle.disengage();
      },

    };
  });
});
