define(function defineDomIsTabbable(require) {
  'use strict';

  function isTabbable(element) {
    var nodeName = element.nodeName.toLowerCase();

    // Firefox 31 considers [contenteditable] to have [tabindex=-1], but allows tabbing to it
    if (element.hasAttribute('contenteditable')) {
      return true;
    }

    // NOTE: rather make something tabbable that is only focusable,
    // than prevent something from being tabbable at all, this filter
    // can return elements that a browser does not deem tabbable (only focusable)

    // http://www.w3.org/WAI/PF/aria-practices/#focus_tabindex
    return element.tabIndex >= 0;
  }

  return isTabbable;
});