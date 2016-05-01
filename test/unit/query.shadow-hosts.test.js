define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var shadowInputFixture = require('../helper/fixtures/shadow-input.fixture');
  var queryShadowHosts = require('ally/query/shadow-hosts');

  bdd.describe('query/shadow-hosts', function() {
    var fixture;

    bdd.beforeEach(function() {
      fixture = shadowInputFixture();
    });

    bdd.afterEach(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        queryShadowHosts({
          context: [true],
        });
      }).to.throw(TypeError, 'query/shadow-hosts requires options.context to be an Element');
    });

    bdd.it('should not fail if ShadowDOM is not supported', function() {
      if (document.body.createShadowRoot !== undefined) {
        this.skip('ShadowDOM is supported');
      }

      var result = queryShadowHosts()
      expect(result).to.deep.equal([]);
    });

    bdd.describe('for ShadowDOM', function() {
      bdd.before(function() {
        if (document.body.createShadowRoot === undefined) {
          this.skip('ShadowDOM is not supported');
        }
      });

      bdd.it('should find all ShadowHost elements', function() {
        var expected = [
          '#first-shadow-host',
          '#second-shadow-host',
          '#third-shadow-host',
        ];

        var elements = queryShadowHosts().map(fixture.nodeToString).filter(function(name) {
          // in Chrome the <html> node has a shadowRoot
          return name !== 'html';
        });

        expect(elements).to.deep.equal(expected);
      });

      bdd.it('should find all ShadowHost elements with ShadowHost as context', function() {
        var expected = [
          '#first-shadow-host',
          '#second-shadow-host',
          '#third-shadow-host',
        ];

        var elements = queryShadowHosts({
          context: fixture.shadow.first,
        }).map(fixture.nodeToString);

        expect(elements).to.deep.equal(expected);
      });
    });

  });
});
