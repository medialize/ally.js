define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  '../helper/fixtures/shadow-input.fixture',
  '../helper/elements-string',
  '../helper/supports',
  'ally/query/focusable',
], function(
  registerSuite,
  expect,
  focusableFixture,
  shadowInputFixture,
  elementsString,
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
        });
        var expected = 'body, #tabindex--1, #tabindex-0, #tabindex-1'
          + (supports.canFocusInvalidTabindex ? ', #tabindex-bad' : '')
          + ', #link, #link-tabindex--1'
          + ', #image-map-area'
          + ', #input, #input-tabindex--1, #span-contenteditable'
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
          strategy: 'strict',
          context: '.context',
        });

        expect(elementsString(result)).to.equal(expected);
      },

      'context and self': function() {
        fixture.root.querySelector('.context').setAttribute('tabindex', '-1');

        var expected = 'div, #link, #link-tabindex--1';
        var result = queryFocusable({
          strategy: 'strict',
          context: '.context',
          includeContext: true,
        });

        expect(elementsString(result)).to.equal(expected);
      },

      'children of <canvas>': function() {
        var context = fixture.root.querySelector('.context');
        context.innerHTML = '';

        var canvas = document.createElement('canvas');
        //  <canvas width="150" height="150" data-label="canvas">
        canvas.innerHTML = [
          '<input type="text" id="canvas-input">',
          '<input type="text" id="canvas-input-tabindex--1" tabindex="-1">',
          '<a href="#void" id="canvas-a">hello</a>',
          '<a href="#void" id="canvas-a-tabindex--1" tabindex="-1">hello</a>',
          '<span tabindex="0" id="canvas-span-tabindex-0">hello</span>',
          '<span tabindex="-1" id="canvas-span-tabindex--1">hello</span>',
        ].join('');
        context.appendChild(canvas);

        var expected = '#canvas-input, #canvas-input-tabindex--1, #canvas-a, #canvas-a-tabindex--1'
          + ', #canvas-span-tabindex-0, #canvas-span-tabindex--1';
        var result = queryFocusable({
          strategy: 'strict',
          context: '.context',
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
          strategy: 'strict',
        });
        var expected = 'body, #tabindex--1, #tabindex-0, #tabindex-1'
          + (supports.canFocusInvalidTabindex ? ', #tabindex-bad' : '')
          + ', #link, #link-tabindex--1'
          + ', #image-map-area'
          + ', #input, #input-tabindex--1, #span-contenteditable'
          + (document.body.style.webkitUserModify !== undefined ? ', #span-user-modify' : '')
          + ', #img-ismap-link'
          + (supports.canFocusScrollContainer ? ', #scroll-container' : '')
          + ', #first-input, #second-input, #third-input';

        expect(elementsString(result)).to.equal(expected);
      },
    };
  });
});
