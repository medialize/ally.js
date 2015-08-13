define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/fix/pointer-focus-input',
], function(registerSuite, expect, customFixture, fixPointerFocusInput) {

  registerSuite(function() {
    var fixture;
    var handle;

    return {
      name: 'fix/pointer-focus-input',

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
        expect(fixPointerFocusInput).to.be.a('function');
        handle = fixPointerFocusInput();
        expect(handle.disengage).to.be.a('function');
        handle.disengage();
      },
    };
  });
});
