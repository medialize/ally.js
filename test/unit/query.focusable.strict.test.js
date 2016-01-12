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
      name: 'query/focusable.strict',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      document: function() {
        var result = queryFocusable({
          strategy: 'strict',
        }).map(fixture.nodeToString);
        var expected = [
          '#tabindex--1',
          '#tabindex-0',
          '#tabindex-1',
          supports.canFocusInvalidTabindex && '#tabindex-bad',
          '#link',
          '#link-tabindex--1',
          '#image-map-area',
          supports.canFocusAreaWithoutHref && '#image-map-area-nolink',
          supports.canFocusObjectSvg && '#object-svg',
          supports.canFocusObjectSvg && '#object-tabindex-svg',
          supports.canFocusSvgMethod && '#svg-link',
          supports.canFocusAudioWithoutControls && '#audio',
          '#audio-controls',
          '#input',
          '#input-tabindex--1',
          '#span-contenteditable',
          document.body.style.webkitUserModify !== undefined && '#span-user-modify',
          '#img-ismap-link',
          supports.canFocusImgIsmap && '#img-ismap',
          supports.canFocusScrollContainer && '#scroll-container',
          supports.canFocusScrollBody && '#scroll-body',
          supports.canFocusScrollContainerWithoutOverflow && '#scroll-container-without-overflow',
          supports.canFocusScrollContainerWithoutOverflow && '#scroll-body-without-overflow',
          supports.canFocusScrollContainer && '#div-section-overflow-scroll',
          supports.canFocusScrollContainer && !supports.canFocusScrollBody && '#section-div-overflow-scroll',
          supports.canFocusScrollBody && '#section-div-overflow-scroll-body',
          supports.canFocusFlexboxContainer && '#flexbox-container',
          supports.canFocusFlexboxContainer && '#flexbox-container-child',
          '#focusable-flexbox',
          supports.canFocusChildrenOfFocusableFlexbox && '#focusable-flexbox-child',
        ].filter(Boolean);

        expect(result).to.deep.equal(expected);
      },

      context: function() {
        var expected = [
          '#link',
          '#link-tabindex--1',
        ];
        var result = queryFocusable({
          strategy: 'strict',
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
          strategy: 'strict',
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
          strategy: 'strict',
          context: container,
          includeContext: true,
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      },

      'extended: Shadow DOM': function() {
        if (document.body.createShadowRoot === undefined) {
          this.skip('Shadow DOM not supported');
        }

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
          supports.canFocusInvalidTabindex && '#tabindex-bad',
          '#link',
          '#link-tabindex--1',
          '#image-map-area',
          supports.canFocusAreaWithoutHref && '#image-map-area-nolink',
          supports.canFocusObjectSvg && '#object-svg',
          supports.canFocusObjectSvg && '#object-tabindex-svg',
          supports.canFocusSvgMethod && '#svg-link',
          supports.canFocusAudioWithoutControls && '#audio',
          '#audio-controls',
          '#input',
          '#input-tabindex--1',
          '#span-contenteditable',
          document.body.style.webkitUserModify !== undefined && '#span-user-modify',
          '#img-ismap-link',
          supports.canFocusScrollContainer && '#scroll-container',
          supports.canFocusScrollContainer && '#div-section-overflow-scroll',
          supports.canFocusScrollContainer && !supports.canFocusScrollBody && '#section-div-overflow-scroll',
          supports.canFocusScrollBody && '#section-div-overflow-scroll-body',
          supports.canFocusFlexboxContainer && '#flexbox-container',
          supports.canFocusFlexboxContainer && '#flexbox-container-child',
          '#focusable-flexbox',
          supports.canFocusChildrenOfFocusableFlexbox && '#focusable-flexbox-child',
          '#first-input',
          '#second-input',
          '#third-input',
        ].filter(Boolean);

        expect(result).to.deep.equal(expected);
      },
    };
  });
});
