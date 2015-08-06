define([
  'intern!object',
  'intern/chai!expect',
  '../helper/function-name',
  'ally/prototype/window.customevent',
], function(registerSuite, expect, getFunctionName, CustomEvent) {

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
