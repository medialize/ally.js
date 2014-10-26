define(function defineMapSelector(require) {
  'use strict';

  var map = {
    // http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
    focusable: 'body,'
      // navigational elements
      // FIXME: Finding links in SVGs fails because of namespaced-attribute-selector
      // Chrome Error: Uncaught NamespaceError: Failed to execute 'querySelectorAll' on 'Document': '…' contains namespaces, which are not supported. 
      // Firefox Error: SyntaxError: An invalid or illegal string was specified
      // + 'a[href], svg a[xlink|href],'
      + 'a[href],'
      // validity determined by dom/is-focusable.js
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