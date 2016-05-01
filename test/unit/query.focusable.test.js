define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var focusableFixture = require('../helper/fixtures/focusable.fixture');
  var shadowInputFixture = require('../helper/fixtures/shadow-input.fixture');
  var supports = require('../helper/supports');
  var platform = require('ally/util/platform');
  var queryFocusable = require('ally/query/focusable');

  bdd.describe('query/focusable', function() {
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

    bdd.it('should handle invalid input', function() {
      expect(function() {
        queryFocusable({
          context: true,
        });
      }).to.throw(TypeError, 'unexpected input true', 'non-element context');

      expect(function() {
        queryFocusable({
          strategy: 'random',
        });
      }).to.throw(TypeError, 'query/focusable requires option.strategy to be one of ["quick", "strict", "all"]', 'bad strategy');
    });

    bdd.it('should search within given context', function() {
      var expected = [
        '#link',
        '#link-tabindex--1',
      ];

      var result = queryFocusable({
        context: '.context',
      }).map(fixture.nodeToString);

      expect(result).to.deep.equal(expected);
    });

    bdd.describe('for option includeOnlyTabbable', function() {
      bdd.it('should find elements which are either focusable or onlyTabbable', function() {
        var result = queryFocusable({
          includeOnlyTabbable: true,
        }).map(fixture.nodeToString);

        var expected = [
          '#tabindex--1',
          '#tabindex-0',
          '#tabindex-1',
          supports.focusInvalidTabindex && '#tabindex-bad',
          '#link',
          '#link-tabindex--1',
          '#image-map-area',
          supports.focusObjectSvg && '#object-svg',
          supports.focusObjectSvg && '#object-tabindex-svg',
          '#svg-link',
          supports.focusAudioWithoutControls && '#audio',
          '#audio-controls',
          '#input',
          '#input-tabindex--1',
          '#span-contenteditable',
          '#img-ismap-link',
          '#focusable-flexbox',
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
          context: '.context',
          includeContext: true,
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      });
    });

    bdd.it('should find all focusable elements', function() {
      var result = queryFocusable().map(fixture.nodeToString);

      var expected = [
        '#tabindex--1',
        '#tabindex-0',
        '#tabindex-1',
        supports.focusInvalidTabindex && '#tabindex-bad',
        '#link',
        '#link-tabindex--1',
        '#image-map-area',
        supports.focusObjectSvg && '#object-svg',
        supports.focusObjectSvg && '#object-tabindex-svg',
        supports.svgFocusMethod && '#svg-link',
        supports.focusAudioWithoutControls && '#audio',
        '#audio-controls',
        '#input',
        '#input-tabindex--1',
        '#span-contenteditable',
        '#img-ismap-link',
        '#focusable-flexbox',
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

        var result = queryFocusable().map(fixture.nodeToString);

        var expected = [
          '#tabindex--1',
          '#tabindex-0',
          '#tabindex-1',
          supports.focusInvalidTabindex && '#tabindex-bad',
          '#link',
          '#link-tabindex--1',
          '#image-map-area',
          supports.focusObjectSvg && '#object-svg',
          supports.focusObjectSvg && '#object-tabindex-svg',
          supports.svgFocusMethod && '#svg-link',
          supports.focusAudioWithoutControls && '#audio',
          '#audio-controls',
          '#input',
          '#input-tabindex--1',
          '#span-contenteditable',
          '#img-ismap-link',
          '#focusable-flexbox',
          !platform.is.GECKO && '#first-input',
          !platform.is.GECKO && '#second-input',
          !platform.is.GECKO && '#third-input',
        ].filter(Boolean);

        expect(result).to.deep.equal(expected);
      });
    });

  });
});
