
// determine if an element can be focused

// https://www.w3.org/TR/html5/editing.html#focus-management

// NOTE: The following known issues exist:
//   Gecko: `svg a[xlink|href]` is not identified as focusable (because SVGElement.prototype.focus is missing)
//   Blink, WebKit: SVGElements that have been made focusable by adding a focus event listener are not identified as focusable

import isFocusRelevant from './focus-relevant';
import isValidArea from './valid-area';
import isVisible from './visible';
import isDisabled from './disabled';
import isOnlyTabbable from './only-tabbable';
import contextToElement from '../util/context-to-element';
import getFrameElement from '../util/get-frame-element';
import tabindexValue from '../util/tabindex-value';

import _supports from '../supports/supports';
let supports;

function isOnlyFocusRelevant(element) {
  const nodeName = element.nodeName.toLowerCase();
  if (nodeName === 'embed' || nodeName === 'keygen') {
    // embed is considered focus-relevant but not focusable
    // see https://github.com/medialize/ally.js/issues/82
    return true;
  }

  const _tabindex = tabindexValue(element);
  if (element.shadowRoot && _tabindex === null) {
    // ShadowDOM host elements *may* receive focus
    // even though they are not considered focuable
    return true;
  }

  if (nodeName === 'label') {
    // <label tabindex="0"> is only tabbable in Firefox, not script-focusable
    // there's no way to make an element focusable other than by adding a tabindex,
    // and focus behavior of the label element seems hard-wired to ignore tabindex
    // in some browsers (like Gecko, Blink and WebKit)
    return !supports.focusLabelTabindex || _tabindex === null;
  }

  if (nodeName === 'legend') {
    return _tabindex === null;
  }

  if (supports.focusSvgFocusableAttribute && (element.ownerSVGElement || nodeName === 'svg')) {
    // Internet Explorer understands the focusable attribute introduced in SVG Tiny 1.2
    const focusableAttribute = element.getAttribute('focusable');
    return focusableAttribute && focusableAttribute === 'false';
  }

  if (nodeName === 'img' && element.hasAttribute('usemap')) {
    // Gecko, Trident and Edge do not allow an image with an image map and tabindex to be focused,
    // it appears the tabindex is overruled so focus is still forwarded to the <map>
    return _tabindex === null || !supports.focusImgUsemapTabindex;
  }

  if (nodeName === 'area') {
    // all <area>s are considered relevant,
    // but only the valid <area>s are focusable
    return !isValidArea(element);
  }

  return false;
}

function isFocusableRules({
  context,
  except = {
    disabled: false,
    visible: false,
    onlyTabbable: false,
  },
} = {}) {
  if (!supports) {
    supports = _supports();
  }

  const _isOnlyTabbable = isOnlyTabbable.rules.except({
    onlyFocusableBrowsingContext: true,
    visible: except.visible,
  });

  const element = contextToElement({
    label: 'is/focusable',
    resolveDocument: true,
    context,
  });

  const focusRelevant = isFocusRelevant.rules({
    context: element,
    except,
  });

  if (!focusRelevant || isOnlyFocusRelevant(element)) {
    return false;
  }

  if (!except.disabled && isDisabled(element)) {
    return false;
  }

  if (!except.onlyTabbable && _isOnlyTabbable(element)) {
    // some elements may be keyboard focusable, but not script focusable
    return false;
  }

  // elements that are not rendered, cannot be focused
  if (!except.visible) {
    const visibilityOptions = {
      context: element,
      except: {},
    };

    if (supports.focusInHiddenIframe) {
      // WebKit and Blink can focus content in hidden <iframe> and <object>
      visibilityOptions.except.browsingContext = true;
    }

    if (supports.focusObjectSvgHidden) {
      // Blink allows focusing the object element, even if it has visibility: hidden;
      // @browser-issue Blink https://code.google.com/p/chromium/issues/detail?id=586191
      const nodeName = element.nodeName.toLowerCase();
      if (nodeName === 'object') {
        visibilityOptions.except.cssVisibility = true;
      }
    }

    if (!isVisible.rules(visibilityOptions)) {
      return false;
    }
  }

  const frameElement = getFrameElement(element);
  if (frameElement) {
    const _nodeName = frameElement.nodeName.toLowerCase();
    if (_nodeName === 'object' && !supports.focusInZeroDimensionObject) {
      if (!frameElement.offsetWidth || !frameElement.offsetHeight) {
        // WebKit can not focus content in <object> if it doesn't have dimensions
        return false;
      }
    }
  }

  const nodeName = element.nodeName.toLowerCase();
  if (nodeName === 'svg' && supports.focusSvgInIframe && !frameElement && element.getAttribute('tabindex') === null) {
    return false;
  }

  return true;
}

// bind exceptions to an iterator callback
isFocusableRules.except = function(except = {}) {
  const isFocusable = function(context) {
    return isFocusableRules({
      context,
      except,
    });
  };

  isFocusable.rules = isFocusableRules;
  return isFocusable;
};

// provide isFocusRelevant(context) as default iterator callback
const isFocusable = isFocusableRules.except({});
export default isFocusable;
