define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  '../helper/supports',
  'ally/util/platform',
  'ally/query/tabsequence',
], function(registerSuite, expect, focusableFixture, supports, platform, queryTabsequence) {

  registerSuite(function() {
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

    return {
      name: 'query/tabsequence',

      beforeEach: function() {
        fixture = focusableFixture();
        mutateFixtureForImageMaps();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      document: function() {
        var deferred = this.async(10000);

        var expected = [
          '#tabindex-1',
          '#tabindex-0',
          '#link',
          !supports.tabsequenceSortsAreaAtImagePosition && '#image-map-area',
          !supports.tabsequenceSortsAreaAtImagePosition && '#image-map-area-2',
          platform.is.GECKO && '#object-svg',
          supports.svgFocusMethod && '#svg-link',
          '#audio-controls',
          '#input',
          '#span-contenteditable',
          '#img-ismap-link',
          supports.tabsequenceSortsAreaAtImagePosition && '#image-map-area',
          supports.tabsequenceSortsAreaAtImagePosition && '#image-map-area-2',
          '#end-of-line',
        ].filter(Boolean);

        // NOTE: Firefox decodes DataURIs asynchronously
        setTimeout(deferred.callback(function() {
          var result = queryTabsequence().map(fixture.nodeToString);
          expect(result).to.deep.equal(expected);
        }), 200);
      },

      includeOnlyTabbable: function() {
        var deferred = this.async(10000);

        var expected = [
          '#tabindex-1',
          '#tabindex-0',
          '#link',
          !supports.tabsequenceSortsAreaAtImagePosition && '#image-map-area',
          !supports.tabsequenceSortsAreaAtImagePosition && '#image-map-area-2',
          platform.is.GECKO && '#object-svg',
          '#svg-link',
          '#audio-controls',
          '#input',
          '#span-contenteditable',
          '#img-ismap-link',
          supports.tabsequenceSortsAreaAtImagePosition && '#image-map-area',
          supports.tabsequenceSortsAreaAtImagePosition && '#image-map-area-2',
          '#end-of-line',
        ].filter(Boolean);

        // NOTE: Firefox decodes DataURIs asynchronously
        setTimeout(deferred.callback(function() {
          var result = queryTabsequence({
            includeOnlyTabbable: true,
          }).map(fixture.nodeToString);

          expect(result).to.deep.equal(expected);
        }), 200);
      },

      context: function() {
        var context = fixture.root.querySelector('.context');
        var input = document.createElement('input');
        input.setAttribute('tabindex', '3');
        input.setAttribute('id', 'tabindex-3');
        context.appendChild(input);

        var expected = [
          '#tabindex-3',
          '#link',
        ];
        var result = queryTabsequence({
          context: '.context',
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      },

      'context and self': function() {
        fixture.root.querySelector('.context').setAttribute('tabindex', '0');

        var expected = [
          'div',
          '#link',
        ];
        var result = queryTabsequence({
          context: '.context',
          includeContext: true,
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      },

      'shadowed tabindex': function() {
        if (document.body.createShadowRoot === undefined) {
          this.skip('Shadow DOM not supported');
        }

        var context = fixture.add('<input id="shadow-start"><div id="shadow-host"></div><input id="shadow-end">');
        createShadowDomStructure(document.getElementById('shadow-host'));

        var expectLocal = [
          '#shadow-start',
          '#input-0',
          '#input-1',
          '#input-2',
          '#third-shadow-host',
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
          '#input-7',
          '#input-3',
          '#input-0',
          '#input-1',
          '#input-2',
          '#third-shadow-host',
          '#input-4',
          '#shadow-start',
          '#input-6',
          '#input-8',
          '#input-5',
          '#input-9',
          '#shadow-end',
        ];

        var result = queryTabsequence({
          context: context,
          strategy: 'strict',
        }).map(fixture.nodeToString);

        var expected = platform.is.GECKO ? expectGlobal : expectLocal;

        expect(result).to.deep.equal(expected);
      },
    };
  });
});
