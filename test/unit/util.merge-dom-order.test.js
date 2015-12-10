define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/util/merge-dom-order',
  'ally/util/sort-dom-order',
], function(registerSuite, expect, customFixture, mergeDomOrder, sortDomOrder) {

  registerSuite(function() {
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

    return {
      name: 'util/merge-dom-order',

      beforeEach: function() {
        fixture = customFixture([
          '<div data-label="1"></div>',
          '<div data-label="2"></div>',
          '<div data-label="3"></div>',
          '<div data-label="4"></div>',
          '<div data-label="5"></div>',
          '<div data-label="6"></div>',
          '<div data-label="7"></div>',
        ]);
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      simple: function() {
        var source = [].slice.call(fixture.root.children, 0);
        var data = splitList(source);
        expect(data.nodes.length).to.not.equal(source.length, 'nodes list');
        expect(data.extracted.length).to.not.equal(source.length, 'extracted list');

        var expected = '1 2 3 4 5 6 7'.split(' ');
        var result = mergeDomOrder({
          list: data.nodes,
          elements: data.extracted,
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      },
      inverse: function() {
        var source = [].slice.call(fixture.root.children, 0);
        var data = splitList(source);
        expect(data.nodes.length).to.not.equal(source.length, 'nodes list');
        expect(data.extracted.length).to.not.equal(source.length, 'extracted list');

        var expected = '1 2 3 4 5 6 7'.split(' ');
        var result = mergeDomOrder({
          list: sortDomOrder(data.extracted),
          elements: sortDomOrder(data.nodes).reverse(),
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      },
      resolve: function() {
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

        expect(result).to.deep.equal(expected);
      },
      multiple: function() {
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

        expect(result).to.deep.equal(expected);
      },
      replace: function() {
        var source = [].slice.call(fixture.root.children, 0);
        var data = splitList(source);
        expect(data.nodes.length).to.not.equal(source.length, 'nodes list');
        expect(data.extracted.length).to.not.equal(source.length, 'extracted list');

        var expected = '1 #2 @2 3 #4 @4 5 #6 @6 7'.split(' ');
        var result = mergeDomOrder({
          list: source,
          elements: data.extracted,
          resolveElement: function(element) {
            var label = element.getAttribute('data-label');
            element.setAttribute('data-label', '#' + label);
            var sibling = document.createElement('div');
            sibling.setAttribute('data-label', '@' + label);
            return [element, sibling];
          },
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      },
    };
  });
});
