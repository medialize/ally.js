define(function defineDemoFocusableA11y(require) {
  'use strict';

  // The contents of this file have been collected by running focusable/index.html

  return {
    name: 'a11y.js',
    userAgent: 'a11y.js',
    focusable: [
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
      "object",
      "object[usemap]",
      "[contenteditable]",
      "{hidden} > a{visible}",
      "{hidden} > {visible} > a",
      "table tr td a",
      "table tr{collapse} td a{visible}"
    ],
    tabOrder: []
  };
});