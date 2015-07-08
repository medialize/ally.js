define(function defineFocusDisable(require) {
  'use strict';

  var nodeArray = require('../dom/node-array');
  var queryFocusable = require('../dom/query-focusable');

  /*
    inert attribute was [removed](https://html5.org/r/8536) [tweet by steve](https://twitter.com/stevefaulkner/status/443075900201259008) 
    but definition of [inert subtrees](http://www.w3.org/html/wg/drafts/html/master/editing.html#inert-subtrees) remains. 
  
    [implementation idea by Vasilis](http://codepen.io/vasilisvg/pen/scowI)
    [inert attribute polyfill by GoogleChrome](https://github.com/GoogleChrome/inert-polyfill) 

    [Gecko Bug: Inert Attribute](https://bugzilla.mozilla.org/show_bug.cgi?id=921504)
    [Chromium Bug: Inert Attribute](https://code.google.com/p/chromium/issues/detail?id=269846)
    [Chromium Bug: Inert Subtree](https://code.google.com/p/chromium/issues/detail?id=241699)
    [WebKit Bug: Inert Subtree](https://bugs.webkit.org/show_bug.cgi?id=110952)
  */

  var observeExcept = null;

  function disabledFocus() {
    console.warn('trying to focus inert element', this);
  }

  function makeElementInert(element) {
    // remember previous tabindex so we can restore it
    var tabIndex = element.getAttribute('tabindex');
    // IE11 parses tabindex="" as the value "-32768"
    element.setAttribute('data-inert-tabindex', tabIndex !== null && tabIndex !== '-32768' ? tabIndex : '');
    // remove element from sequential focus navigation order
    element.setAttribute('tabindex', '-1');
    // make sure no script can focus the element
    // NOTE: we may need to check if hasOwn('focus') and restore
    element.focus = disabledFocus;
    // remember previous pointer events status so we can restore it
    var pointerEvents = element.style.pointerEvents || '';
    element.setAttribute('data-inert-pointer-events', pointerEvents);
    // make sure no pointer interaction can access the element
    element.style.pointerEvents = 'none';
    // Chrome leaves <video controls tabindex="-1"> in document focus navigation sequence
    var nodeName = element.nodeName.toLowerCase();
    if (element.hasAttribute('controls') && (nodeName === 'video' || nodeName === 'audio')) {
      element.setAttribute('data-inert-controls', '');
    }
  }

  function undoElementInert(element) {
    // restore original focus function from prototype
    delete element.focus;
    // restore to previous pointer interaction status
    var pointerEvents = element.getAttribute('data-inert-pointer-events');
    element.removeAttribute('data-inert-pointer-events');
    element.style.pointerEvents = pointerEvents;
    // restore tabindex
    var tabIndex = element.getAttribute('data-inert-tabindex');
    element.removeAttribute('data-inert-tabindex');
    if (tabIndex === '') {
      // the element did not have a tabindex, but was naturally tabbable
      element.removeAttribute('tabindex');
    } else {
      element.setAttribute('tabindex', tabIndex);
    }
    // restore <video controls>
    var restoreControls = element.hasAttribute('data-inert-controls');
    element.removeAttribute('data-inert-controls');
    if (restoreControls) {
      element.setAttribute('controls', '');
    }
  }

  function filterExemptedElements(element) {
    if (element === document.body && !element.hasAttribute('tabindex')) {
      // ignore the body (default focus element) unless it was made focusable
      return false;
    }

    // ignore elements within the exempted sub-trees
    return !observeExcept.some(function(_except) {
      // Node.compareDocumentPosition is available since IE9
      return element === _except || _except.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    });
  }

  function renderInert(elements) {
    elements.filter(filterExemptedElements).forEach(makeElementInert);
  }

  // http://caniuse.com/#search=mutation
  // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
  // not supporting IE10 via Mutation Events, because they're too expensive
  // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events
  var observer = window.MutationObserver && new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        renderInert(nodeArray(mutation.addedNodes));
      } else if (mutation.type === 'attribute' && !filterExemptedElements(mutation.target)) {
        makeElementInert(mutation.target);
      }
    });    
  });

  var observerConfig = {
    attributes: true,
    childList: true,
    subtree: true,
    attributeFilter: ['tabindex'],
  };

  function undoInert() {
    observeExcept = null;
    observer && observer.disconnect();
    nodeArray('[data-inert-tabindex]').forEach(undoElementInert);
  }

  function makeInert(except) {
    if (!observeExcept) {
      undoInert();
    }

    observeExcept = nodeArray(except);
    renderInert(queryFocusable(document.documentElement));
    observer && observer.observe(document.documentElement, observerConfig);

    return undoInert;
  }

  return makeInert;
});