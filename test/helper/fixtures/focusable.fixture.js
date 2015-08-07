define(['./custom.fixture'], function(customFixture) {
  return function(context) {
    return customFixture([
      /*eslint-disable indent */
      // tabindex attribute
      '<div id="inert-div">a</div>',
      '<div tabindex="-1" id="tabindex--1">a</div>',
      '<div tabindex="0" id="tabindex-0">a</div>',
      '<div tabindex="1" id="tabindex-1">a</div>',
      '<div tabindex="bad" id="tabindex-bad">a</div>',
      // link elements
      '<div class="context">',
        '<a id="anchor">nope</a>',
        '<a href="#" id="link">yep</a>',
        '<a tabindex="-1" href="#" id="link-tabindex--1">maybe</a>',
      '</div>',
      // input elements
      '<input type="text" id="input">',
      '<input type="text" tabindex="-1" id="input-tabindex--1">',
      '<input type="text" disabled id="input-disabled">',
      '<input type="hidden" id="input-hidden">',
      // editing hosts
      '<span contenteditable id="span-contenteditable"></span>',
      '<span style="-webkit-user-modify: read-write" id="span-user-modify"></span>',
      // browser quirks
      '<a href="#void" id="img-ismap-link"><img id="img-ismap" src="data:image/png;base64,broken-image-test" ismap alt=""></a>',
      // scrolling containers,
      '<div id="scroll-container" style="width: 100px; height: 50px; overflow: auto;">',
        '<div id="scroll-body" style="width: 500px; height: 40px;">scrollable content</div>',
      '</div>',
      '<div id="scroll-container-without-overflow" style="width: 100px; height: 50px;">',
        '<div id="scroll-body-without-overflow" style="width: 500px; height: 40px;">scrollable content</div>',
      '</div>',
      /*eslint-enable indent */
    ].join(''), context);
  };
});
