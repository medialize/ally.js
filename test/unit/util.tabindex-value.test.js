define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  '../helper/supports',
  'ally/util/tabindex-value',
], function(registerSuite, expect, customFixture, supports, tabindexValue) {

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
        ].join(''));
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
        expect(tabindexValue(element)).to.equal(supports.allowsInvalidTabindexValue ? -1 : null);
      },
      'tabindex="bad"': function() {
        var element = document.getElementById('tabindex-bad');
        expect(tabindexValue(element)).to.equal(supports.allowsInvalidTabindexValue ? -1 : null);
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
