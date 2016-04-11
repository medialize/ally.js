define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var fixPointerFocusInput = require('ally/fix/pointer-focus-input');

  registerSuite(function() {
    var fixture;
    var handle;

    return {
      name: 'fix/pointer-focus-input',

      beforeEach: function() {
        fixture = customFixture([
          '<div></div>',
        ]);
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
