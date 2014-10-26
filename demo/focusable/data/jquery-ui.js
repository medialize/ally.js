define(function defineDemoFocusableA11y(require) {
  'use strict';

  // The contents of this file have been collected by running focusable/index.html in chrome

  return {
    name: 'jQuery UI',
    userAgent: 'jQuery UI 1.11.2',
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
      "object",
      "object[usemap]",
      "[tabindex=-2]",
      "[tabindex=-1]",
      "[tabindex=0]",
      "[tabindex=1]",
      "[tabindex=+2]",
      "[tabindex= +2]",
      "[tabindex=\"\"]",
      "[tabindex=3 ]",
      "fieldset[tabindex=0][disabled]",
      "table tr td a",
      "table tr{collapse} td a",
      "table tr{collapse} td a{visible}"
    ],
    tabOrder: []
  };
});