function elementName(element) {
  if (!element) {
    return 'undefined';
  }
  return element.getAttribute('data-label') || element.nodeName;
}
// collect changes of document.activeElement
var activeElementHistory = [];
function observeActiveElement() {
  var _element = elementName(document.activeElement);
  if (document.activeElement !== document.body && activeElementHistory[activeElementHistory.length - 1] !== _element) {
    activeElementHistory.push(_element);
  }

  requestAnimationFrame(observeActiveElement);
}

observeActiveElement();
