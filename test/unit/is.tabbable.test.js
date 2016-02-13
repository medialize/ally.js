define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  '../helper/supports',
  'ally/util/platform',
  'ally/is/focusable',
  'ally/is/tabbable',
], function(registerSuite, expect, focusableFixture, supports, platform, isFocusable, isTabbable) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'is/tabbable',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      invalid: function() {
        expect(function() {
          isTabbable(null);
        }).to.throw(TypeError, 'is/tabbable requires an argument of type Element');
      },
      '.rules() and .except()': function() {
        var element = document.getElementById('tabindex--1');
        expect(isTabbable.rules({
          context: element,
        })).to.equal(false, '.rules()');
        expect(isTabbable.rules.except({})(element)).to.equal(false, '.rules.except()');
      },
      document: function() {
        var _focusable = isFocusable(document);
        var _tabbable = isTabbable(document);
        expect(_focusable && _tabbable).to.equal(false);
      },
      'inert div': function() {
        var element = document.getElementById('inert-div');
        expect(isFocusable(element) && isTabbable(element)).to.equal(false);
      },
      'tabindex="-1"': function() {
        var element = document.getElementById('tabindex--1');
        expect(isFocusable(element) && isTabbable(element)).to.equal(false);
      },
      'tabindex="0"': function() {
        var element = document.getElementById('tabindex-0');
        expect(isFocusable(element) && isTabbable(element)).to.equal(!platform.is.IOS);
      },
      'tabindex="1"': function() {
        var element = document.getElementById('tabindex-1');
        expect(isFocusable(element) && isTabbable(element)).to.equal(!platform.is.IOS);
      },
      'anchor (<a> without href)': function() {
        var element = document.getElementById('anchor');
        expect(isFocusable(element) && isTabbable(element)).to.equal(false);
      },
      link: function() {
        var element = document.getElementById('link');
        expect(isFocusable(element) && isTabbable(element)).to.equal(!platform.is.IOS);
      },
      'link with tabindex="-1"': function() {
        var element = document.getElementById('link-tabindex--1');
        expect(isFocusable(element) && isTabbable(element)).to.equal(false);
      },
      input: function() {
        var element = document.getElementById('input');
        expect(isFocusable(element) && isTabbable(element)).to.equal(true);
      },
      'input with tabindex="-1"': function() {
        var element = document.getElementById('input-tabindex--1');
        expect(isFocusable(element) && isTabbable(element)).to.equal(false);
      },
      'disabled input': function() {
        var element = document.getElementById('input-disabled');
        expect(isFocusable(element) && isTabbable(element)).to.equal(false);
      },
      'input type="hidden"': function() {
        var element = document.getElementById('input-hidden');
        expect(isFocusable(element) && isTabbable(element)).to.equal(false);
      },
      'svg link': function() {
        var element = document.getElementById('svg-link');
        expect(isTabbable(element)).to.equal(supports.svgFocusMethod && !platform.is.IOS);
      },
      'svg link with .except({ onlyTabbable })': function() {
        var element = document.getElementById('svg-link');
        expect(isTabbable.rules({
          context: element,
          except: {
            onlyTabbable: true,
          },
        })).to.equal(!platform.is.IOS);
      },
      'extended: scroll container without overflow': function() {
        var element = document.getElementById('scroll-container-without-overflow');
        expect(isFocusable(element) && isTabbable(element)).to.equal(false);
      },
      'extended: scroll container': function() {
        var element = document.getElementById('scroll-container');
        expect(isFocusable(element) && isTabbable(element)).to.equal(platform.is.GECKO);
      },
      'extended: scroll body': function() {
        var element = document.getElementById('scroll-body');
        expect(isFocusable(element) && isTabbable(element)).to.equal(false);
      },
      'extended: child of focusable flexbox': function() {
        var element = fixture.add([
          /*eslint-disable indent */
          '<div tabindex="-1" style="display: -webkit-flex; display: -ms-flexbox; display: flex;">',
            '<span style="display: block;">hello</span>',
          '</div>',
          /*eslint-enable indent */
        ]).firstElementChild.firstElementChild;
        expect(isFocusable(element) && isTabbable(element)).to.equal(false);
      },
      'extended: flexbox container': function() {
        var element = fixture.add([
          /*eslint-disable indent */
          '<div style="display: -webkit-flex; display: -ms-flexbox; display: flex;">',
            '<span style="display: block;">hello</span>',
          '</div>',
          /*eslint-enable indent */
        ]).firstElementChild;
        expect(isFocusable(element) && isTabbable(element)).to.equal(false);
      },
    };
  });
});
