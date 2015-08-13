define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/fix/pointer-focus-children',
], function(registerSuite, expect, customFixture, fixPointerFocusChildren) {

  registerSuite(function() {
    var fixture;
    var handle;

    return {
      name: 'fix/pointer-focus-children',

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
        expect(fixPointerFocusChildren).to.be.a('function');
        handle = fixPointerFocusChildren();
        expect(handle.disengage).to.be.a('function');
        handle.disengage();
      },
    };
  });
});
