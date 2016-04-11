define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var fixPointerFocusChildren = require('ally/fix/pointer-focus-children');

  registerSuite(function() {
    var fixture;
    var handle;

    return {
      name: 'fix/pointer-focus-children',

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
        expect(fixPointerFocusChildren).to.be.a('function');
        handle = fixPointerFocusChildren();
        expect(handle.disengage).to.be.a('function');
        handle.disengage();
      },
    };
  });
});
