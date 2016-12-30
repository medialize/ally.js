define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var getParents = require('ally/get/parents');

  bdd.describe('get/parents', function() {
    var fixture;

    bdd.before(function() {
      fixture = customFixture([
        /* eslint-disable indent */
        '<div>',
          '<span id="target">target</span>',
        '</div>',
        '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="svg">',
          '<a xlink:href="#void" id="svg-link">',
            '<text x="10" y="20" id="svg-link-text">text</text>',
          '</a>',
        '</svg>',
        /*eslint-disable indent */
      ]);
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        getParents();
      }).to.throw(TypeError, 'get/parents requires valid options.context');
    });

    bdd.it('should find ancestry', function() {
      var expected = '#target div #intern-dom-fixture body html'.split(' ');
      var result = getParents({
        context: '#target',
      }).map(fixture.nodeToString);

      expect(result).to.deep.equal(expected);
    });

    bdd.it('should find ancestry in SVG', function() {
      var expected = '#svg-link-text #svg-link #svg #intern-dom-fixture body html'.split(' ');
      var result = getParents({
        context: '#svg-link-text',
      }).map(fixture.nodeToString);

      expect(result).to.deep.equal(expected);
    });
  });
});
