
// determine if an element can be focused by keyboard (i.e. is part of the document's sequential focus navigation order)

import tabindexValue from '../util/tabindex-value';

// Internet Explorer 11 considers fieldset, table, td focusable, but not tabbable
// Internet Explorer 11 considers body to have [tabindex=0], but does not allow tabbing to it
const focusableElementsPattern = /^(fieldset|table|td|body)$/;

export default function(element) {
  if (element === document) {
    element = document.documentElement;
  }

  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError('is/tabbable requires an argument of type Element');
  }

  const nodeName = element.nodeName.toLowerCase();
  // null: not set, true: tabbable, false: focusable
  const _tabindex = tabindexValue(element);
  const tabindex = _tabindex === null ? null : _tabindex >= 0;

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

  // In Internet Explorer the <audio> element is focusable, but not tabbable, and tabIndex property is wrong
  if (nodeName === 'audio' && !element.hasAttribute('controls')) {
    return false;
  }

  // NOTE: rather make something tabbable that is only focusable,
  // than prevent something from being tabbable at all, this filter
  // can return elements that a browser does not deem tabbable (only focusable)

  // http://www.w3.org/WAI/PF/aria-practices/#focus_tabindex
  return element.tabIndex >= 0;
}
