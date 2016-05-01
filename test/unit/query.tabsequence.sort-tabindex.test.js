define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var sortTabindex = require('ally/query/tabsequence.sort-tabindex');

  bdd.describe('query/tabsequence.sort-tabindex', function() {
    var fixture;

    bdd.before(function() {
      fixture = customFixture([
        '<input type="text" data-label="5">',
        '<div tabindex="2" data-label="2"></div>',
        '<div tabindex="-1" data-label="6"></div>',
        '<div tabindex="0" data-label="7"></div>',
        '<div tabindex="3" data-label="3"></div>',
        '<div tabindex="3" data-label="4"></div>',
        '<div tabindex="1" data-label="1"></div>',
      ]);
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should sort by value of tabindex attribute', function() {
      var expected = '1 2 3 4 5 6 7'.split(' ');
      var nodes = [].slice.call(fixture.root.children, 0);
      var res = sortTabindex(nodes);
      var sequence = res.map(function(element) {
        return element.getAttribute('data-label');
      });
      expect(sequence).to.deep.equal(expected);
    });

  });
});
