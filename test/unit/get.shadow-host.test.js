define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var shadowInputFixture = require('../helper/fixtures/shadow-input.fixture');
  var getShadowHost = require('ally/get/shadow-host');

  bdd.describe('get/shadow-host', function() {
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
        getShadowHost();
      }).to.throw(TypeError, 'get/shadow-host requires valid options.context');
    });

    bdd.describe('in ShadowDOM', function() {
      bdd.before(function() {
        if (!fixture.shadow.first) {
          this.skip('ShadowDOM is not supported');
        }
      });

      bdd.it('should return null for non-shadowed elements', function() {
        var target = fixture.root;
        var shadowParents = getShadowHost({
          context: target,
        });

        expect(shadowParents).to.equal(null);
      });

      bdd.it('should return null for non-shadowed ShadowHost', function() {
        var shadowHost = getShadowHost({
          context: fixture.shadow.first,
        });

        expect(shadowHost).to.equal(null);
      });

      bdd.it('should return the ShadowHost for ShadowRoots', function() {
        var shadowHost = getShadowHost({
          context: fixture.shadow.first.shadowRoot,
        });

        expect(shadowHost).to.equal(fixture.shadow.first);
      });

      bdd.it('should return the first ancestor ShadowHost for shadowed elements', function() {
        var shadowHost = getShadowHost({
          context: fixture.input.second,
        });

        expect(shadowHost).to.equal(fixture.shadow.second);
      });
    });
  });
});
