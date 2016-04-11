define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var shadowInputFixture = require('../helper/fixtures/shadow-input.fixture');
  var queryShadowHosts = require('ally/query/shadow-hosts');

  registerSuite(function() {
    var fixture;

    return {
      name: 'query/shadow-hosts',

      beforeEach: function() {
        fixture = shadowInputFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      invalid: function() {
        expect(function() {
          queryShadowHosts({
            context: [true],
          });
        }).to.throw(TypeError, 'query/shadow-hosts requires options.context to be an Element');
      },

      document: function() {
        if (document.body.createShadowRoot === undefined) {
          this.skip('Shadow DOM not supported');
        }

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
      },
      'ShadowHost as context': function() {
        if (document.body.createShadowRoot === undefined) {
          this.skip('Shadow DOM not supported');
        }

        var expected = [
          '#first-shadow-host',
          '#second-shadow-host',
          '#third-shadow-host',
        ];

        var elements = queryShadowHosts({
          context: fixture.shadow.first,
        }).map(fixture.nodeToString);
        expect(elements).to.deep.equal(expected);
      },
    };
  });
});
