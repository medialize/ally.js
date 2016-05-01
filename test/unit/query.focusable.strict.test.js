define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var focusableFixture = require('../helper/fixtures/focusable.fixture');
  var shadowInputFixture = require('../helper/fixtures/shadow-input.fixture');
  var supports = require('../helper/supports');
  var platform = require('ally/util/platform');
  var queryFocusable = require('ally/query/focusable');

  bdd.describe('query/focusable.strict', function() {
    var fixture;

    bdd.beforeEach(function() {
      var deferred = this.async(10000);
      fixture = focusableFixture();
      // NOTE: Firefox decodes DataURIs asynchronously
      setTimeout(deferred.resolve, 200);
    });

    bdd.afterEach(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should search within given context', function() {
      var expected = [
        '#link',
        '#link-tabindex--1',
      ];

      var result = queryFocusable({
        strategy: 'strict',
        context: '.context',
      }).map(fixture.nodeToString);

      expect(result).to.deep.equal(expected);
    });

    bdd.describe('for option includeOnlyTabbable', function() {
      bdd.it('should find elements which are either focusable or onlyTabbable', function() {
        var result = queryFocusable({
          includeOnlyTabbable: true,
          strategy: 'strict',
        }).map(fixture.nodeToString);

        var expected = [
          '#tabindex--1',
          '#tabindex-0',
          '#tabindex-1',
          supports.focusInvalidTabindex && '#tabindex-bad',
          '#link',
          '#link-tabindex--1',
          '#image-map-area',
          supports.focusAreaWithoutHref && '#image-map-area-nolink',
          supports.focusObjectSvg && '#object-svg',
          supports.focusObjectSvg && '#object-tabindex-svg',
          platform.is.TRIDENT && '#svg',
          '#svg-link',
          supports.focusAudioWithoutControls && '#audio',
          '#audio-controls',
          '#input',
          '#input-tabindex--1',
          '#span-contenteditable',
          document.body.style.webkitUserModify !== undefined && '#span-user-modify',
          '#img-ismap-link',
          supports.focusImgIsmap && '#img-ismap',
          supports.focusScrollContainer && '#scroll-container',
          supports.focusScrollBody && '#scroll-body',
          supports.focusScrollContainerWithoutOverflow && '#scroll-container-without-overflow',
          supports.focusScrollContainerWithoutOverflow && '#scroll-body-without-overflow',
          supports.focusScrollContainer && '#div-section-overflow-scroll',
          supports.focusScrollContainer && !supports.focusScrollBody && '#section-div-overflow-scroll',
          supports.focusScrollBody && '#section-div-overflow-scroll-body',
          supports.focusFlexboxContainer && '#flexbox-container',
          supports.focusFlexboxContainer && '#flexbox-container-child',
          '#focusable-flexbox',
          supports.focusChildrenOfFocusableFlexbox && '#focusable-flexbox-child',
        ].filter(Boolean);

        expect(result).to.deep.equal(expected);
      });
    });

    bdd.describe('for option includeContext', function() {
      bdd.it('should find elements within context and the context element itself', function() {
        fixture.root.querySelector('.context').setAttribute('tabindex', '-1');

        var expected = [
          'div',
          '#link',
          '#link-tabindex--1',
        ];

        var result = queryFocusable({
          strategy: 'strict',
          context: '.context',
          includeContext: true,
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      });
    });

    bdd.it('should find all focusable elements', function() {
      var result = queryFocusable({
        strategy: 'strict',
      }).map(fixture.nodeToString);

      var expected = [
        '#tabindex--1',
        '#tabindex-0',
        '#tabindex-1',
        supports.focusInvalidTabindex && '#tabindex-bad',
        '#link',
        '#link-tabindex--1',
        '#image-map-area',
        supports.focusAreaWithoutHref && '#image-map-area-nolink',
        supports.focusObjectSvg && '#object-svg',
        supports.focusObjectSvg && '#object-tabindex-svg',
        supports.svgFocusMethod && '#svg-link',
        supports.focusAudioWithoutControls && '#audio',
        '#audio-controls',
        '#input',
        '#input-tabindex--1',
        '#span-contenteditable',
        document.body.style.webkitUserModify !== undefined && '#span-user-modify',
        '#img-ismap-link',
        supports.focusImgIsmap && '#img-ismap',
        supports.focusScrollContainer && '#scroll-container',
        supports.focusScrollBody && '#scroll-body',
        supports.focusScrollContainerWithoutOverflow && '#scroll-container-without-overflow',
        supports.focusScrollContainerWithoutOverflow && '#scroll-body-without-overflow',
        supports.focusScrollContainer && '#div-section-overflow-scroll',
        supports.focusScrollContainer && !supports.focusScrollBody && '#section-div-overflow-scroll',
        supports.focusScrollBody && '#section-div-overflow-scroll-body',
        supports.focusFlexboxContainer && '#flexbox-container',
        supports.focusFlexboxContainer && '#flexbox-container-child',
        '#focusable-flexbox',
        supports.focusChildrenOfFocusableFlexbox && '#focusable-flexbox-child',
      ].filter(Boolean);

      expect(result).to.deep.equal(expected);
    });

    bdd.describe('for children of <canvas>', function() {
      bdd.it('should find all focusable elements', function() {
        var container = fixture.add([
          /*eslint-disable indent */
          '<canvas>',
            '<input type="text" id="canvas-input">',
            '<input type="text" id="canvas-input-tabindex--1" tabindex="-1">',
            '<a href="#void" id="canvas-a">hello</a>',
            '<a href="#void" id="canvas-a-tabindex--1" tabindex="-1">hello</a>',
            '<span tabindex="0" id="canvas-span-tabindex-0">hello</span>',
            '<span tabindex="-1" id="canvas-span-tabindex--1">hello</span>',
          '</canvas>',
          /*eslint-enable indent */
        ], 'canvas-container');

        var expected = [
          '#canvas-input',
          '#canvas-input-tabindex--1',
          '#canvas-a',
          '#canvas-a-tabindex--1',
          '#canvas-span-tabindex-0',
          '#canvas-span-tabindex--1',
        ];

        var result = queryFocusable({
          strategy: 'strict',
          context: container,
          includeContext: true,
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      });
    });

    bdd.describe('for ShadowDOM', function() {
      bdd.before(function() {
        if (document.body.createShadowRoot === undefined) {
          this.skip('ShadowDOM is not supported');
        }
      });

      bdd.it('should find elements nested in ShadowRoot', function() {
        var host = document.createElement('div');
        host.id = 'first-shadow-host';
        fixture.root.appendChild(host);
        shadowInputFixture.createShadowRoot(fixture);

        var result = queryFocusable({
          strategy: 'strict',
        }).map(fixture.nodeToString);

        var expected = [
          '#tabindex--1',
          '#tabindex-0',
          '#tabindex-1',
          supports.focusInvalidTabindex && '#tabindex-bad',
          '#link',
          '#link-tabindex--1',
          '#image-map-area',
          supports.focusAreaWithoutHref && '#image-map-area-nolink',
          supports.focusObjectSvg && '#object-svg',
          supports.focusObjectSvg && '#object-tabindex-svg',
          supports.svgFocusMethod && '#svg-link',
          supports.focusAudioWithoutControls && '#audio',
          '#audio-controls',
          '#input',
          '#input-tabindex--1',
          '#span-contenteditable',
          document.body.style.webkitUserModify !== undefined && '#span-user-modify',
          '#img-ismap-link',
          supports.focusScrollContainer && '#scroll-container',
          supports.focusScrollContainer && '#div-section-overflow-scroll',
          supports.focusScrollContainer && !supports.focusScrollBody && '#section-div-overflow-scroll',
          supports.focusScrollBody && '#section-div-overflow-scroll-body',
          supports.focusFlexboxContainer && '#flexbox-container',
          supports.focusFlexboxContainer && '#flexbox-container-child',
          '#focusable-flexbox',
          supports.focusChildrenOfFocusableFlexbox && '#focusable-flexbox-child',
          '#first-input',
          '#second-input',
          '#third-input',
        ].filter(Boolean);

        expect(result).to.deep.equal(expected);
      });
    });

  });
});
