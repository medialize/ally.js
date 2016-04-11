define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var nodeArray = require('ally/util/node-array');

  registerSuite(function() {
    var fixture;

    return {
      name: 'util/node-array',

      beforeEach: function() {
        fixture = customFixture([
          '<div class="test-foo"></div>',
          '<div class="test-foo"></div>',
          '<div id="test-bar"></div>',
        ]);
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      undefined: function() {
        var res = nodeArray(undefined);
        expect(res).to.be.a('array');
        expect(res.length).to.equal(0);
      },
      array: function() {
        var res = nodeArray([123]);
        expect(res).to.be.a('array');
        expect(res.length).to.equal(1);
      },
      node: function() {
        var node = document.getElementById('test-bar');
        var res = nodeArray(node);
        expect(res).to.be.a('array');
        expect(res[0]).to.equal(node);
      },
      string: function() {
        var node = document.querySelectorAll('.test-foo');
        var res = nodeArray('.test-foo');
        expect(res).to.be.a('array');
        expect(res[0]).to.equal(node[0]);
        expect(res[1]).to.equal(node[1]);
      },
      iterable: function() {
        var node = document.querySelectorAll('.test-foo');
        var res = nodeArray(node);
        expect(res).to.be.a('array');
        expect(res[0]).to.equal(node[0]);
        expect(res[1]).to.equal(node[1]);
      },
      invalid: function() {
        expect(function() {
          nodeArray(new Date());
        }).to.throw(TypeError);
      },
    };
  });
});
