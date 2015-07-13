
// Element.prototype.matches may not be available under that name

if (!Element.prototype.matches) {
  // first try to unprefix an existing implementation
  const prefixed = 'webkitMatchesSelector mozMatchesSelector msMatchesSelector'.split(' ').some(function(key) {
    if (!Element.prototype[key]) {
      return false;
    }

    Element.prototype.matches = Element.prototype[key];
    return true;
  });

  if (!prefixed) {
    // https://developer.mozilla.org/en-US/docs/Web/API/Element.matches#Polyfill
    Element.prototype.matches = function matchesSelectorPolyfill(selector) {
      const matches = (this.document || this.ownerDocument).querySelectorAll(selector);
      let i = 0;

      while (matches[i] && matches[i] !== this) {
        i++;
      }

      return Boolean(matches[i]);
    };

  }
}
