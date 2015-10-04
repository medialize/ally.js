
// determine if an element can be focused by keyboard (i.e. is part of the document's sequential focus navigation order)

import platform from 'platform';
import tabindexValue from '../util/tabindex-value';
import {
  getImageOfArea,
  hasCssOverflowScroll,
  isScrollableContainer,
  isUserModifyWritable,
} from './is.util';

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
  const _tabindex = tabindexValue(element);
  const tabindex = _tabindex === null ? null : _tabindex >= 0;

  // NOTE: Firefox 31 considers [contenteditable] to have [tabindex=-1], but allows tabbing to it
  // fixed in Firefox 40 the latest - https://bugzilla.mozilla.org/show_bug.cgi?id=1185657
  if (element.hasAttribute('contenteditable')) {
    // tabbing can still be disabled by explicitly providing [tabindex="-1"]
    return tabindex !== false;
  }

  if (focusableElementsPattern.test(nodeName) && tabindex !== true) {
    return false;
  }

  // in Trident and Gecko SVGElement does not know about the tabIndex property
  if (element.tabIndex === undefined) {
    return false;
  }

  if (nodeName === 'audio') {
    if (!element.hasAttribute('controls')) {
      // In Internet Explorer the <audio> element is focusable, but not tabbable, and tabIndex property is wrong
      return false;
    } else if (platform.name === 'Chrome' || platform.name === 'Chrome Mobile') {
      // In Chrome <audio controls tabindex="-1"> remains keyboard focusable
      return true;
    }
  }

  if (nodeName === 'video') {
    if (!element.hasAttribute('controls')) {
      if (platform.name === 'IE') {
        // In Internet Explorer the <video> element is focusable, but not tabbable, and tabIndex property is wrong
        return false;
      }
    } else if (platform.name === 'Chrome' || platform.name === 'Firefox') {
      // In Chrome and Firefox <video controls tabindex="-1"> remains keyboard focusable
      return true;
    }
  }

  if (nodeName === 'embed' || nodeName === 'object') {
    if (platform.layout === 'Blink' || platform.layout === 'WebKit') {
      // In all Blink and WebKit based browsers <embed> and <object> are never keyboard focusable, even with tabindex="0" set
      return false;
    }
  }

  if (platform.name === 'Safari' && parseFloat(platform.version) < 9 && platform.os.family === 'iOS') {
    // iOS 8 only considers a hand full of elements tabbable (keyboard focusable)
    // this holds true even with external keyboards
    let potentiallyTabbable = (nodeName === 'input' && element.type === 'text' || element.type === 'password')
      || nodeName === 'select'
      || nodeName === 'textarea'
      || element.hasAttribute('contenteditable');

    if (!potentiallyTabbable) {
      const style = window.getComputedStyle(element, null);
      potentiallyTabbable = isUserModifyWritable(style);
    }

    if (!potentiallyTabbable) {
      return false;
    }
  }

  if (platform.name === 'Firefox') {
    // Firefox considers scrollable containers keyboard focusable,
    // even though their tabIndex property is -1
    const style = window.getComputedStyle(element, null);
    if (hasCssOverflowScroll(style)) {
      // value of tabindex takes precedence
      return tabindex !== false;
    }
  }

  if (platform.name === 'IE') {
    // IE degrades <area> to script focusable, if the image
    // using the <map> has been given tabindex="-1"
    if (nodeName === 'area') {
      const img = getImageOfArea(element);
      if (img && tabindexValue(img) < 0) {
        return false;
      }
    }

    const style = window.getComputedStyle(element, null);
    if (isUserModifyWritable(style)) {
      // prevent being swallowed by the overzealous isScrollableContainer() below
      return element.tabIndex >= 0;
    }

    // IE considers scrollable containers script focusable only,
    // even though their tabIndex property is 0
    if (isScrollableContainer(element, nodeName)) {
      return false;
    }

    const parent = element.parentNode;
    // IE considers scrollable bodies script focusable only,
    if (isScrollableContainer(parent, nodeName)) {
      return false;
    }

    // Children of focusable elements with display:flex are focusable in IE10-11,
    // even though their tabIndex property suggests otherwise
    const parentStyle = window.getComputedStyle(parent, null);
    if (parentStyle.display.indexOf('flex') > -1) {
      return false;
    }
  }

  // http://www.w3.org/WAI/PF/aria-practices/#focus_tabindex
  return element.tabIndex >= 0;
}
