define([
  './custom.fixture',
  '../supports',
  'ally/supports/media/gif',
  'ally/supports/media/svg',
  'ally/supports/media/mp3',
  'ally/supports/media/mp4',
], function(customFixture, supports, gif, svg, mp3, mp4) {
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
      // image map
      '<map name="image-map">',
        '<area id="image-map-area" href="#void" shape="rect" coords="63,19,144,45">',
        '<area id="image-map-area-nolink" shape="rect" coords="63,19,144,45">',
      '</map>',
      '<img id="img-usemap" usemap="#image-map" src="' + gif + '" alt="">',
      // embedded content
      '<object type="image/svg+xml" id="object-svg" data="' + svg + '" width="200" height="50"></object>',
      '<object type="image/svg+xml" id="object-tabindex-svg" tabindex="-1" data="' + svg + '" width="200" height="50"></object>',
      '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" id="svg">',
        '<a xlink:href="#void" id="svg-link">',
          '<text x="10" y="20" id="svg-link-text">text</text>',
        '</a>',
      '</svg>',
      (!supports.AVOID_QUICKTIME && '<embed id="embed" type="video/mp4" src="' + mp4 + '" width="640" height="480">') || '',
      (!supports.AVOID_QUICKTIME && '<embed id="embed-tabindex-0" type="video/mp4" src="' + mp4 + '" width="640" height="480" tabindex="0">') || '',
      '<embed type="image/svg+xml" id="embed-svg" data="' + svg + '" width="200" height="50">',
      '<embed type="image/svg+xml" id="embed-tabindex-svg" tabindex="-1" data="' + svg + '" width="200" height="50">',
      // interactive content
      (!supports.AVOID_MEDIA && '<audio id="audio" src="' + mp3 + '"></audio>') || '',
      (!supports.AVOID_MEDIA && '<audio id="audio-controls" controls src="' + mp3 + '"></audio>') || '',
      // input elements
      '<label id="label">text</label>',
      '<input type="text" id="input">',
      '<input type="text" tabindex="-1" id="input-tabindex--1">',
      '<input type="text" disabled id="input-disabled">',
      '<input type="hidden" id="input-hidden">',
      '<fieldset disabled>',
        '<input type="text" id="fieldset-disabled-input">',
      '</fieldset>',
      // editing hosts
      '<span contenteditable id="span-contenteditable"></span>',
      '<span style="-webkit-user-modify: read-write" id="span-user-modify"></span>',
      // browser quirks
      '<a href="#void" id="img-ismap-link"><img id="img-ismap" src="' + gif + '" ismap alt=""></a>',
      // scrolling containers,
      '<div id="scroll-container" style="width: 100px; height: 50px; overflow: auto;">',
        '<div id="scroll-body" style="width: 500px; height: 40px;">scrollable content</div>',
      '</div>',
      '<div id="scroll-container-without-overflow" style="width: 100px; height: 50px;">',
        '<div id="scroll-body-without-overflow" style="width: 500px; height: 40px;">scrollable content</div>',
      '</div>',
      '<section id="section-scroll-container" style="width: 100px; height: 50px;">',
        '<div id="section-scroll-body" style="width: 500px; height: 40px;">scrollable content</div>',
      '</section>',
      '<div id="div-section-overflow-scroll" style="width: 100px; height: 50px; overflow: scroll;">',
        '<section id="div-section-overflow-scroll-body" style="width: 500px; height: 40px;">scrollable content</section>',
      '</div>',
      '<section id="section-div-overflow-scroll" style="width: 100px; height: 50px; overflow: scroll;">',
        '<div id="section-div-overflow-scroll-body" style="width: 500px; height: 40px;">scrollable content</div>',
      '</section>',
      // flexbox fun
      '<span id="flexbox-container" style="display: -webkit-flex; display: -ms-flexbox; display: flex;">',
        '<span id="flexbox-container-child" style="display: block">content</span>',
      '</span>',
      '<span id="focusable-flexbox" tabindex="-1" style="display: -webkit-flex; display: -ms-flexbox; display: flex;">',
        '<span id="focusable-flexbox-child" style="display: block">content</span>',
      '</span>',
      /*eslint-enable indent */
    ], context);
  };
});
