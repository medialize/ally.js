define(function defineDomIsTabbable(require) {
  'use strict';

  function isTabbable(element) {
    var nodeName = element.nodeName.toLowerCase();

    // FIXME: tabbable filter is only true for Chrome
    if (nodeName === 'object' || nodeName === 'embed') {
      return false;
    }

    // http://www.w3.org/WAI/PF/aria-practices/#focus_tabindex
    return element.tabIndex >= 0;
  }

  return isTabbable;
});