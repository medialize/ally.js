define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var getFunctionName = require('../helper/function-name');
  var CustomEvent = require('ally/prototype/window.customevent');

  bdd.describe('prototype/window.customevent', function() {

    bdd.it('should provide window.CustomEvent', function() {
      if (getFunctionName(CustomEvent) !== 'CustomEventPolyfill') {
        this.skip('CustomEvent supported natively');
      }

      expect(CustomEvent).to.be.a('function');
    });

  });
});
