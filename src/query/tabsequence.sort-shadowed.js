
import getShadowHost from '../get/shadow-host';
import mergeInDomOrder from '../util/merge-dom-order';
import tabindexValue from '../util/tabindex-value';

class Shadows {
  constructor(context, sortElements) {
    // document context we're working with
    this.context = context;
    // callback that sorts an array of elements
    this.sortElements = sortElements;
    // reference to create unique IDs for each ShadowHost
    this.hostCounter = 1;
    // reference map for child-ShadowHosts of a ShadowHost
    this.inHost = {};
    // reference map for child-ShadowHost of the document
    this.inDocument = [];
    // reference map for ShadowHosts
    this.hosts = {};
    // reference map for tabbable elements of a ShadowHost
    this.elements = {};
  }

  // remember which hosts we have to sort within later
  _registerHost(host) {
    if (host._sortingId) {
      return;
    }

    // make the ShadowHost identifiable (see cleanup() for undo)
    host._sortingId = 'shadow-' + (this.hostCounter++);
    this.hosts[host._sortingId] = host;

    // hosts may contain other hosts
    const parentHost = getShadowHost({context: host});
    if (parentHost) {
      this._registerHost(parentHost);
      this._registerHostParent(host, parentHost);
    } else {
      this.inDocument.push(host);
    }
  }

  // remember which host is the child of which other host
  _registerHostParent(host, parent) {
    if (!this.inHost[parent._sortingId]) {
      this.inHost[parent._sortingId] = [];
    }

    this.inHost[parent._sortingId].push(host);
  }

  // remember which elements a host contains
  _registerElement(element, host) {
    if (!this.elements[host._sortingId]) {
      this.elements[host._sortingId] = [];
    }

    this.elements[host._sortingId].push(element);
  }

  // remove shadowed elements from the sequence and register
  // the ShadowHosts they belong to so we know what to sort
  // later on
  extractElements(elements) {
    return elements.filter(function(element) {
      const host = getShadowHost({ context: element });
      if (!host) {
        return true;
      }

      this._registerHost(host);
      this._registerElement(element, host);
      return false;
    }, this);
  }

  // inject hosts into the sequence, sort everything,
  // and recoursively replace hosts by its descendants
  sort(elements) {
    let _elements = this._injectHosts(elements);
    _elements = this._replaceHosts(_elements);
    this._cleanup();
    return _elements;
  }

  // merge ShadowHosts into the element lists of other ShadowHosts
  // or the document, then sort the individual lists
  _injectHosts(elements) {
    Object.keys(this.hosts).forEach(function(_sortingId) {
      const _list = this.elements[_sortingId];
      const _elements = this.inHost[_sortingId];
      const _context = this.hosts[_sortingId].shadowRoot;
      this.elements[_sortingId] = this._merge(_list, _elements, _context);
    }, this);

    return this._merge(elements, this.inDocument, this.context);
  }

  _merge(list, elements, context) {
    const merged = mergeInDomOrder({
      list,
      elements,
    });

    return this.sortElements(merged, context);
  }

  _replaceHosts(elements) {
    return mergeInDomOrder({
      list: elements,
      elements: this.inDocument,
      resolveElement: this._resolveHostElement.bind(this),
    });
  }

  _resolveHostElement(host) {
    const merged = mergeInDomOrder({
      list: this.elements[host._sortingId],
      elements: this.inHost[host._sortingId],
      resolveElement: this._resolveHostElement.bind(this),
    });

    const _tabindex = tabindexValue(host);
    if (_tabindex !== null && _tabindex > -1) {
      return [host].concat(merged);
    }

    return merged;
  }

  _cleanup() {
    // remove those identifers we put on the ShadowHost to avoid using Map()
    Object.keys(this.hosts).forEach(function(key) {
      delete this.hosts[key]._sortingId;
    }, this);
  }
}

export default function(elements, context, sortElements) {
  const shadows = new Shadows(context, sortElements);
  const _elements = shadows.extractElements(elements);

  if (_elements.length === elements.length) {
    // no shadowed content found, no need to continue
    return sortElements(elements);
  }

  return shadows.sort(_elements);
}
