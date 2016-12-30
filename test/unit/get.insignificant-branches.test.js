define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var getInsignificantBranches = require('ally/get/insignificant-branches');

  bdd.describe('get/insignificant-branches', function() {
    var fixture;

    bdd.before(function() {
      fixture = customFixture([
        /* eslint-disable indent */
        '<div id="uncle-1">',
          '<div id="cousin-1"></div>',
        '</div>',
        '<div id="parent">',
          '<div id="target"></div>',
          '<div id="sibling"></div>',
        '</div>',
        '<div id="uncle-2">',
          '<div id="cousin-2"></div>',
          '<div id="target-2"></div>',
        '</div>',
        /*eslint-disable indent */
      ]);
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        getInsignificantBranches();
      }).to.throw(TypeError, 'get/insignificant-branches requires valid options.filter');
    });

    bdd.it('should find irrelevant branches', function() {
      var expected = '#uncle-1 #sibling #uncle-2'.split(' ');
      var result = getInsignificantBranches({
        context: fixture.root,
        filter: '#target',
      }).map(fixture.nodeToString);

      expect(result).to.deep.equal(expected);
    });

    bdd.it('should find irrelevant branches for multiple origins', function() {
      var expected = '#uncle-1 #sibling #cousin-2'.split(' ');
      var result = getInsignificantBranches({
        context: fixture.root,
        filter: '#target, #target-2',
      }).map(fixture.nodeToString);

      expect(result).to.deep.equal(expected);
    });
  });
});
