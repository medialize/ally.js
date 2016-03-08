define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  '../helper/supports',
  'ally/is/focus-relevant',
], function(
  registerSuite,
  expect,
  focusableFixture,
  supports,
  isFocusRelevant
) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'is/focus-relevant',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      invalid: function() {
        expect(function() {
          isFocusRelevant(null);
        }).to.throw(TypeError, 'is/focus-relevant requires valid options.context');
        expect(function() {
          isFocusRelevant([true]);
        }).to.throw(TypeError, 'is/focus-relevant requires options.context to be an Element');
      },
      '.rules() and .except()': function() {
        var element = document.getElementById('inert-div');
        expect(isFocusRelevant.rules({
          context: element,
        })).to.equal(false, '.rules()');
        expect(isFocusRelevant.rules.except({})(element)).to.equal(false, '.rules.except()');
      },
      'inert div': function() {
        var element = document.getElementById('inert-div');
        expect(isFocusRelevant(element)).to.equal(false);
      },
      'tabindex="-1"': function() {
        var element = document.getElementById('tabindex--1');
        expect(isFocusRelevant(element)).to.equal(true);
      },
      'tabindex="0"': function() {
        var element = document.getElementById('tabindex-0');
        expect(isFocusRelevant(element)).to.equal(true);
      },
      'tabindex="1"': function() {
        var element = document.getElementById('tabindex-1');
        expect(isFocusRelevant(element)).to.equal(true);
      },
      'tabindex="bad"': function() {
        var element = document.getElementById('tabindex-bad');
        expect(isFocusRelevant(element)).to.equal(supports.canFocusInvalidTabindex);
      },
      'anchor (<a> without href)': function() {
        var element = document.getElementById('anchor');
        expect(isFocusRelevant(element)).to.equal(false);
      },
      link: function() {
        var element = document.getElementById('link');
        expect(isFocusRelevant(element)).to.equal(true);
      },
      'link with tabindex="-1"': function() {
        var element = document.getElementById('link-tabindex--1');
        expect(isFocusRelevant(element)).to.equal(true);
      },
      input: function() {
        var element = document.getElementById('input');
        expect(isFocusRelevant(element)).to.equal(true);
      },
      'input with tabindex="-1"': function() {
        var element = document.getElementById('input-tabindex--1');
        expect(isFocusRelevant(element)).to.equal(true);
      },
      'disabled input': function() {
        var element = document.getElementById('input-disabled');
        expect(isFocusRelevant(element)).to.equal(true);
      },
      'input in disabled fieldset': function() {
        var element = document.getElementById('fieldset-disabled-input');
        expect(isFocusRelevant(element)).to.equal(true);
      },
      'input type="hidden"': function() {
        var element = document.getElementById('input-hidden');
        expect(isFocusRelevant(element)).to.equal(false);
      },
      'contenteditable attribute': function() {
        var element = document.getElementById('span-contenteditable');
        expect(isFocusRelevant(element)).to.equal(true);
      },
      'img with usemap': function() {
        var element = document.getElementById('img-usemap');
        expect(isFocusRelevant(element)).to.equal(supports.canFocusRedirectImgUsemap);
      },
      'img with usemap and tabindex': function() {
        var element = document.getElementById('img-usemap');
        element.setAttribute('tabindex', '-1');
        expect(isFocusRelevant(element)).to.equal(supports.canFocusRedirectImgUsemap || supports.canFocusImgUsemapTabindex);
      },
      'object element referencing svg': function() {
        var element = document.getElementById('object-svg');
        expect(isFocusRelevant(element)).to.equal(supports.canFocusObjectSvg);
      },
      'object element with tabindex="-1" referencing svg': function() {
        var element = document.getElementById('object-tabindex-svg');
        expect(isFocusRelevant(element)).to.equal(supports.canFocusObjectSvg);
      },
      'area element': function() {
        var deferred = this.async(10000);

        var element = document.getElementById('image-map-area');

        // NOTE: Firefox decodes DataURIs asynchronously
        setTimeout(deferred.callback(function() {
          expect(isFocusRelevant(element)).to.equal(true);
        }), 200);
      },
      'area element with tabindex="-1"': function() {
        var deferred = this.async(10000);

        var element = document.getElementById('image-map-area');
        element.setAttribute('tabindex', '-1');

        // NOTE: Firefox decodes DataURIs asynchronously
        setTimeout(deferred.callback(function() {
          expect(isFocusRelevant(element)).to.equal(true);
        }), 200);
      },
      'label element': function() {
        var element = document.getElementById('label');
        expect(isFocusRelevant(element)).to.equal(true);
      },
      'label element with tabindex="-1"': function() {
        var element = document.getElementById('label');
        element.setAttribute('tabindex', '-1');
        expect(isFocusRelevant(element)).to.equal(true);
      },
      'audio element': function() {
        var element = document.getElementById('audio');
        expect(isFocusRelevant(element)).to.equal(supports.canFocusAudioWithoutControls);
      },
      'audio element with controls': function() {
        var element = document.getElementById('audio-controls');
        expect(isFocusRelevant(element)).to.equal(true);
      },
      'svg element': function() {
        var element = document.getElementById('svg');
        expect(isFocusRelevant(element)).to.equal(supports.canFocusSvg);
      },
      'svg element with tabindex="-1"': function() {
        var element = document.getElementById('svg');
        element.setAttribute('tabindex', '-1');
        expect(isFocusRelevant(element)).to.equal(supports.canFocusSvg || supports.canFocusSvgTabindexAttribute);
      },
      'svg link element': function() {
        var element = document.getElementById('svg-link');
        expect(isFocusRelevant(element)).to.equal(true);
      },
      'embed element': function() {
        var element = document.getElementById('embed');
        if (!element) {
          this.skip('skipping to avoid test colliding with QuickTime');
        }

        expect(isFocusRelevant(element)).to.equal(true);
      },
      'embed element with tabindex="0"': function() {
        var element = document.getElementById('embed-tabindex-0');
        if (!element) {
          this.skip('skipping to avoid test colliding with QuickTime');
        }

        expect(isFocusRelevant(element)).to.equal(true);
      },
      'extended: CSS user-modify': function() {
        var _supports = document.body.style.webkitUserModify !== undefined;
        var element = document.getElementById('span-user-modify');
        expect(isFocusRelevant(element)).to.equal(_supports);
      },
      'extended: img with ismap attribute': function() {
        var element = document.getElementById('img-ismap');
        expect(isFocusRelevant(element)).to.equal(supports.canFocusImgIsmap);
      },
      'extended: scroll container without overflow': function() {
        var element = document.getElementById('scroll-container-without-overflow');
        expect(isFocusRelevant(element)).to.equal(supports.canFocusScrollContainerWithoutOverflow);
      },
      'extended: scroll container': function() {
        var element = document.getElementById('scroll-container');
        expect(isFocusRelevant(element)).to.equal(supports.canFocusScrollContainer);
      },
      'extended: child of focusable flexbox': function() {
        var element = fixture.add([
          /*eslint-disable indent */
          '<div tabindex="-1" style="display: -webkit-flex; display: -ms-flexbox; display: flex;">',
            '<span style="display: block;">hello</span>',
          '</div>',
          /*eslint-enable indent */
        ]).firstElementChild.firstElementChild;
        expect(isFocusRelevant(element)).to.equal(supports.canFocusChildrenOfFocusableFlexbox);
      },
      'extended: flexbox container': function() {
        var element = fixture.add([
          /*eslint-disable indent */
          '<div style="display: -webkit-flex; display: -ms-flexbox; display: flex;">',
            '<span style="display: block;">hello</span>',
          '</div>',
          /*eslint-enable indent */
        ]).firstElementChild;
        expect(isFocusRelevant(element)).to.equal(supports.canFocusFlexboxContainer);
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

        expect(isFocusRelevant(element)).to.equal(true);
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

        expect(isFocusRelevant(element)).to.equal(true);
      },
    };
  });
});
