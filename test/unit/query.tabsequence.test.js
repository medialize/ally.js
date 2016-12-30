define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var focusableFixture = require('../helper/fixtures/focusable.fixture');
  var supports = require('../helper/supports');
  var platform = require('ally/util/platform');
  var queryTabsequence = require('ally/query/tabsequence');

  bdd.describe('query/tabsequence', function() {
    var fixture;

    var mutateFixtureForImageMaps = function() {
      // create known end-point
      var last = fixture.add('<input type="text" id="end-of-line">').firstElementChild;
      // move image map before #end-of-line to separate <img> from <map>
      var img = document.getElementById('img-usemap');
      last.parentNode.insertBefore(img, last);
      // add second area to test order within map
      var area = document.getElementById('image-map-area');
      var newArea = area.cloneNode(true);
      newArea.id = 'image-map-area-2';
      area.parentNode.appendChild(newArea);
    };

    var createShadowDomStructure = function(element) {
      var input = {};
      var root = {};

      var firstShadowRoot = element.createShadowRoot();
      firstShadowRoot.innerHTML = [
        '<input type="text" id="input-1" value="input-1" tabindex="2">',
        '<input type="text" id="input-6" value="input-6" tabindex="0">',
        '<input type="text" id="input-2" value="input-2" tabindex="2">',
        '<div id="second-shadow-host"></div>',
        '<div id="third-shadow-host"></div>',
        '<input type="text" id="input-9" value="input-9" tabindex="0">',
        '<input type="text" id="input-0" value="input-0" tabindex="1">',
      ].join('');

      root.first = firstShadowRoot;
      input['input-0'] = firstShadowRoot.getElementById('input-0');
      input['input-1'] = firstShadowRoot.getElementById('input-1');
      input['input-2'] = firstShadowRoot.getElementById('input-2');
      input['input-6'] = firstShadowRoot.getElementById('input-6');
      input['input-9'] = firstShadowRoot.getElementById('input-9');

      var secondShadowHost = firstShadowRoot.getElementById('second-shadow-host');
      var secondShadowRoot = secondShadowHost.createShadowRoot();
      secondShadowRoot.innerHTML = [
        '<input type="text" id="input-8" value="input-8" tabindex="0">',
        '<input type="text" id="input-7" value="input-7" tabindex="1">',
      ].join('');

      root.second = secondShadowRoot;
      input['input-7'] = secondShadowRoot.getElementById('input-7');
      input['input-8'] = secondShadowRoot.getElementById('input-8');

      var thirdShadowHost = firstShadowRoot.getElementById('third-shadow-host');
      thirdShadowHost.setAttribute('tabindex', '2');
      var thirdShadowRoot = thirdShadowHost.createShadowRoot();
      thirdShadowRoot.innerHTML = [
        '<input type="text" id="input-4" value="input-4" tabindex="2">',
        '<input type="text" id="input-5" value="input-5" tabindex="0">',
        '<input type="text" id="input-3" value="input-3" tabindex="1">',
      ].join('');

      root.third = thirdShadowRoot;
      input['input-3'] = thirdShadowRoot.getElementById('input-3');
      input['input-4'] = thirdShadowRoot.getElementById('input-4');
      input['input-5'] = thirdShadowRoot.getElementById('input-5');

      return {
        root: root,
        input: input,
      };
    };

    bdd.beforeEach(function() {
      var deferred = this.async(10000);
      fixture = focusableFixture();
      mutateFixtureForImageMaps();
      // NOTE: Firefox decodes DataURIs asynchronously
      setTimeout(deferred.resolve, 200);
    });

    bdd.afterEach(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        queryTabsequence({
          context: true,
        });
      }).to.throw(TypeError, 'unexpected input true', 'non-element context');

      expect(function() {
        queryTabsequence({
          strategy: 'random',
        });
      }).to.throw(TypeError, 'query/focusable requires option.strategy to be one of ["quick", "strict", "all"]', 'bad strategy');
    });

    bdd.describe('for option includeOnlyTabbable', function() {
      bdd.it('should find elements which are either focusable or onlyTabbable', function() {
        var result = queryTabsequence({
          includeOnlyTabbable: true,
        }).map(fixture.nodeToString);

        var expected = [
          !platform.is.IOS && '#tabindex-1',
          !platform.is.IOS && '#tabindex-0',
          !platform.is.IOS && '#link',
          !platform.is.IOS && !supports.tabsequenceAreaAtImgPosition && '#image-map-area',
          !platform.is.IOS && !supports.tabsequenceAreaAtImgPosition && '#image-map-area-2',
          !platform.is.IOS && platform.is.GECKO && '#object-svg',
          !platform.is.IOS && '#svg-link',
          !platform.is.IOS && '#audio-controls',
          '#input',
          '#span-contenteditable',
          !platform.is.IOS && '#img-ismap-link',
          !platform.is.IOS && supports.tabsequenceAreaAtImgPosition && '#image-map-area',
          !platform.is.IOS && supports.tabsequenceAreaAtImgPosition && '#image-map-area-2',
          '#end-of-line',
        ].filter(Boolean);

        expect(result).to.deep.equal(expected);
      });
    });

    bdd.describe('for option includeContext', function() {
      bdd.it('should find elements within context and the context element itself', function() {
        fixture.root.querySelector('.context').setAttribute('tabindex', '0');

        var expected = [
          !platform.is.IOS && 'div',
          !platform.is.IOS && '#link',
        ].filter(Boolean);

        var result = queryTabsequence({
          context: '.context',
          includeContext: true,
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      });
    });

    bdd.it('should find all focusable elements', function() {
      var result = queryTabsequence().map(fixture.nodeToString);

      var expected = [
        !platform.is.IOS && '#tabindex-1',
        !platform.is.IOS && '#tabindex-0',
        !platform.is.IOS && '#link',
        !platform.is.IOS && !supports.tabsequenceAreaAtImgPosition && '#image-map-area',
        !platform.is.IOS && !supports.tabsequenceAreaAtImgPosition && '#image-map-area-2',
        !platform.is.IOS && platform.is.GECKO && '#object-svg',
        !platform.is.IOS && supports.focusingSvgElements && '#svg-link',
        !platform.is.IOS && '#audio-controls',
        '#input',
        '#span-contenteditable',
        !platform.is.IOS && '#img-ismap-link',
        !platform.is.IOS && supports.tabsequenceAreaAtImgPosition && '#image-map-area',
        !platform.is.IOS && supports.tabsequenceAreaAtImgPosition && '#image-map-area-2',
        '#end-of-line',
      ].filter(Boolean);

      expect(result).to.deep.equal(expected);
    });

    bdd.describe('for ShadowDOM', function() {
      bdd.before(function() {
        if (document.body.createShadowRoot === undefined) {
          this.skip('ShadowDOM is not supported');
        }
      });

      bdd.it('should find elements nested in ShadowRoot', function() {
        var context = fixture.add('<input id="shadow-start"><div id="shadow-host"></div><input id="shadow-end">');
        context.setAttribute('tabindex', '0');
        context.id = 'context-element';
        createShadowDomStructure(document.getElementById('shadow-host'));

        var expectLocal = [
          '#context-element',
          '#shadow-start',
          '#input-0',
          '#input-1',
          '#input-2',
          !platform.is.IOS && '#third-shadow-host',
          '#input-3',
          '#input-4',
          '#input-5',
          '#input-6',
          '#input-7',
          '#input-8',
          '#input-9',
          '#shadow-end',
        ];

        var expectGlobal = [
          '#context-element',
          '#input-7',
          '#input-3',
          '#input-0',
          '#input-1',
          '#input-2',
          !platform.is.IOS && '#third-shadow-host',
          '#input-4',
          '#shadow-start',
          '#input-6',
          '#input-8',
          '#input-5',
          '#input-9',
          '#shadow-end',
        ];

        var expected = platform.is.GECKO ? expectGlobal : expectLocal;
        var result = queryTabsequence({
          context: context,
          strategy: 'strict',
          includeContext: true,
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      });
    });
  });
});
