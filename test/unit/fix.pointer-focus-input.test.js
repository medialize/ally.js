define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/fix/pointer-focus-input',
], function(registerSuite, expect, customFixture, fixPointerFocusInput) {

  registerSuite(function() {
    var fixture;
    var handle;

    // function isRelevantToBrowser() {
    //   var userAgent = window.navigator.userAgent;
    //   // This fix is only relevant to Safari and Firefox on OSX
    //   return userAgent.indexOf('Mac OS X') !== -1
    //     && (userAgent.indexOf('Version/') !== -1 || userAgent.indexOf('Firefox/') !== -1);
    // }

    return {
      name: 'fix/pointer-focus-input',

      beforeEach: function() {
        fixture = customFixture([
          '<div></div>',
        ].join(''));
      },
      afterEach: function() {
        // make sure a failed test cannot leave listeners behind
        handle && handle.disengage();
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
