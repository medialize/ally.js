define([
  'intern!object',
  'intern/chai!expect',
  'ally/prototype/svgelement.prototype.focus',
], function(registerSuite, expect) {

  registerSuite(function() {

    return {
      name: 'prototype/svgelement.prototype.focus',

      linked: function() {
        if (Element.prototype.focus === SVGElement.prototype.focus) {
          this.skip('inherited from Element.prototype.focus');
        }
        if (HTMLElement.prototype.focus !== SVGElement.prototype.focus) {
          this.skip('not copied from HTMLElement.prototype.focus');
        }

        expect(SVGElement.prototype.focus).to.be.a('function');
      },
      wrapped: function() {
        if (SVGElement.prototype.focus._polyfill !== 'noop') {
          this.skip('SVGElement.prototype.focus supported');
        }

        expect(SVGElement.prototype.focus).to.be.a('function');
      },
    };
  });
});
