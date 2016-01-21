define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  '../helper/supports',
  'ally/is/focusable',
], function(
  registerSuite,
  expect,
  focusableFixture,
  supports,
  isFocusable
) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'is/focusable',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      invalid: function() {
        expect(function() {
          isFocusable(null);
        }).to.throw(TypeError, 'is/focusable requires an argument of type Element');
      },
      '.rules() and .except()': function() {
        var element = document.getElementById('inert-div');
        expect(isFocusable.rules({
          context: element,
        })).to.equal(false, '.rules()');
        expect(isFocusable.rules.except({})(element)).to.equal(false, '.rules.except()');
      },
      'inert div': function() {
        var element = document.getElementById('inert-div');
        expect(isFocusable(element)).to.equal(false);
      },
      'tabindex="-1"': function() {
        var element = document.getElementById('tabindex--1');
        expect(isFocusable(element)).to.equal(true);
      },
      'tabindex="0"': function() {
        var element = document.getElementById('tabindex-0');
        expect(isFocusable(element)).to.equal(true);
      },
      'tabindex="1"': function() {
        var element = document.getElementById('tabindex-1');
        expect(isFocusable(element)).to.equal(true);
      },
      'tabindex="bad"': function() {
        var element = document.getElementById('tabindex-bad');
        expect(isFocusable(element)).to.equal(supports.canFocusInvalidTabindex);
      },
      'anchor (<a> without href)': function() {
        var element = document.getElementById('anchor');
        expect(isFocusable(element)).to.equal(false);
      },
      link: function() {
        var element = document.getElementById('link');
        expect(isFocusable(element)).to.equal(true);
      },
      'link with tabindex="-1"': function() {
        var element = document.getElementById('link-tabindex--1');
        expect(isFocusable(element)).to.equal(true);
      },
      input: function() {
        var element = document.getElementById('input');
        expect(isFocusable(element)).to.equal(true);
      },
      'input with tabindex="-1"': function() {
        var element = document.getElementById('input-tabindex--1');
        expect(isFocusable(element)).to.equal(true);
      },
      'disabled input': function() {
        var element = document.getElementById('input-disabled');
        expect(isFocusable(element)).to.equal(false);
      },
      'input in disabled fieldset': function() {
        var element = document.getElementById('fieldset-disabled-input');
        expect(isFocusable(element)).to.equal(false);
      },
      'input type="hidden"': function() {
        var element = document.getElementById('input-hidden');
        expect(isFocusable(element)).to.equal(false);
      },
      'contenteditable attribute': function() {
        var element = document.getElementById('span-contenteditable');
        expect(isFocusable(element)).to.equal(true);
      },
      'img with usemap': function() {
        var element = document.getElementById('img-usemap');
        expect(isFocusable(element)).to.equal(false);
      },
      'img with usemap and tabindex': function() {
        var element = document.getElementById('img-usemap');
        element.setAttribute('tabindex', '-1');
        expect(isFocusable(element)).to.equal(supports.canFocusImgUsemapTabindex);
      },
      'label element': function() {
        var element = document.getElementById('label');
        expect(isFocusable(element)).to.equal(false);
      },
      'label element with tabindex="-1"': function() {
        var element = document.getElementById('label');
        element.setAttribute('tabindex', '-1');
        expect(isFocusable(element)).to.equal(supports.canFocusLabelTabindex);
      },
      'audio element': function() {
        var element = document.getElementById('audio');
        expect(isFocusable(element)).to.equal(supports.canFocusAudioWithoutControls);
      },
      'audio element with controls': function() {
        var element = document.getElementById('audio-controls');
        expect(isFocusable(element)).to.equal(true);
      },
      'svg link': function() {
        var element = document.getElementById('svg-link');
        expect(isFocusable(element)).to.equal(supports.svgFocusMethod);
      },
      'svg link with .except({ onlyTabbable })': function() {
        var element = document.getElementById('svg-link');
        expect(isFocusable.rules({
          context: element,
          except: {
            onlyTabbable: true,
          },
        })).to.equal(true);
      },
      'extended: CSS user-modify': function() {
        var _supports = document.body.style.webkitUserModify !== undefined;
        var element = document.getElementById('span-user-modify');
        expect(isFocusable(element)).to.equal(_supports);
      },
      'extended: img with ismap attribute': function() {
        var element = document.getElementById('img-ismap');
        expect(isFocusable(element)).to.equal(supports.canFocusImgIsmap);
      },
      'extended: scroll container without overflow': function() {
        var element = document.getElementById('scroll-container-without-overflow');
        expect(isFocusable(element)).to.equal(supports.canFocusScrollContainerWithoutOverflow);
      },
      'extended: scroll container': function() {
        var element = document.getElementById('scroll-container');
        expect(isFocusable(element)).to.equal(supports.canFocusScrollContainer);
      },
      'extended: scroll body': function() {
        var element = document.getElementById('scroll-body');
        expect(isFocusable(element)).to.equal(supports.canFocusScrollBody);
      },
      'extended: child of focusable flexbox': function() {
        var element = fixture.add([
          /*eslint-disable indent */
          '<div tabindex="-1" style="display: -webkit-flex; display: -ms-flexbox; display: flex;">',
            '<span style="display: block;">hello</span>',
          '</div>',
          /*eslint-enable indent */
        ]).firstElementChild.firstElementChild;
        expect(isFocusable(element)).to.equal(supports.canFocusChildrenOfFocusableFlexbox);
      },
      'extended: Shadow DOM host': function() {
        if (document.body.createShadowRoot === undefined) {
          this.skip('Shadow DOM not supported');
        }

        var element = fixture.add([
          /*eslint-disable indent */
          '<div></div>',
          /*eslint-enable indent */
        ]).firstElementChild;
        var root = element.createShadowRoot();
        root.innerHTML = '<input>';

        expect(isFocusable(element)).to.equal(false);
      },
      'extended: Shadow DOM host with tabindex': function() {
        if (document.body.createShadowRoot === undefined) {
          this.skip('Shadow DOM not supported');
        }

        var element = fixture.add([
          /*eslint-disable indent */
          '<div tabindex="-1"></div>',
          /*eslint-enable indent */
        ]).firstElementChild;
        var root = element.createShadowRoot();
        root.innerHTML = '<input>';

        expect(isFocusable(element)).to.equal(true);
      },
    };
  });
});
