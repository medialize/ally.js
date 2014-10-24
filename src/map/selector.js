define(function defineMapSelector(require) {
  'use strict';

  var map = {
    // TODO: focusable <svg> child elements? - `svg a[xlink|href]`
    // TODO: focusable link[itemprop][href]? - apparently from https://html.spec.whatwg.org/multipage/microdata.html#microdata
    // TODO: focusable interactive content? - http://www.w3.org/TR/html5/dom.html#interactive-content

    // http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
    focusable: 'a[href],'
      // validity determined by dom/is-focusable.js
      // TODO: area[href] probably needs to be replaced my img[usemap]
      + 'area[href],'
      // validity determined by dom/is-focusable.js
      + 'input, select, textarea, button,'
      // browsing context containers
      + 'iframe, object, embed'
      // validity determined by dom/is-focusable.js
      + '[tabindex],'
      // editing hosts
      + '[contenteditable]',
  };

  return map;
});