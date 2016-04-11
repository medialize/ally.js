define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var getFunctionName = require('../helper/function-name');
  var CustomEvent = require('ally/prototype/window.customevent');

  registerSuite(function() {

    return {
      name: 'prototype/window.customevent',

      polyfilled: function() {
        if (getFunctionName(CustomEvent) !== 'CustomEventPolyfill') {
          this.skip('CustomEvent supported natively');
        }

        expect(CustomEvent).to.be.a('function');
      },
    };
  });
});
