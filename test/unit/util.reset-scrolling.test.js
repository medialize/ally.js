define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var resetScrolling = require('ally/util/reset-scrolling');

  bdd.describe('util/reset-scrolling', function() {
    var fixture;

    bdd.before(function() {
      fixture = customFixture([
        /*eslint-disable indent */
        '<div style="height: 100px; width: 100px; overflow: auto;">',
          '<div style="height: 200px; width: 200px;">spacer</div>',
          '<div style="height: 100px; overflow: auto;">',
            '<div style="height: 200px;">spacer</div>',
            '<div id="target">target</div>',
          '</div>',
        '</div>',
        /*eslint-enable indent */
      ]);
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should reset scroll positions', function() {
      var target = document.getElementById('target');
      var inner = target.parentNode;
      var outer = inner.parentNode;

      outer.scrollLeft = 50;

      var _reset = resetScrolling(target);

      outer.scrollTop = 150;
      inner.scrollLeft = 80;
      inner.scrollTop = 100;

      _reset();

      expect(outer.scrollTop).to.equal(0, 'outer.scrollTop');
      expect(outer.scrollLeft).to.equal(50, 'outer.scrollLeft');
      expect(inner.scrollTop).to.equal(0, 'inner.scrollTop');
      expect(inner.scrollLeft).to.equal(0, 'inner.scrollTop');
    });


  });
});
