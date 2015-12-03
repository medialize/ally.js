
import platform from 'platform';
import getWindow from '../util/get-window';
import tabindexValue from '../util/tabindex-value';

export default function(element) {
  if (element === document) {
    element = document.documentElement;
  }

  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError('is/only-tabbable requires an argument of type Element');
  }

  const nodeName = element.nodeName.toLowerCase();
  const tabindex = tabindexValue(element);

  if (nodeName === 'label' && platform.name === 'Firefox') {
    // Firefox cannot focus, but tab to: label[tabindex=0]
    return tabindex !== null && tabindex >= 0;
  }

  if (nodeName === 'object' && element.getAttribute('type') === 'image/svg+xml' && platform.name === 'IE') {
    // Internet Explorer cannot focus, but tab to: object[type="image/svg+xml"]
    // [tabindex=-1] negates the tabbing
    return tabindex === null || tabindex >= 0;
  }

  if (nodeName === 'svg' && platform.name === 'IE') {
    return element.getAttribute('focusable') !== 'false';
  }

  const _window = getWindow(element);
  if (element instanceof _window.SVGElement) {
    if (nodeName === 'a' && element.hasAttribute('xlink:href')) {
      // any focusable child of <svg> cannot be focused, but tabbed to
      if (platform.name === 'Firefox') {
        return true;
      }
      if (platform.name === 'IE') {
        return element.getAttribute('focusable') !== 'false';
      }
    }
    if (platform.name === 'IE') {
      return element.getAttribute('focusable') === 'true';
    }
  }

  return false;
}
