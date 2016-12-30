define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var nodeArray = require('ally/util/node-array');

  bdd.describe('util/node-array', function() {
    var fixture;

    bdd.before(function() {
      fixture = customFixture([
        '<div class="test-foo"></div>',
        '<div class="test-foo"></div>',
        '<div id="test-bar"></div>',
      ]);
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        nodeArray(new Date());
      }).to.throw(TypeError);
    });

    bdd.it('should ignore `undefined`', function() {
      var res = nodeArray(undefined);
      expect(res).to.deep.equal([]);
    });

    bdd.it('should accept arrays', function() {
      var res = nodeArray([123, 234]);
      expect(res).to.deep.equal([123, 234]);
    });

    bdd.it('should accept iterable values', function() {
      var nodes = document.querySelectorAll('.test-foo');
      var list = [].slice.call(nodes, 0);
      var res = nodeArray(nodes);
      expect(res).to.deep.equal(list);
    });

    bdd.it('should accept DOM nodes', function() {
      var node = document.getElementById('test-bar');
      var res = nodeArray(node);
      expect(res).to.deep.equal([node]);
    });

    bdd.it('should resolve CSS query selectors', function() {
      var nodes = [].slice.call(document.querySelectorAll('.test-foo'), 0);
      var res = nodeArray('.test-foo');
      expect(res).to.deep.equal(nodes);
    });
  });
});
