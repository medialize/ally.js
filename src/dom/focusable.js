// http://www.w3.org/WAI/PF/aria-practices/#keyboard
define(function defineDomFocusable() {
  var selector = 'a[href], area[href],'
    + 'input, select, textarea, button,' 
    + 'iframe, object, embed',
    + '[tabindex], [contenteditable]';

  function focusable(context) {
    var elements = context.querySelectorAll(selector);
    return [].slice.call(elements, 0);
  }

  return focusable;
});