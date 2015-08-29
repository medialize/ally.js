
import platform from 'platform';
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

  if ((nodeName === 'object' || nodeName === 'embed') && element.getAttribute('type') === 'image/svg+xml' && platform.name === 'IE') {
    // Internet Explorer cannot focus, but tab to: object[type="image/svg+xml"]
    // [tabindex=-1] negates the tabbing
    return tabindex === null || tabindex >= 0;
  }

  if (nodeName === 'svg' && platform.name === 'IE') {
    // <svg tabindex="-1"> is still considered tabbable
    return true;
  }

  if (element instanceof SVGElement && nodeName === 'a' && element.hasAttribute('xlink:href')) {
    // any focusable child of <svg> cannot be focused, but tabbed to
    return platform.name === 'IE' || platform.name === 'Firefox';
  }

  return false;
}
