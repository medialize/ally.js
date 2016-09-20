
/*
  Utility to make a sub-tree of the DOM inert. Inert means the elements cannot be interacted
  with and they cannot be focused via script, pointer or keyboard.

  inert attribute was [removed](https://html5.org/r/8536) [tweet by steve](https://twitter.com/stevefaulkner/status/443075900201259008)
  but definition of [inert subtrees](https://www.w3.org/html/wg/drafts/html/master/editing.html#inert-subtrees) remains.

  [implementation idea by Vasilis](https://codepen.io/vasilisvg/pen/scowI)
  [inert attribute polyfill by GoogleChrome](https://github.com/GoogleChrome/inert-polyfill)

  [Gecko Bug: Inert Attribute](https://bugzilla.mozilla.org/show_bug.cgi?id=921504)
  [Chromium Bug: Inert Attribute](https://code.google.com/p/chromium/issues/detail?id=269846)
  [Chromium Bug: Inert Subtree](https://code.google.com/p/chromium/issues/detail?id=241699)
  [WebKit Bug: Inert Subtree](https://bugs.webkit.org/show_bug.cgi?id=110952)
*/

import nodeArray from '../util/node-array';
import queryFocusable from '../query/focusable';
import elementDisabled from '../element/disabled';
import observeShadowMutations from '../observe/shadow-mutations';
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
  attributeFilter: ['tabindex', 'disabled', 'data-ally-disabled'],
};

class InertSubtree {
  constructor({context, filter} = {}) {
    this._context = nodeArray(context || document.documentElement)[0];
    this._filter = nodeArray(filter);
    this._inertElementCache = [];

    this.disengage = this.disengage.bind(this);
    this.handleMutation = this.handleMutation.bind(this);
    this.renderInert = this.renderInert.bind(this);
    this.filterElements = this.filterElements.bind(this);
    this.filterParentElements = this.filterParentElements.bind(this);

    const focusable = queryFocusable({
      context: this._context,
      includeContext: true,
      strategy: 'all',
    });

    this.renderInert(focusable);

    this.shadowObserver = observeShadowMutations({
      context: this._context,
      config: observerConfig,
      callback: mutations => mutations.forEach(this.handleMutation),
    });
  }

  disengage() {
    if (!this._context) {
      return;
    }

    undoElementInert(this._context);
    this._inertElementCache.forEach((element) => undoElementInert(element));

    this._inertElementCache = null;
    this._filter = null;
    this._context = null;
    this.shadowObserver && this.shadowObserver.disengage();
    this.shadowObserver = null;
  }

  listQueryFocusable(list) {
    return list
      // find all focusable elements within the given contexts
      .map(element => queryFocusable({context: element, includeContext: true, strategy: 'all'}))
      // flatten nested arrays
      .reduce((previous, current) => previous.concat(current), []);
  }

  renderInert(elements) {
    const makeInert = (element) => {
      this._inertElementCache.push(element);
      makeElementInert(element);
    };

    elements
      .filter(this.filterElements)
      .filter(this.filterParentElements)
      // ignore elements that already are disabled
      // so we don't enable them on disengage()
      .filter(element => !elementDisabled(element))
      .forEach(makeInert);
  }

  filterElements(element) {
    // ignore elements within the exempted sub-trees
    const isParentOfElement = getParentComparator({element, includeSelf: true});
    return !this._filter.some(isParentOfElement);
  }

  filterParentElements(element) {
    // ignore ancestors of the exempted sub-trees
    const isParentOfElement = getParentComparator({parent: element});
    return !this._filter.some(isParentOfElement);
  }

  handleMutation(mutation) {
    if (mutation.type === 'childList') {
      const addedElements = nodeArray(mutation.addedNodes).filter(element => element.nodeType === Node.ELEMENT_NODE);
      if (!addedElements.length) {
        return;
      }

      const addedFocusableElements = this.listQueryFocusable(addedElements);
      this.renderInert(addedFocusableElements);
    } else if (mutation.type === 'attributes') {
      this.renderInert([mutation.target]);
    }
  }
}

export default function({context, filter} = {}) {
  const service = new InertSubtree({context, filter});
  return { disengage: service.disengage };
}
