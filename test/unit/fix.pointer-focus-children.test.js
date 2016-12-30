define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var fixPointerFocusChildren = require('ally/fix/pointer-focus-children');

  bdd.describe('fix/pointer-focus-children', function() {
    var fixture;
    var handle;

    bdd.beforeEach(function() {
      fixture = customFixture([
        '<div></div>',
      ]);
    });

    bdd.afterEach(function() {
      // make sure a failed test cannot leave listeners behind
      handle && handle.disengage({ force: true });
      fixture.remove();
      fixture = null;
    });

    bdd.it('should be a global service API', function() {
      expect(fixPointerFocusChildren).to.be.a('function');
      handle = fixPointerFocusChildren();
      expect(handle.disengage).to.be.a('function');
      handle.disengage();
    });
  });
});
