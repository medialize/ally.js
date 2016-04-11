define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var shadowInputFixture = require('../helper/fixtures/shadow-input.fixture');
  var isShadowed = require('ally/is/shadowed');

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
        }).to.throw(TypeError, 'is/shadowed requires valid options.context');
      },
      document: function() {
        expect(isShadowed(document)).to.equal(false);
      },
      'non shadowed': function() {
        expect(isShadowed(fixture.input.outer)).to.equal(false);
      },
      shadowed: function() {
        if (!fixture.shadow.first) {
          this.skip('Shadow DOM not supported');
        }

        expect(isShadowed(fixture.input.first)).to.equal(true);
      },
      'nested shadowed': function() {
        if (!fixture.shadow.first) {
          this.skip('Shadow DOM not supported');
        }

        expect(isShadowed(fixture.input.second)).to.equal(true);
      },
    };
  });
});
