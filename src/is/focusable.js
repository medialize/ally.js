
// determine if an element can be focused

// http://www.w3.org/TR/html5/editing.html#focus-management

// NOTE: The following known issues exist:
//   Gecko: `svg a[xlink|href]` is not identified as focusable (because SVGElement.prototype.focus is missing)
//   Blink, WebKit: SVGElements that have been made focusable by adding a focus event listener are not identified as focusable

import polyfillSVGElementPrototypeFocus from '../prototype/svgelement.prototype.focus';
import isFocusRelevant from './focus-relevant';
import isValidArea from './valid-area';
import isVisible from './visible';
import isDisabled from './disabled';
import isOnlyTabbable from './only-tabbable';
import contextToElement from '../util/context-to-element';
import getWindow from '../util/get-window';
import tabindexValue from '../util/tabindex-value';

import _supports from './focus-relevant.supports';
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
    // Shadow DOM host elements *may* receive focus
    // even though they are not considered focuable
    return true;
  }

  if (nodeName === 'label') {
    // <label tabindex="0"> is only tabbable in Firefox, not script-focusable
    // there's no way to make an element focusable other than by adding a tabindex,
    // and focus behavior of the label element seems hard-wired to ignore tabindex
    // in some browsers (like Gecko, Blink and WebKit)
    return !supports.canFocusLabelTabindex || _tabindex === null;
  }

  if (nodeName === 'legend' ) {
    return _tabindex === null;
  }

  const _window = getWindow(element);
  polyfillSVGElementPrototypeFocus(_window);
  if (supports.canFocusSvgFocusableAttribute && (element.ownerSVGElement || nodeName === 'svg')) {
    // Internet Explorer understands the focusable attribute introduced in SVG Tiny 1.2
    const focusableAttribute = element.getAttribute('focusable');
    return focusableAttribute && focusableAttribute === 'false';
  }

  if (nodeName === 'img' && element.hasAttribute('usemap')) {
    // Gecko, Trident and Edge do not allow an image with an image map and tabindex to be focused,
    // it appears the tabindex is overruled so focus is still forwarded to the <map>
    return _tabindex === null || !supports.canFocusImgUsemapTabindex;
  }

  if (nodeName === 'area') {
    // all <area>s are considered relevant,
    // but only the valid <area>s are focusable
    return !isValidArea(element);
  }

  return false;
}

const _isOnlyTabbable = isOnlyTabbable.rules.except({
  onlyFocusableBrowsingContext: true,
});

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

  const element = contextToElement({
    message: 'is/focusable requires an argument of type Element',
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
  if (!except.visible && !isVisible(element)) {
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
