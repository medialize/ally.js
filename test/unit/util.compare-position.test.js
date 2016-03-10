define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/util/compare-position',
], function(registerSuite, expect, customFixture, comparePosition) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'util/compare-position',

      beforeEach: function() {
        fixture = customFixture([
          '<div id="parent"><div id="child"></div></div>',
          '<div id="sibling"></div>',
        ]);
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      invalid: function() {
        expect(function() {
          comparePosition.getParentComparator();
        }).to.throw(TypeError, 'util/compare-position#getParentComparator required either options.parent or options.element');
      },

      'parent comparator': function() {
        var parent = document.getElementById('parent');
        var child = document.getElementById('child');
        var sibling = document.getElementById('sibling');

        var isChild = comparePosition.getParentComparator({
          parent: parent,
        });

        expect(isChild(child)).to.equal(true, 'child');
        expect(isChild(parent)).to.equal(false, 'parent');
        expect(isChild(sibling)).to.equal(false, 'sibling');
      },
      'parent comparator (includeSelf)': function() {
        var parent = document.getElementById('parent');
        var child = document.getElementById('child');
        var sibling = document.getElementById('sibling');

        var isChild = comparePosition.getParentComparator({
          includeSelf: true,
          parent: parent,
        });

        expect(isChild(child)).to.equal(true, 'child');
        expect(isChild(parent)).to.equal(true, 'parent');
        expect(isChild(sibling)).to.equal(false, 'sibling');
      },
      'child comparator': function() {
        var parent = document.getElementById('parent');
        var child = document.getElementById('child');
        var sibling = document.getElementById('sibling');

        var isParent = comparePosition.getParentComparator({
          element: child,
        });

        expect(isParent(child)).to.equal(false, 'child');
        expect(isParent(parent)).to.equal(true, 'parent');
        expect(isParent(sibling)).to.equal(false, 'sibling');
      },
      'child comparator (includeSelf)': function() {
        var parent = document.getElementById('parent');
        var child = document.getElementById('child');
        var sibling = document.getElementById('sibling');

        var isParent = comparePosition.getParentComparator({
          includeSelf: true,
          element: child,
        });

        expect(isParent(child)).to.equal(true, 'child');
        expect(isParent(parent)).to.equal(true, 'parent');
        expect(isParent(sibling)).to.equal(false, 'sibling');
      },
    };
  });
});
