define(function defineDomIsTabbable(require) {
  'use strict';

  var isValidTabindex = require('./is-valid-tabindex');

  // Internet Explorer 11 considers fieldset, table, td focusable, but not tabbable
  // Internet Explorer 11 considers body to have [tabindex=0], but does not allow tabbing to it
  var focusableElementsPattern = /^(fieldset|table|td|body)$/;

  function isTabbable(element) {
    var nodeName = element.nodeName.toLowerCase();
    var requireTabindexAttriute = false;
    // null: not set, true: tabbable, false: focusable
    var tabindex = element.hasAttribute('tabindex') && isValidTabindex(element)
      ? parseInt(element.getAttribute('tabindex'), 10) >= 0
      : null;

    // Firefox 31 considers [contenteditable] to have [tabindex=-1], but allows tabbing to it
    if (element.hasAttribute('contenteditable')) {
      // tabbing can still be disabled by explicitly providing [tabindex="-1"]
      return tabindex !== false;
    }

    if (focusableElementsPattern.test(nodeName) && tabindex !== true) {
      return false;
    }

    // in Trident and Gecko SVGElement does not know about the tabIndex property
    if (element.tabIndex === undefined) {
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