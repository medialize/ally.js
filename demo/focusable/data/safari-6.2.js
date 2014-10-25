define(function defineDemoFocusableSafari6(require) {
  'use strict';

  // The contents of this file have been collected by running focusable/index.html

  return {
    name: 'Safari 6.2 stable 2014-10-25',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/600.1.17 (KHTML, like Gecko) Version/6.2 Safari/537.85.10',
    focusable: [
      "BODY",
      "input[type=text]",
      "input[type=password]",
      "input[type=checkbox]",
      "input[type=radio]",
      "input[type=submit]",
      "input[type=radio]",
      "select",
      "textarea",
      "button[type=button]",
      "input[type=text]",
      "a[href]",
      "a[href=\"\"]",
      "a.image-map",
      "iframe",
      "audio[controls]",
      "embed",
      "keygen",
      "svg",
      "svg a[xlink|href]",
      "text",
      "[contenteditable]",
      "[tabindex=-2]",
      "[tabindex=-1]",
      "[tabindex=0]",
      "[tabindex=1]",
      "[tabindex=+2]",
      "[tabindex= +2]",
      "[tabindex=3 ]",
      "fieldset[tabindex=0][disabled]",
      "{hidden} > a{visible}",
      "{hidden} > {visible} > a",
      "table tr td a",
      "table tr{collapse} td a{visible}"
    ],
    tabOrder: [
      "[tabindex=1]",
      "[tabindex=1]",
      "[tabindex=+2]",
      "[tabindex= +2]",
      "[tabindex=3 ]",
      "input[type=text]",
      "input[type=password]",
      "input[type=checkbox]",
      "input[type=radio]",
      "input[type=submit]",
      "input[type=radio]",
      "select",
      "textarea",
      "button[type=button]",
      "audio[controls]",
      "keygen",
      "svg",
      "text",
      "[contenteditable]",
      "[tabindex=0]",
      "fieldset[tabindex=0][disabled]"
    ]
  };
});