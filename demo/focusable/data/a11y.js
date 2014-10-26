define(function defineDemoFocusableA11y(require) {
  'use strict';

  // The contents of this file have been collected by running focusable/index.html

  return {
    name: 'a11y.js',
    userAgent: 'a11y.js',
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
      "a[href]",
      "a[href=\"\"]",
      "a.image-map",
      "iframe",
      "audio[controls]",
      "embed",
      "object",
      "object[usemap]",
      "keygen",
      "[contenteditable]",
      "[tabindex=-2]",
      "[tabindex=-1]",
      "[tabindex=0]",
      "[tabindex=1]",
      "[tabindex=+2]",
      "[tabindex= +2]",
      "{hidden} > a{visible}",
      "{hidden} > {visible} > a",
      "table tr td a",
      "table tr{collapse} td a{visible}"
    ],
    tabOrder: []
  };
});