define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var supports = require('../helper/supports');
  var tabindexValue = require('ally/util/tabindex-value');

  registerSuite(function() {
    var fixture;

    return {
      name: 'util/tabindex-value',

      beforeEach: function() {
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
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },
      'no tabindex': function() {
        var element = document.getElementById('tabindex-none');
        expect(tabindexValue(element)).to.equal(null);
      },
      'tabindex=""': function() {
        var element = document.getElementById('tabindex-empty');
        expect(tabindexValue(element)).to.equal(supports.focusInvalidTabindex ? -1 : null);
      },
      'tabindex="bad"': function() {
        var element = document.getElementById('tabindex-bad');
        expect(tabindexValue(element)).to.equal(supports.focusInvalidTabindex ? -1 : null);
      },
      'tabindex="-2"': function() {
        var element = document.getElementById('tabindex--2');
        expect(tabindexValue(element)).to.equal(-2);
      },
      'tabindex="-1"': function() {
        var element = document.getElementById('tabindex--1');
        expect(tabindexValue(element)).to.equal(-1);
      },
      'tabindex="0"': function() {
        var element = document.getElementById('tabindex-0');
        expect(tabindexValue(element)).to.equal(0);
      },
      'tabindex="1"': function() {
        var element = document.getElementById('tabindex-1');
        expect(tabindexValue(element)).to.equal(1);
      },
      'tabindex="2"': function() {
        var element = document.getElementById('tabindex-2');
        expect(tabindexValue(element)).to.equal(2);
      },
    };
  });
});
