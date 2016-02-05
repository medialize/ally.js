
function getFunctionName(func) {
  const s = String(func).match(/function\s+([^\(]+)\(/);
  return s && s[1] || null;
}

const result = typeof Element !== 'undefined' && (function() {
  // in Chrome < 47 the focus method lived on Element, instead of HTMLElement
  const hasElementFocus = Boolean(Element.prototype.focus);
  // in Chrome >= 47 HTMLElement.focus and SVGElement.focus different functions
  // src/prototype/svgelement.prototype.focus.js clones HTMLElement.focus to SVGElement.focus
  const hasNativeSvgFocus = SVGElement.prototype.focus !== HTMLElement.prototype.focus
    // src/prototype/svgelement.prototype.focus.js adds a safety-filler for Firefox
    && getFunctionName(SVGElement.prototype.focus) === 'focus';

  return Boolean(hasElementFocus || hasNativeSvgFocus);
})();

export default function() {
  return result;
}
