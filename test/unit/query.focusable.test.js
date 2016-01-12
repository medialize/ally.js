define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  '../helper/fixtures/shadow-input.fixture',
  '../helper/supports',
  'ally/query/focusable',
], function(
  registerSuite,
  expect,
  focusableFixture,
  shadowInputFixture,
  supports,
  queryFocusable
) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'query/focusable',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      document: function() {
        var result = queryFocusable().map(fixture.nodeToString);
        var expected = [
          '#tabindex--1',
          '#tabindex-0',
          '#tabindex-1',
          supports.canFocusInvalidTabindex && '#tabindex-bad',
          '#link',
          '#link-tabindex--1',
          '#image-map-area',
          supports.canFocusObjectSvg && '#object-svg',
          supports.canFocusObjectSvg && '#object-tabindex-svg',
          supports.canFocusSvgMethod && '#svg-link',
          supports.canFocusAudioWithoutControls && '#audio',
          '#audio-controls',
          '#input',
          '#input-tabindex--1',
          '#span-contenteditable',
          '#img-ismap-link',
          '#focusable-flexbox',
        ].filter(Boolean);

        expect(result).to.deep.equal(expected);
      },

      context: function() {
        var expected = [
          '#link',
          '#link-tabindex--1',
        ];
        var result = queryFocusable({
          context: '.context',
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      },

      'context and self': function() {
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
      },

      'children of <canvas>': function() {
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
      },

      'Shadow DOM': function() {
        if (document.body.createShadowRoot === undefined) {
          this.skip('Shadow DOM not supported');
        }

        if (!supports.cssShadowPiercingDeepCombinator) {
          this.skip('Shadow DOM "shadow-piercing descendant combinator" not supported');
        }

        var host = document.createElement('div');
        host.id = 'first-shadow-host';
        fixture.root.appendChild(host);
        shadowInputFixture.createShadowRoot(fixture);

        var result = queryFocusable().map(fixture.nodeToString);
        var expected = [
          '#tabindex--1',
          '#tabindex-0',
          '#tabindex-1',
          supports.canFocusInvalidTabindex && '#tabindex-bad',
          '#link',
          '#link-tabindex--1',
          '#image-map-area',
          supports.canFocusObjectSvg && '#object-svg',
          supports.canFocusObjectSvg && '#object-tabindex-svg',
          supports.canFocusSvgMethod && '#svg-link',
          supports.canFocusAudioWithoutControls && '#audio',
          '#audio-controls',
          '#input',
          '#input-tabindex--1',
          '#span-contenteditable',
          '#img-ismap-link',
          '#focusable-flexbox',
          '#first-input',
          '#second-input',
          '#third-input',
        ].filter(Boolean);

        expect(result).to.deep.equal(expected);
      },
    };
  });
});
