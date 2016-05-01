define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var comparePosition = require('ally/util/compare-position');

  bdd.describe('util/compare-position', function() {
    var fixture;
    var parent;
    var child;
    var sibling;

    bdd.before(function() {
      fixture = customFixture([
        '<div id="parent"><div id="child"></div></div>',
        '<div id="sibling"></div>',
      ]);

      parent = document.getElementById('parent');
      child = document.getElementById('child');
      sibling = document.getElementById('sibling');
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        comparePosition.getParentComparator();
      }).to.throw(TypeError, 'util/compare-position#getParentComparator required either options.parent or options.element');
    });

    bdd.describe('comparePosition.getParentComparator()', function() {
      bdd.it('should match descendants', function() {
        var isChild = comparePosition.getParentComparator({
          parent: parent,
        });

        expect(isChild(child)).to.equal(true, 'child');
        expect(isChild(parent)).to.equal(false, 'parent');
        expect(isChild(sibling)).to.equal(false, 'sibling');
      });

      bdd.it('should match descendants descendants and itself', function() {
        var isChild = comparePosition.getParentComparator({
          includeSelf: true,
          parent: parent,
        });

        expect(isChild(child)).to.equal(true, 'child');
        expect(isChild(parent)).to.equal(true, 'parent');
        expect(isChild(sibling)).to.equal(false, 'sibling');
      });
    });

    bdd.describe('comparePosition.getChildComparator()', function() {
      bdd.it('should match ancestors', function() {
        var isParent = comparePosition.getParentComparator({
          element: child,
        });

        expect(isParent(child)).to.equal(false, 'child');
        expect(isParent(parent)).to.equal(true, 'parent');
        expect(isParent(sibling)).to.equal(false, 'sibling');
      });

      bdd.it('should match ancestors descendants and itself', function() {
        var isParent = comparePosition.getParentComparator({
          includeSelf: true,
          element: child,
        });

        expect(isParent(child)).to.equal(true, 'child');
        expect(isParent(parent)).to.equal(true, 'parent');
        expect(isParent(sibling)).to.equal(false, 'sibling');
      });
    });

  });
});
