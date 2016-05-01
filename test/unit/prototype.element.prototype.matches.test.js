define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var getFunctionName = require('../helper/function-name');
  require('ally/prototype/element.prototype.matches');

  bdd.describe('prototype/element.prototype.matches', function() {
    var fixture;

    bdd.before(function() {
      fixture = customFixture([
        '<div id="target"></div>',
      ]);
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should provide Element#matches', function() {
      if (getFunctionName(Element.prototype.matches) === 'matches') {
        this.skip('Element.prototype.matches supported natively');
      }

      var prefixed;
      'webkitMatchesSelector mozMatchesSelector msMatchesSelector'.split(' ').some(function(key) {
        if (Element.prototype[key]) {
          prefixed = key;
          return true;
        }

        return false;
      });

      if (!prefixed) {
        this.skip('Element.prototype.matches is not vendor prefixed');
      }

      var element = document.getElementById('target');
      expect(element.matches).to.be.a('function');
      expect(element.matches('div')).to.equal(true);
      expect(element.matches('body')).to.equal(false);
    });

  });
});
