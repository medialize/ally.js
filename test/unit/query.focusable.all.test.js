define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  '../helper/fixtures/shadow-input.fixture',
  '../helper/elements-string',
  '../helper/supports',
  'platform',
  'ally/query/focusable',
], function(
  registerSuite,
  expect,
  focusableFixture,
  shadowInputFixture,
  elementsString,
  supports,
  platform,
  queryFocusable
) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'query/focusable.all',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      document: function() {
        var result = queryFocusable({
          strategy: 'all',
        });

        var expected = '#tabindex--1, #tabindex-0, #tabindex-1'
          + (supports.canFocusInvalidTabindex ? ', #tabindex-bad' : '')
          + ', #link, #link-tabindex--1'
          + ', #image-map-area'
          + ', #object-svg'
          + (platform.name === 'IE' ? ', #svg' : '')
          + (supports.canFocusObjectSvg ? ', #object-tabindex-svg' : '')
          + ', #svg-link'
          + ', #embed, #embed-tabindex-0, #embed-svg, #embed-tabindex-svg'
          + (supports.canFocusAudioWithoutControls ? ', #audio' : '')
          + ', #audio-controls'
          + ', #input, #input-tabindex--1, #input-disabled'
          + (supports.canFocusFieldset ? ', fieldset' : '')
          + ', #fieldset-disabled-input'
          + ', #span-contenteditable'
          + (document.body.style.webkitUserModify !== undefined ? ', #span-user-modify' : '')
          + ', #img-ismap-link'
          + (supports.canFocusImgIsmap ? ', #img-ismap' : '')
          + (supports.canFocusScrollContainer ? ', #scroll-container' : '')
          + (supports.canFocusScrollBody ? ', #scroll-body' : '')
          + (supports.canFocusScrollContainerWithoutOverflow ? ', #scroll-container-without-overflow, #scroll-body-without-overflow' : '');

        expect(elementsString(result)).to.equal(expected);
      },

      context: function() {
        var expected = '#link, #link-tabindex--1';
        var result = queryFocusable({
          strategy: 'all',
          context: '.context',
        });

        expect(elementsString(result)).to.equal(expected);
      },

      'context and self': function() {
        fixture.root.querySelector('.context').setAttribute('tabindex', '-1');

        var expected = 'div, #link, #link-tabindex--1';
        var result = queryFocusable({
          strategy: 'all',
          context: '.context',
          includeContext: true,
        });

        expect(elementsString(result)).to.equal(expected);
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
        ].join(''), 'canvas-container');

        var expected = '#canvas-input, #canvas-input-tabindex--1, #canvas-a, #canvas-a-tabindex--1'
          + ', #canvas-span-tabindex-0, #canvas-span-tabindex--1';
        var result = queryFocusable({
          strategy: 'all',
          context: container,
          includeContext: true,
        });

        expect(elementsString(result)).to.equal(expected);
      },

      'extended: Shadow DOM': function() {
        if (document.body.shadowRoot === undefined) {
          this.skip('Shadow DOM not supported');
        }

        var host = document.createElement('div');
        host.id = 'first-shadow-host';
        fixture.root.appendChild(host);
        shadowInputFixture.createShadowRoot(fixture);

        var result = queryFocusable({
          strategy: 'all',
        });
        var expected = '#tabindex--1, #tabindex-0, #tabindex-1'
          + (supports.canFocusInvalidTabindex ? ', #tabindex-bad' : '')
          + ', #link, #link-tabindex--1'
          + ', #image-map-area'
          + (supports.canFocusObjectSvg ? ', #object-svg, #object-tabindex-svg' : '')
          + ', #svg-link'
          + ', #embed, #embed-tabindex-0, #embed-svg, #embed-tabindex-svg'
          + (supports.canFocusAudioWithoutControls ? ', #audio' : '')
          + ', #audio-controls'
          + ', #input, #input-tabindex--1'
          + ', #input-disabled, #fieldset-disabled-input'
          + ', #span-contenteditable'
          + (document.body.style.webkitUserModify !== undefined ? ', #span-user-modify' : '')
          + ', #img-ismap-link'
          + (supports.canFocusScrollContainer ? ', #scroll-container' : '')
          + ', #first-input, #second-input, #third-input';

        expect(elementsString(result)).to.equal(expected);
      },
    };
  });
});
