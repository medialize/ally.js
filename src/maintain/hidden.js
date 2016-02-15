
// Utility to make the entire DOM aria-hidden="true" except for a given set of elements

import nodeArray from '../util/node-array';
import getInsignificantBranches from '../get/insignificant-branches';
import getParents from '../get/parents';
import toggleAttributeValue from '../util/toggle-attribute-value';
import {getParentComparator} from '../util/compare-position';

function makeElementHidden(element) {
  toggleAttributeValue({
    element,
    attribute: 'aria-hidden',
    temporaryValue: 'true',
  });
}

function undoElementHidden(element) {
  toggleAttributeValue({
    element,
    attribute: 'aria-hidden',
  });
}

const observerConfig = {
  attributes: false,
  childList: true,
  subtree: true,
};

class HiddenSubtree {
  constructor({context, filter} = {}) {
    this._context = nodeArray(context || document.documentElement)[0];
    this._filter = nodeArray(filter);

    this.disengage = this.disengage.bind(this);
    this.handleMutation = this.handleMutation.bind(this);
    this.isInsignificantBranch = this.isInsignificantBranch.bind(this);

    const insignificantBranches = getInsignificantBranches({context: this._context, filter: this._filter});
    insignificantBranches.forEach(makeElementHidden);
    this.startObserver();
  }

  disengage() {
    if (!this._context) {
      return;
    }

    [].forEach.call(this._context.querySelectorAll('[data-cached-aria-hidden]'), undoElementHidden);

    this._context = null;
    this._filter = null;
    this._observer && this._observer.disconnect();
    this._observer = null;
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
      // a new branch cannot contain a filtered element
      // (unless it is moved there, which is an edge-case we'll ignore for now),
      // so anything that is within context,
      // and not within a previously known insignificant branch and not within a filtered element,
      // must be an insignificant branch as well
      nodeArray(mutation.addedNodes)
        .filter(element => element.nodeType === Node.ELEMENT_NODE)
        .filter(this.isInsignificantBranch)
        .forEach(makeElementHidden);
    }
  }

  isInsignificantBranch(element) {
    const parents = getParents({context: element});
    if (parents.some(_element => _element.getAttribute('aria-hidden') === 'true')) {
      // element is child of a hidden element
      return false;
    }

    const isParentOfElement = getParentComparator({element});
    if (this._filter.some(isParentOfElement)) {
      // element is a descendant of a filtered element
      return false;
    }

    return true;
  }
}

export default function({context, filter} = {}) {
  const service = new HiddenSubtree({context, filter});
  return { disengage: service.disengage };
}
