define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var sortTabindex = require('ally/query/tabsequence.sort-tabindex');

  registerSuite(function() {
    var fixture;

    return {
      name: 'query/tabsequence.sort-tabindex',

      beforeEach: function() {
        fixture = customFixture([
          '<input type="text" data-label="5">',
          '<div tabindex="2" data-label="2"></div>',
          '<div tabindex="-1" data-label="6"></div>',
          '<div tabindex="0" data-label="7"></div>',
          '<div tabindex="3" data-label="3"></div>',
          '<div tabindex="3" data-label="4"></div>',
          '<div tabindex="1" data-label="1"></div>',
        ]);
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      sort: function() {
        var expected = '1 2 3 4 5 6 7'.split(' ');
        var nodes = [].slice.call(fixture.root.children, 0);
        var res = sortTabindex(nodes);
        var sequence = res.map(function(element) {
          return element.getAttribute('data-label');
        });
        expect(sequence).to.deep.equal(expected);
      },
    };
  });
});
