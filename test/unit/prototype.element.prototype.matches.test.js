define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  '../helper/function-name',
  'ally/prototype/element.prototype.matches',
], function(registerSuite, expect, customFixture, getFunctionName) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'prototype/element.prototype.matches',

      beforeEach: function() {
        fixture = customFixture([
          '<div id="target"></div>',
        ]);
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      prefixed: function() {
        if (getFunctionName(Element.prototype.matches) === 'matches') {
          this.skip('Element.prototype.matches supported natively');
        }

        var prefixed;
        'webkitMatchesSelector mozMatchesSelector msMatchesSelector'.split(' ').some(function(key) {
          if (Element.prototype[key]) {
            prefixed = key;
            return true;
          }
        });

        if (!prefixed) {
          this.skip('Element.prototype.matches is not vendor prefixed');
        }

        var element = document.getElementById('target');
        expect(element.matches).to.be.a('function');
        expect(element.matches('div')).to.equal(true);
        expect(element.matches('body')).to.equal(false);
      },
    };
  });
});
