define([], function() {
  'use strict';

  function makeFocusableForeignObject() {
    var fragment = document.createElement('div');
    fragment.innerHTML = '<svg><foreignObject width="30" height="30">'
      + '<input type="text" data-label="ignore" />'
      + '</foreignObject><svg>';

    return fragment.firstChild.firstChild;
  }

  function focusSvgElementByForeignObject(element) {
    // Edge13, Edge14: foreignObject focus hack
    // https://jsbin.com/kunehinugi/edit?html,js,output
    // https://jsbin.com/fajagi/3/edit?html,js,output
    var isSvgElement = element.ownerSVGElement || element.nodeName.toLowerCase() === 'svg';
    if (!isSvgElement) {
      return;
    }

    // wrap the element in a focusable <g> to capture invalid redirections
    var g = document.createElement('g');
    g.setAttribute('data-label', 'ignore');
    g.setAttribute('tabindex', '-1');
    g.setAttribute('focusable', 'true');
    element.parentNode.replaceChild(g, element);
    g.appendChild(element);

    // inject and focus an <input> element into the SVG element to receive focus
    var foreignObject = makeFocusableForeignObject();
    element.appendChild(foreignObject);
    var input = foreignObject.querySelector('input');
    input.focus();

    // upon disabling the activeElement, IE and Edge
    // will not shift focus to <body> like all the other
    // browsers, but instead find the first focusable
    // ancestor and shift focus to that
    input.disabled = true;

    // we need to wait for evaluation of focus before we can clean up
    return function() {
      g.parentNode.replaceChild(element, g);
      element.removeChild(element.lastChild);
    };
  }

  function noop() {

  }

  function focusElement(element) {
    if (element.focus) {
      element.focus();
      return noop;
    }

    try {
      HTMLElement.prototype.focus.call(element);
      return noop;
    } catch (e) {
      // IGNORE
    }

    return focusSvgElementByForeignObject(element);
  }

  return focusElement;
});
