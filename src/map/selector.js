defined(function defineMapSelector(require) {
  'use strict';

  var map = {
    focusable: 'a[href], area[href],'
      + 'input, select, textarea, button,' 
      + 'iframe, object, embed'
      // FIXME: [tabindex=""] is not focusable, is it?
      + '[tabindex], [contenteditable]',
  };

  return attributes;
});