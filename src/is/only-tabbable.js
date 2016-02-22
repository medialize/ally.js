
import isVisible from './visible';
import contextToElement from '../util/context-to-element';
import getFrameElement from '../util/get-frame-element';
import getWindow from '../util/get-window';
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
    message: 'is/only-tabbable requires an argument of type Element',
    resolveDocument: true,
    context,
  });

  if (!except.visible && !isVisible(element)) {
    return false;
  }

  if (!except.onlyFocusableBrowsingContext && (platform.is.GECKO || platform.is.TRIDENT)) {
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

  if (nodeName === 'svg' && platform.is.TRIDENT) {
    return element.getAttribute('focusable') !== 'false';
  }

  const _window = getWindow(element);
  if (element instanceof _window.SVGElement) {
    if (nodeName === 'a' && element.hasAttribute('xlink:href')) {
      // any focusable child of <svg> cannot be focused, but tabbed to
      if (platform.is.GECKO) {
        return true;
      }
      if (platform.is.TRIDENT) {
        return element.getAttribute('focusable') !== 'false';
      }
    }
    if (platform.is.TRIDENT) {
      return element.getAttribute('focusable') === 'true';
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
