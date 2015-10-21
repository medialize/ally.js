
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
import elementDisabled from '../element/disabled';
import {getParentComparator} from '../util/compare-position';

function makeElementInert(element) {
  return elementDisabled(element, true);
}

function undoElementInert(element) {
  return elementDisabled(element, false);
}

const observerConfig = {
  attributes: true,
  childList: true,
  subtree: true,
  attributeFilter: ['tabindex'],
};

class InertSubtree {
  constructor({context, filter} = {}) {
    this._context = nodeArray(context || document.documentElement)[0];
    this._filter = nodeArray(filter);

    this.disengage = this.disengage.bind(this);
    this.handleMutation = this.handleMutation.bind(this);
    this.renderInert = this.renderInert.bind(this);
    this.filterElements = this.filterElements.bind(this);

    const focusable = queryFocusable({
      context: this._context,
      includeContext: true,
      strategy: 'all',
    });

    this.renderInert(focusable);
    this.startObserver();
  }

  disengage() {
    if (!this._context) {
      return;
    }

    undoElementInert(this._context);
    [].forEach.call(this._context.querySelectorAll('[data-ally-disabled], :disabled'), undoElementInert);

    this._filter = null;
    this._context = null;
    this._observer && this._observer.disconnect();
    this._observer = null;
  }

  listQueryFocusable(list) {
    return list
      // find all focusable elements within the given contexts
      .map(element => queryFocusable({context: element, includeContext: true, strategy: 'all'}))
      // flatten nested arrays
      .reduce((previous, current) => previous.concat(current), []);
  }

  renderInert(elements) {
    elements.filter(this.filterElements).forEach(makeElementInert);
  }

  filterContext(element) {
    // ignore elements that are not within the context sub-trees
    const isParentOfElement = getParentComparator({element, includeSelf: true});
    return isParentOfElement(this._context);
  }

  filterElements(element) {
    if (element === document.body && !element.hasAttribute('tabindex')) {
      // ignore the body (default focus element) unless it was made focusable
      return false;
    }

    // ignore elements within the exempted sub-trees
    const isParentOfElement = getParentComparator({element, includeSelf: true});
    return !this._filter.some(isParentOfElement);
  }

  startObserver() {
    if (!window.MutationObserver) {
      // not supporting IE10 via Mutation Events, because they're too expensive
      // https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Mutation_events
      return;
    }
    // http://caniuse.com/#search=mutation
    // https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver
    this._observer = new MutationObserver(mutations => mutations.forEach(this.handleMutation));
    this._observer.observe(this._context, observerConfig);
  }

  handleMutation(mutation) {
    if (mutation.type === 'childList') {
      const addedElements = nodeArray(mutation.addedNodes).filter(element => element.nodeType === Node.ELEMENT_NODE);
      if (!addedElements.length) {
        return;
      }

      const addedFocusableElements = this.listQueryFocusable(addedElements);
      this.renderInert(addedFocusableElements);
    } else if (mutation.type === 'attribute' && !this.filterElements(mutation.target) && this.filterContext(mutation.target)) {
      makeElementInert(mutation.target);
    }
  }
}

export default function({context, filter} = {}) {
  var service = new InertSubtree({context, filter});
  return { disengage: service.disengage };
}
