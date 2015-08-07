define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/get/focus-target',
], function(registerSuite, expect, customFixture, getFocusTarget) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'get/focus-target',

      beforeEach: function() {
        fixture = customFixture([
          /*eslint-disable indent */
          '<a id="self" href="#" data-label="self">',
            '<span data-label="self-wrap"><span data-label="self-inner">nested</span></span>',
          '</a>',
          '<a href="#" data-label="link">',
            '<span data-label="link-wrap"><span id="link" data-label="link-inner">nested</span></span>',
          '</a>',
          '<div tabindex="-1" data-label="nested">',
            '<span tabindex="-1" id="nested" data-label="nested">nested</span>',
          '</div>',
          '<div data-label="none-outer">',
            '<span id="none" data-label="none-inner">nested</span>',
          '</div>',
          /*eslint-enable indent */
        ].join(''));
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      'invalid context': function() {
        expect(function() {
          getFocusTarget();
        }).to.throw(TypeError, 'get/focus-target requires valid options.context');
      },
      'direct target': function() {
        var target = getFocusTarget({
          context: '#self',
        });

        expect(target.getAttribute('data-label')).to.equal('self');
      },
      'nested link': function() {
        var target = getFocusTarget({
          context: '#link',
        });

        expect(target.getAttribute('data-label')).to.equal('link');
      },
      'nested tabindex': function() {
        var target = getFocusTarget({
          context: '#nested',
        });

        expect(target.getAttribute('data-label')).to.equal('nested');
      },
      'none (body)': function() {
        var target = getFocusTarget({
          context: '#none',
        });

        expect(target.nodeName.toLowerCase()).to.equal('body');
      },
    };
  });
});
