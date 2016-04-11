define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var getParents = require('ally/get/parents');

  registerSuite(function() {
    var fixture;

    return {
      name: 'get/parents',

      beforeEach: function() {
        fixture = customFixture([
          /*eslint-disable indent */
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
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      'invalid context': function() {
        expect(function() {
          getParents();
        }).to.throw(TypeError, 'get/parents requires valid options.context');
      },
      parents: function() {
        var expected = '#target div #intern-dom-fixture body html'.split(' ');
        var target = getParents({
          context: '#target',
        });
        var path = target.map(function(element) {
          return element.id && ('#' + element.id) || element.nodeName.toLowerCase();
        });
        expect(path).to.deep.equal(expected);
      },
      'parents in SVG': function() {
        var expected = '#svg-link-text #svg-link #svg #intern-dom-fixture body html'.split(' ');
        var target = getParents({
          context: '#svg-link-text',
        });
        var path = target.map(function(element) {
          return element.id && ('#' + element.id) || element.nodeName.toLowerCase();
        });
        expect(path).to.deep.equal(expected);
      },
    };
  });
});
