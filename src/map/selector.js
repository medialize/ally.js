define(function defineMapSelector(require) {
  'use strict';

  var map = {
    // TODO: what about focusing <svg> elements?
    focusable: 'a[href], area[href],'
      // TODO: spec says link[href] is tabbable?!
      + 'input, select, textarea, button,' 
      + 'iframe, object, embed'
      // FIXME: [tabindex=""] is not focusable, is it?
      + '[tabindex], [contenteditable]',
  };

  return map;
});