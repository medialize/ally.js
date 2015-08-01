define([
  'intern!object',
  'intern/chai!expect',
  '../helper/function-name',
  'ally/prototype/window.customevent',
], function(registerSuite, expect, getFunctionName) {

  registerSuite(function() {

    return {
      name: 'prototype/window.customevent',

      polyfilled: function() {
        if (getFunctionName(window.CustomEvent) !== 'CustomEventPolyfill') {
          this.skip('CustomEvent supported natively');
        }

        expect(window.CustomEvent).to.be.a('function');
      },
    };
  });
});
