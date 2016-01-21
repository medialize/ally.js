
import contextToElement from '../util/context-to-element';
import getWindow from '../util/get-window';
import tabindexValue from '../util/tabindex-value';
import platform from '../util/platform';

function isOnlyTabbableRules({ context } = {}) {
  const element = contextToElement({
    message: 'is/only-tabbable requires an argument of type Element',
    resolveDocument: true,
    context,
  });

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
