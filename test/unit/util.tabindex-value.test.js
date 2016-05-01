define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var supports = require('../helper/supports');
  var tabindexValue = require('ally/util/tabindex-value');

  bdd.describe('util/tabindex-value', function() {
    var fixture;

    bdd.before(function() {
      fixture = customFixture([
        /*eslint-disable indent */
        '<div id="tabindex-none">text</div>',
        '<div id="tabindex-empty" tabindex="">text</div>',
        '<div id="tabindex-bad" tabindex="bad">text</div>',
        '<div id="tabindex--2" tabindex="-2">text</div>',
        '<div id="tabindex--1" tabindex="-1">text</div>',
        '<div id="tabindex-0" tabindex="0">text</div>',
        '<div id="tabindex-1" tabindex="1">text</div>',
        '<div id="tabindex-2" tabindex="2">text</div>',
        /*eslint-enable indent */
      ]);
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should return null for element without tabindex attribute', function() {
      var element = document.getElementById('tabindex-none');
      var result = tabindexValue(element);
      expect(result).to.equal(null);
    });

    bdd.it('should return {browser-specific} for element with empty tabindex attribute', function() {
      var element = document.getElementById('tabindex-empty');
      var result = tabindexValue(element);
      var expected = supports.focusInvalidTabindex ? -1 : null;
      expect(result).to.equal(expected);
    });

    bdd.it('should return {browser-specific} for element with invalid tabindex attribute', function() {
      var element = document.getElementById('tabindex-bad');
      var result = tabindexValue(element);
      var expected = supports.focusInvalidTabindex ? -1 : null;
      expect(result).to.equal(expected);
    });

    bdd.it('should return -2 for element with tabindex="-2"', function() {
      var element = document.getElementById('tabindex--2');
      var result = tabindexValue(element);
      expect(result).to.equal(-2);
    });

    bdd.it('should return -1 for element with tabindex="-1"', function() {
      var element = document.getElementById('tabindex--1');
      var result = tabindexValue(element);
      expect(result).to.equal(-1);
    });

    bdd.it('should return 0 for element with tabindex="0"', function() {
      var element = document.getElementById('tabindex-0');
      var result = tabindexValue(element);
      expect(result).to.equal(0);
    });

    bdd.it('should return 1 for element with tabindex="1"', function() {
      var element = document.getElementById('tabindex-1');
      var result = tabindexValue(element);
      expect(result).to.equal(1);
    });

    bdd.it('should return 2 for element with tabindex="2"', function() {
      var element = document.getElementById('tabindex-2');
      var result = tabindexValue(element);
      expect(result).to.equal(2);
    });

  });
});
