define(function defineMapSelector(require) {
  'use strict';

  var map = {
    // http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
    focusable: 'body,'
      // navigational elements
      // Namespace problems of [xlink:href] explained in http://stackoverflow.com/a/23047888/515124
      + 'a[href], svg a[*|href],'
      // validity determined by dom/is-focusable.js
      // TODO: figure out why no browser makes area[href] focusable
      + 'area[href],'
      // validity determined by dom/is-focusable.js
      + 'input, select, textarea, button,'
      // browsing context containers
      + 'iframe, object, embed,'
      // interactive content
      // FIXME: Chrome does not understand the controls attribute, it will remove it from the DOM while parsing the document
      + 'audio[controls], video[controls], keygen,'
      // validity determined by dom/is-focusable.js
      + '[tabindex],'
      // editing hosts
      + '[contenteditable]',
  };

  return map;
});