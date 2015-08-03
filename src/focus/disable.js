
/*
  Utility to make a sub-tree of the DOM inert. Inert means the elements cannot be interacted
  with and they cannot be focused via script, pointer or keyboard.

  inert attribute was [removed](https://html5.org/r/8536) [tweet by steve](https://twitter.com/stevefaulkner/status/443075900201259008)
  but definition of [inert subtrees](http://www.w3.org/html/wg/drafts/html/master/editing.html#inert-subtrees) remains.

  [implementation idea by Vasilis](http://codepen.io/vasilisvg/pen/scowI)
  [inert attribute polyfill by GoogleChrome](https://github.com/GoogleChrome/inert-polyfill)

  [Gecko Bug: Inert Attribute](https://bugzilla.mozilla.org/show_bug.cgi?id=921504)
  [Chromium Bug: Inert Attribute](https://code.google.com/p/chromium/issues/detail?id=269846)
  [Chromium Bug: Inert Subtree](https://code.google.com/p/chromium/issues/detail?id=241699)
  [WebKit Bug: Inert Subtree](https://bugs.webkit.org/show_bug.cgi?id=110952)
*/

import nodeArray from '../util/node-array';
import queryFocusable from '../query/focusable';

function disabledFocus() {
  /*eslint-disable no-console */
  console.warn('trying to focus inert element', this);
  /*eslint-enable no-console */
}

function makeElementInert(element) {
  // remember previous tabindex so we can restore it
  const tabIndex = element.getAttribute('tabindex');
  // IE11 parses tabindex="" as the value "-32768"
  element.setAttribute('data-inert-tabindex', tabIndex !== null && tabIndex !== '-32768' ? tabIndex : '');
  // remove element from sequential focus navigation order
  element.setAttribute('tabindex', '-1');
  // make sure no script can focus the element
  // NOTE: we may need to check if hasOwn('focus') and restore
  element.focus = disabledFocus;
  // remember previous pointer events status so we can restore it
  const pointerEvents = element.style.pointerEvents || '';
  element.setAttribute('data-inert-pointer-events', pointerEvents);
  // make sure no pointer interaction can access the element
  element.style.pointerEvents = 'none';
  // Chrome leaves <video controls tabindex="-1"> in document focus navigation sequence
  const nodeName = element.nodeName.toLowerCase();
  if (element.hasAttribute('controls') && (nodeName === 'video' || nodeName === 'audio')) {
    element.setAttribute('data-inert-controls', '');
  }
}

function undoElementInert(element) {
  // restore original focus function from prototype
  delete element.focus;
  // restore to previous pointer interaction status
  const pointerEvents = element.getAttribute('data-inert-pointer-events');
  element.removeAttribute('data-inert-pointer-events');
  element.style.pointerEvents = pointerEvents;
  // restore tabindex
  const tabIndex = element.getAttribute('data-inert-tabindex');
  element.removeAttribute('data-inert-tabindex');
  if (tabIndex === '') {
    // the element did not have a tabindex, but was naturally tabbable
    element.removeAttribute('tabindex');
  } else {
    element.setAttribute('tabindex', tabIndex);
  }
  // restore <video controls>
  const restoreControls = element.hasAttribute('data-inert-controls');
  element.removeAttribute('data-inert-controls');
  if (restoreControls) {
    element.setAttribute('controls', '');
  }
}

const observerConfig = {
  attributes: true,
  childList: true,
  subtree: true,
  attributeFilter: ['tabindex'],
};

class InertSubtree {
  constructor({context, filter} = {}) {
    this._context = nodeArray(context || document.documentElement);
    this._filter = nodeArray(filter);

    this.disengage = this.disengage.bind(this);
    this.handleMutations = this.handleMutations.bind(this);
    this.handleMutation = this.handleMutation.bind(this);
    this.renderInert = this.renderInert.bind(this);
    this.filterContext = this.filterContext.bind(this);
    this.filterElements = this.filterElements.bind(this);

    const focusable = this._context
      // find all focusable elements within the given contexts
      .map(element => queryFocusable({context: element}))
      // flatten nested arrays
      .reduce((previous, current) => previous.concat(current), []);

    this.renderInert(focusable);
    this.startObserver();
  }

  disengage() {
    if (!this._context) {
      return;
    }

    this._context.forEach(function(element) {
      [].forEach.call(element.querySelectorAll('[data-inert-tabindex]'), undoElementInert);
    });

    this._filter = null;
    this._context = null;
    this._observer && this._observer.disconnect();
  }

  renderInert(elements) {
    elements.filter(this.filterElements).forEach(makeElementInert);
  }

  filterContext(element) {
    // ignore elements that are not within the context sub-trees
    return this._context.some(function(_context) {
      // Node.compareDocumentPosition is available since IE9
      return element === _context || _context.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    });
  }

  filterElements(element) {
    if (element === document.body && !element.hasAttribute('tabindex')) {
      // ignore the body (default focus element) unless it was made focusable
      return false;
    }

    // ignore elements within the exempted sub-trees
    return !this._filter.some(function(_except) {
      // Node.compareDocumentPosition is available since IE9
      return element === _except || _except.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_CONTAINED_BY;
    });
  }

  startObserver() {
    if (!window.MutationObserver) {
      // not supporting IE10 via Mutation Events, because they're too expensive
      // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events
      return;
    }
    // http://caniuse.com/#search=mutation
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    this._observer = new MutationObserver(this.handleMutations);
    this._observer.observe(
      // we don't need to observe the entire document unless there are multiple contexts in play
      this._context.length === 1 ? this._context[0] : document.documentElement,
      observerConfig
    );
  }

  handleMutations(mutations) {
    mutations.forEach(this.handleMutation);
  }

  handleMutation(mutation) {
    if (mutation.type === 'childList') {
      const addedNodes = nodeArray(mutation.addedNodes).filter(this.filterContext);
      this.renderInert(addedNodes);
    } else if (mutation.type === 'attribute' && !this.filterElements(mutation.target) && this.filterContext(mutation.target)) {
      makeElementInert(mutation.target);
    }
  }
}

export default function({context, filter} = {}) {
  var service = new InertSubtree({context, filter});
  return { disengage: service.disengage };
}
