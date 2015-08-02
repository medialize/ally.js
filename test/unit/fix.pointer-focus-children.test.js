define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/fix/pointer-focus-children',
], function(registerSuite, expect, customFixture, fixPointerFocusChildren) {

  registerSuite(function() {
    var fixture;
    var handle;

    // function isRelevantToBrowser() {
    //   var userAgent = window.navigator.userAgent;
    //   // This fix is only relevant to IE10 (Trident/6) and IE11 (Trident/7)
    //   return userAgent.indexOf('Trident/6') !== -1 || userAgent.indexOf('Trident/7') !== -1;
    // }

    return {
      name: 'fix/pointer-focus-children',

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
        expect(fixPointerFocusChildren).to.be.a('function');
        handle = fixPointerFocusChildren();
        expect(handle.disengage).to.be.a('function');
        handle.disengage();
      },
    };
  });
});
