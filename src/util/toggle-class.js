//
// This util allows to easily add, remove or toggle classes.
//
// Using it is neccessary as IE 9 doesn't support element classList
// and IE 11 doesn't support classList for SVG elements
// see also https://developer.mozilla.org/en/docs/Web/API/Element/classList
//
// This file is a replacement for domtokenlist because of
// https://github.com/medialize/ally.js/issues/147
//
// Usage:
//
// toggleClass(div, 'demo'); // Toggles the class `demo`
// toggleClass(div, 'demo', true); // Adds the class `demo`
// toggleClass(div, 'demo', false); // removes the class `demo`
//
// removeClass(div, 'demo');
// addClass(div, 'demo');
//

/**
 * Extract an array of all classNames of the given DOM or SVG node
 */
function getClassNames(element) {
  const className = element.getAttribute && element.getAttribute('class') || '';
  return className === '' ? [] : className.split(' ');
}

export function toggleClass(element, className, force) {
  const classNames = getClassNames(element);
  const idx = classNames.indexOf(className);
  const hasClass = idx !== -1;
  const shouldHaveClass = force !== undefined ? force : !hasClass;
  // Break if classes are already set/removed
  if (shouldHaveClass === hasClass) {
    return;
  }
  // Remove class
  if (!shouldHaveClass) {
    classNames.splice(idx, 1);
  }
  // Add class
  if (shouldHaveClass) {
    classNames.push(className);
  }
  element.setAttribute('class', classNames.join(' '));
}

export function removeClass(element, className) {
  return toggleClass(element, className, false);
}

export function addClass(element, className) {
  return toggleClass(element, className, true);
}
