define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var shadowInputFixture = require('../helper/fixtures/shadow-input.fixture');
  var getActiveElements = require('ally/get/active-elements');

  bdd.describe('get/active-element', function() {
    var fixture;

    bdd.before(function() {
      fixture = shadowInputFixture();
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.describe('in document', function() {
      bdd.it('should return body/html when nothing is active', function() {
        var expected = [document.body];
        var result = getActiveElements();

        // Internet Explorer 10 may think it's <html> rather than <body>
        if (result[0] === document.documentElement) {
          expected = [document.documentElement];
        }

        expect(result).to.deep.equal(expected);
      });

      bdd.it('should return the activeElement', function() {
        fixture.input.outer.focus();

        var expected = [fixture.input.outer];
        var result = getActiveElements();

        expect(result).to.deep.equal(expected);
      });

      bdd.it('should return the activeElement', function() {
        // focus and immediately remove an element to make IE10
        // lose its shit and set document.activeElement to null
        var input = document.createElement('input');
        document.body.appendChild(input);
        input.focus();
        document.body.removeChild(input);

        var expected = [document.body];
        var result = getActiveElements();
        expect(result).to.deep.equal(expected);
      });
    });

    bdd.describe('in ShadowDOM', function() {
      bdd.before(function() {
        if (!fixture.shadow.first) {
          this.skip('ShadowDOM is not supported');
        }
      });

      bdd.it('should return activeElement ancestry', function() {
        fixture.input.first.focus();

        var result = getActiveElements();
        var expected = [
          fixture.input.first,
          fixture.shadow.first,
        ];

        expect(result).to.deep.equal(expected);
      });

      bdd.it('should return activeElement ancestry for nested Shadows', function() {
        fixture.input.second.focus();

        var result = getActiveElements();
        var expected = [
          fixture.input.second,
          fixture.shadow.second,
          fixture.shadow.first,
        ];

        expect(result).to.deep.equal(expected);
      });
    });
  });
});
