
import isVisible from './visible';
import contextToElement from '../util/context-to-element';
import getFrameElement from '../util/get-frame-element';
import tabindexValue from '../util/tabindex-value';
import platform from '../util/platform';

function isOnlyTabbableRules({
  context,
  except = {
    onlyFocusableBrowsingContext: false,
    visible: false,
  },
} = {}) {
  const element = contextToElement({
    label: 'is/only-tabbable',
    resolveDocument: true,
    context,
  });

  if (!except.visible && !isVisible(element)) {
    return false;
  }

  if (!except.onlyFocusableBrowsingContext && (platform.is.GECKO || platform.is.TRIDENT || platform.is.EDGE)) {
    const frameElement = getFrameElement(element);
    if (frameElement) {
      if (tabindexValue(frameElement) < 0) {
        // iframe[tabindex="-1"] and object[tabindex="-1"] inherit the
        // tabbable demotion onto elements of their browsing contexts
        return false;
      }
    }
  }

  const nodeName = element.nodeName.toLowerCase();
  const tabindex = tabindexValue(element);

  if (nodeName === 'label' && platform.is.GECKO) {
    // Firefox cannot focus, but tab to: label[tabindex=0]
    return tabindex !== null && tabindex >= 0;
  }

  // SVG Elements were keyboard focusable but not script focusable before Firefox 51.
  // Firefox 51 added the focus management DOM API (.focus and .blur) to SVGElement,
  // see https://bugzilla.mozilla.org/show_bug.cgi?id=778654
  if (platform.is.GECKO && element.ownerSVGElement && !element.focus) {
    if (nodeName === 'a' && element.hasAttribute('xlink:href')) {
      // any focusable child of <svg> cannot be focused, but tabbed to
      if (platform.is.GECKO) {
        return true;
      }
    }
  }

  return false;
}

// bind exceptions to an iterator callback
isOnlyTabbableRules.except = function(except = {}) {
  const isOnlyTabbable = function(context) {
    return isOnlyTabbableRules({
      context,
      except,
    });
  };

  isOnlyTabbable.rules = isOnlyTabbableRules;
  return isOnlyTabbable;
};

// provide isOnlyTabbable(context) as default iterator callback
const isOnlyTabbable = isOnlyTabbableRules.except({});
export default isOnlyTabbable;
