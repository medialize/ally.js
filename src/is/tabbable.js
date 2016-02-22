
// determine if an element can be focused by keyboard (i.e. is part of the document's sequential focus navigation order)

import isVisible from './visible';
import contextToElement from '../util/context-to-element';
import tabindexValue from '../util/tabindex-value';
import focusRelevant from './focus-relevant';
import getFrameElement from '../util/get-frame-element';
import platform from '../util/platform';
import {getImageOfArea} from '../util/image-map';
import {
  hasCssOverflowScroll,
  hasCssDisplayFlex,
  isScrollableContainer,
  isUserModifyWritable,
} from './is.util';

// Internet Explorer 11 considers fieldset, table, td focusable, but not tabbable
// Internet Explorer 11 considers body to have [tabindex=0], but does not allow tabbing to it
const focusableElementsPattern = /^(fieldset|table|td|body)$/;

let isFocusRelevantWithoutFlexbox;
let isTabbableWithoutFlexbox;

function isTabbableRules({
  context,
  except = {
    flexbox: false,
    scrollable: false,
    shadow: false,
    visible: false,
    onlyTabbable: false,
  },
} = {}) {
  const element = contextToElement({
    message: 'is/tabbable requires an argument of type Element',
    resolveDocument: true,
    context,
  });

  if (platform.is.BLINK && platform.is.ANDROID && platform.majorVersion > 42) {
    // External keyboard support worked fine in CHrome 42, but stopped working in Chrome 45.
    // The on-screen keyboard does not provide a way to focus the next input element (like iOS does).
    // That leaves us with no option to advance focus by keyboard, ergo nothing is tabbable (keyboard focusable).
    return false;
  }

  const frameElement = getFrameElement(element);
  if (frameElement) {
    if (platform.is.WEBKIT && platform.is.IOS && platform.majorVersion < 10) {
      // iOS only does not consider anything from another browsing context keyboard focusable
      return false;
    }

    // iframe[tabindex="-1"] and object[tabindex="-1"] inherit the
    // tabbable demotion onto elements of their browsing contexts
    if (tabindexValue(frameElement) < 0) {
      return false;
    }

    if (!except.visible && (platform.is.BLINK || platform.is.WEBKIT) && !isVisible(frameElement)) {
      // Blink and WebKit consider elements in hidden browsing contexts focusable, but not tabbable
      return false;
    }

    // Webkit and Blink don't consider anything in <object> tabbable
    const frameNodeName = frameElement.nodeName.toLowerCase();
    if (frameNodeName === 'object' && (platform.is.BLINK || platform.is.WEBKIT)) {
      return false;
    }
  }

  const nodeName = element.nodeName.toLowerCase();
  const _tabindex = tabindexValue(element);
  const tabindex = _tabindex === null ? null : _tabindex >= 0;
  const hasTabbableTabindexOrNone = tabindex !== false;
  const hasTabbableTabindex = _tabindex !== null && _tabindex >= 0;

  // NOTE: Firefox 31 considers [contenteditable] to have [tabindex=-1], but allows tabbing to it
  // fixed in Firefox 40 the latest - https://bugzilla.mozilla.org/show_bug.cgi?id=1185657
  if (element.hasAttribute('contenteditable')) {
    // tabbing can still be disabled by explicitly providing [tabindex="-1"]
    return hasTabbableTabindexOrNone;
  }

  if (focusableElementsPattern.test(nodeName) && tabindex !== true) {
    return false;
  }

  // in Trident and Gecko SVGElement does not know about the tabIndex property
  if (element.tabIndex === undefined) {
    return Boolean(except.onlyTabbable);
  }

  if (nodeName === 'audio') {
    if (!element.hasAttribute('controls')) {
      // In Internet Explorer the <audio> element is focusable, but not tabbable, and tabIndex property is wrong
      return false;
    } else if (platform.is.BLINK) {
      // In Chrome <audio controls tabindex="-1"> remains keyboard focusable
      return true;
    }
  }

  if (nodeName === 'video') {
    if (!element.hasAttribute('controls')) {
      if (platform.is.TRIDENT) {
        // In Internet Explorer the <video> element is focusable, but not tabbable, and tabIndex property is wrong
        return false;
      }
    } else if (platform.is.BLINK || platform.is.GECKO) {
      // In Chrome and Firefox <video controls tabindex="-1"> remains keyboard focusable
      return true;
    }
  }

  if (nodeName === 'object') {
    if (platform.is.BLINK || platform.is.WEBKIT) {
      // In all Blink and WebKit based browsers <embed> and <object> are never keyboard focusable, even with tabindex="0" set
      return false;
    }
  }

  if (nodeName === 'iframe') {
    // In Internet Explorer all iframes are only focusable
    // In WebKit, Blink and Gecko iframes may be tabbable depending on content.
    // Since we can't reliably investigate iframe documents because of the
    // SameOriginPolicy, we're declaring everything only focusable.
    return false;
  }

  if (platform.is.WEBKIT && platform.is.IOS) {
    // iOS only considers a hand full of elements tabbable (keyboard focusable)
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

  if (platform.is.GECKO) {
    // Firefox considers scrollable containers keyboard focusable,
    // even though their tabIndex property is -1
    const style = window.getComputedStyle(element, null);
    if (hasCssOverflowScroll(style)) {
      return hasTabbableTabindexOrNone;
    }
  }

  if (platform.is.TRIDENT) {
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

    if (!except.flexbox && hasCssDisplayFlex(style)) {
      if (_tabindex !== null) {
        return hasTabbableTabindex;
      }

      return isFocusRelevantWithoutFlexbox(element) && isTabbableWithoutFlexbox(element);
    }

    // IE considers scrollable containers script focusable only,
    // even though their tabIndex property is 0
    if (isScrollableContainer(element, nodeName)) {
      return false;
    }

    const parent = element.parentElement;
    if (parent) {
      const parentNodeName = parent.nodeName.toLowerCase();
      const parentStyle = window.getComputedStyle(parent, null);
      // IE considers scrollable bodies script focusable only,
      if (isScrollableContainer(parent, nodeName, parentNodeName, parentStyle)) {
        return false;
      }

      // Children of focusable elements with display:flex are focusable in IE10-11,
      // even though their tabIndex property suggests otherwise
      if (hasCssDisplayFlex(parentStyle)) {
        // value of tabindex takes precedence
        return hasTabbableTabindex;
      }
    }
  }

  // http://www.w3.org/WAI/PF/aria-practices/#focus_tabindex
  return element.tabIndex >= 0;
}

// bind exceptions to an iterator callback
isTabbableRules.except = function(except = {}) {
  const isTabbable = function(context) {
    return isTabbableRules({
      context,
      except,
    });
  };

  isTabbable.rules = isTabbableRules;
  return isTabbable;
};

isFocusRelevantWithoutFlexbox = focusRelevant.rules.except({flexbox: true});
isTabbableWithoutFlexbox = isTabbableRules.except({flexbox: true});

// provide isTabbable(context) as default iterator callback
const isTabbable = isTabbableRules.except({});
export default isTabbable;
