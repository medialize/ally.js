define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var mergeDomOrder = require('ally/util/merge-dom-order');
  var sortDomOrder = require('ally/util/sort-dom-order');

  bdd.describe('util/merge-dom-order', function() {
    var fixture;

    var splitList = function(list) {
      var extracted = [];
      var nodes = list.filter(function(element, index) {
        if ((index % 2) === 0) {
          return true;
        }

        extracted.push(element);
        return false;
      });

      return {
        nodes: nodes,
        // mess up the ordering to make things more interesting
        extracted: extracted.reverse(),
      };
    };

    bdd.beforeEach(function() {
      fixture = customFixture([
        '<div data-label="1"></div>',
        '<div data-label="2"></div>',
        '<div data-label="3"></div>',
        '<div data-label="4"></div>',
        '<div data-label="5"></div>',
        '<div data-label="6"></div>',
        '<div data-label="7"></div>',
      ]);
    });

    bdd.afterEach(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should merge two arrays of elements in dom order', function() {
      var source = [].slice.call(fixture.root.children, 0);
      var data = splitList(source);

      expect(data.nodes.length).to.not.equal(source.length, 'nodes list');
      expect(data.extracted.length).to.not.equal(source.length, 'extracted list');

      var expected = '1 2 3 4 5 6 7'.split(' ');
      var result = mergeDomOrder({
        list: data.nodes,
        elements: data.extracted,
      }).map(fixture.nodeToString);

      expect(result).to.deep.equal(expected, 'merged in dom order');
    });

    bdd.it('should merge two arrays of elements in dom order if both arrays are out of order', function() {
      var source = [].slice.call(fixture.root.children, 0);
      var data = splitList(source);

      expect(data.nodes.length).to.not.equal(source.length, 'nodes list');
      expect(data.extracted.length).to.not.equal(source.length, 'extracted list');

      var expected = '1 2 3 4 5 6 7'.split(' ');
      var result = mergeDomOrder({
        list: sortDomOrder(data.extracted),
        elements: sortDomOrder(data.nodes).reverse(),
      }).map(fixture.nodeToString);

      expect(result).to.deep.equal(expected, 'merged in dom order');
    });

    bdd.it('should allow to resolve elements after insertion point was identified', function() {
      var source = [].slice.call(fixture.root.children, 0);
      var data = splitList(source);

      expect(data.nodes.length).to.not.equal(source.length, 'nodes list');
      expect(data.extracted.length).to.not.equal(source.length, 'extracted list');

      var expected = '1 #2 3 #4 5 #6 7'.split(' ');
      var result = mergeDomOrder({
        list: data.nodes,
        elements: data.extracted,
        resolveElement: function(element) {
          var label = element.getAttribute('data-label');
          element.setAttribute('data-label', '#' + label);
          return element;
        },
      }).map(fixture.nodeToString);

      expect(result).to.deep.equal(expected, 'merged in dom order');
    });

    bdd.it('should allow to replace elements after insertion point was identified', function() {
      var source = [].slice.call(fixture.root.children, 0);
      var data = splitList(source);

      expect(data.nodes.length).to.not.equal(source.length, 'nodes list');
      expect(data.extracted.length).to.not.equal(source.length, 'extracted list');

      var expected = '1 #2 @2 3 #4 @4 5 #6 @6 7'.split(' ');
      var result = mergeDomOrder({
        list: data.nodes,
        elements: data.extracted,
        resolveElement: function(element) {
          var label = element.getAttribute('data-label');
          element.setAttribute('data-label', '#' + label);
          var sibling = document.createElement('div');
          sibling.setAttribute('data-label', '@' + label);
          return [element, sibling];
        },
      }).map(fixture.nodeToString);

      expect(result).to.deep.equal(expected, 'merged in dom order');
    });

    bdd.it('should allow to skip elements after insertion point was identified', function() {
      var source = [].slice.call(fixture.root.children, 0);
      var data = splitList(source);

      expect(data.nodes.length).to.not.equal(source.length, 'nodes list');
      expect(data.extracted.length).to.not.equal(source.length, 'extracted list');

      var expected = '1 2 3 5 7'.split(' ');
      var result = mergeDomOrder({
        list: data.nodes,
        elements: data.extracted,
        resolveElement: function(element) {
          var label = parseInt(element.getAttribute('data-label'));
          if (label > 2) {
            return null;
          }

          return element;
        },
      }).map(fixture.nodeToString);

      expect(result).to.deep.equal(expected, 'merged in dom order');
    });
  });
});
