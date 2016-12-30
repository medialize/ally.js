define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var shadowInputFixture = require('../helper/fixtures/shadow-input.fixture');
  var getShadowHostParents = require('ally/get/shadow-host-parents');

  bdd.describe('get/shadow-host-parents', function() {
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
        getShadowHostParents();
      }).to.throw(TypeError, 'get/shadow-host-parents requires valid options.context');
    });

    bdd.describe('in ShadowDOM', function() {
      bdd.before(function() {
        if (!fixture.shadow.first) {
          this.skip('ShadowDOM is not supported');
        }
      });

      bdd.it('should return empty array for non-shadowed elements', function() {
        var target = fixture.root;
        var shadowParents = getShadowHostParents({
          context: target,
        });

        expect(shadowParents.length).to.equal(0);
      });

      bdd.it('should return empty array for non-shadowed ShadowHost', function() {
        var shadowParents = getShadowHostParents({
          context: fixture.shadow.first,
        });

        expect(shadowParents.length).to.equal(0);
      });

      bdd.it('should return ancestor ShadowHosts for ShadowRoots', function() {
        var shadowParents = getShadowHostParents({
          context: fixture.shadow.first.shadowRoot,
        });

        expect(shadowParents.length).to.equal(1);
        expect(shadowParents[0]).to.equal(fixture.shadow.first);
      });

      bdd.it('should return ancestor ShadowHosts for shadowed elements', function() {
        var shadowParents = getShadowHostParents({
          context: fixture.input.second,
        });

        expect(shadowParents.length).to.equal(2);
        expect(shadowParents[0]).to.equal(fixture.shadow.second);
        expect(shadowParents[1]).to.equal(fixture.shadow.first);
      });
    });
  });
});
