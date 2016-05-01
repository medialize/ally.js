define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var shadowInputFixture = require('../helper/fixtures/shadow-input.fixture');
  var isShadowed = require('ally/is/shadowed');

  bdd.describe('is/shadowed', function() {
    var fixture;

    bdd.before(function() {
      fixture = shadowInputFixture();
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        isShadowed(null);
      }).to.throw(TypeError, 'is/shadowed requires valid options.context');
    });

    bdd.describe('for document structure', function() {
      bdd.it('should return false for document', function() {
        expect(isShadowed(document)).to.equal(false);
      });

      bdd.it('should return false for <html>', function() {
        expect(isShadowed(document.documentElement)).to.equal(false);
      });

      bdd.it('should return false for <body>', function() {
        expect(isShadowed(document.body)).to.equal(false);
      });

      bdd.it('should return false for <head>', function() {
        expect(isShadowed(document.head)).to.equal(false);
      });
    });

    bdd.describe('for non shadowed elements', function() {
      bdd.it('should return false', function() {
        expect(isShadowed(fixture.input.outer)).to.equal(false);
      });
    });

    bdd.describe('for ShadowDOM', function() {
      bdd.before(function() {
        if (document.body.createShadowRoot === undefined) {
          this.skip('ShadowDOM is not supported');
        }
      });

      bdd.it('should return true for shadowed content', function() {
        expect(isShadowed(fixture.input.first)).to.equal(true);
      });

      bdd.it('should return true for nested shadowed content', function() {
        expect(isShadowed(fixture.input.second)).to.equal(true);
      });
    });

  });
});
