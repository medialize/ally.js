
// Element.prototype.matches may not be available under that name
// expose polyfill as a function because we might need to apply it to an iframe
export default function polyfill(root) {
  if (root.Element.prototype.matches) {
    return;
  }

  // first try to unprefix an existing implementation
  'webkitMatchesSelector mozMatchesSelector msMatchesSelector'.split(' ').some(function(key) {
    if (!root.Element.prototype[key]) {
      return false;
    }

    root.Element.prototype.matches = root.Element.prototype[key];
    return true;
  });
}

polyfill(window);
