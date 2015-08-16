define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  '../helper/supports',
  'platform',
  'ally/is/only-tabbable',
], function(
  registerSuite,
  expect,
  focusableFixture,
  supports,
  platform,
  isOnlyTabbable
) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'is/only-tabbable',

      beforeEach: function() {
        fixture = focusableFixture();
        fixture.add([
          /*eslint-disable indent */
          '<label tabindex="0" id="label-tabindex-0">text</label>',
          '<label tabindex="-1" id="label-tabindex--1">text</label>',
          '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="svg">',
            '<a xlink:href="#void" id="svg-link">',
              '<text x="10" y="20" id="svg-link-text">text</text>',
            '</a>',
          '</svg>',
          /*eslint-enable indent */
        ].join(''), 'svg-container');
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      invalid: function() {
        expect(function() {
          isOnlyTabbable(null);
        }).to.throw(TypeError, 'is/only-tabbable requires an argument of type Element');
      },

      'label with tabindex="-1"': function() {
        var element = document.getElementById('label-tabindex--1');
        expect(isOnlyTabbable(element)).to.equal(false);
      },
      'label with tabindex="0"': function() {
        var element = document.getElementById('label-tabindex-0');
        expect(isOnlyTabbable(element)).to.equal(platform.name === 'Firefox');
      },
      'object element holding svg': function() {
        var element = document.getElementById('object-svg');
        expect(isOnlyTabbable(element)).to.equal(platform.name === 'IE');
      },
      'svg element': function() {
        var element = document.getElementById('svg');
        expect(isOnlyTabbable(element)).to.equal(platform.name === 'IE');
      },
      'svg link element': function() {
        var element = document.getElementById('svg-link');
        expect(isOnlyTabbable(element)).to.equal(platform.name === 'IE' || platform.name === 'Firefox');
      },
      'inert div': function() {
        var element = document.getElementById('inert-div');
        expect(isOnlyTabbable(element)).to.equal(false);
      },
      'tabindex="-1"': function() {
        var element = document.getElementById('tabindex--1');
        expect(isOnlyTabbable(element)).to.equal(false);
      },
      'tabindex="0"': function() {
        var element = document.getElementById('tabindex-0');
        expect(isOnlyTabbable(element)).to.equal(false);
      },
      'tabindex="1"': function() {
        var element = document.getElementById('tabindex-1');
        expect(isOnlyTabbable(element)).to.equal(false);
      },
    };
  });
});
