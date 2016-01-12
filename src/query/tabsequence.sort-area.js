
// move <area> elements to the location of the <img> elements that reference them

import queryTabbable from './tabbable';
import mergeInDomOrder from '../util/merge-dom-order';
import getDocument from '../util/get-document';
import {getMapByName} from '../util/image-map';

class Maps {
  constructor(context) {
    this._document = getDocument(context);
    this.maps = {};
  }

  getAreasFor(name) {
    if (!this.maps[name]) {
      // the map is not defined within the context, so we
      // have to go find it elsewhere in the document
      this.addMapByName(name);
    }

    return this.maps[name];
  }

  addMapByName(name) {
    const map = getMapByName(name, this._document);
    if (!map) {
      // if there is no map, the img[usemap] wasn't doing anything anyway
      return;
    }

    this.maps[map.name] = queryTabbable({context: map});
  }

  extractAreasFromList(elements) {
    // remove all <area> elements from the elements list,
    // but put them the map for later retrieval
    return elements.filter(function(element) {
      const nodeName = element.nodeName.toLowerCase();
      if (nodeName !== 'area') {
        return true;
      }

      const map = element.parentNode;
      if (!this.maps[map.name]) {
        this.maps[map.name] = [];
      }

      this.maps[map.name].push(element);
      return false;
    }, this);
  }
}

export default function(elements, context) {
  // images - unless they are focusable themselves, likely not
  // part of the elements list, so we'll have to find them and
  // sort them into the elements list manually
  const usemaps = context.querySelectorAll('img[usemap]');
  const maps = new Maps(context);

  // remove all <area> elements from the elements list,
  // but put them the map for later retrieval
  const _elements = maps.extractAreasFromList(elements);

  if (!usemaps.length) {
    // the context does not contain any <area>s so no need
    // to replace anything, just remove any maps
    return _elements;
  }

  return mergeInDomOrder({
    list: _elements,
    elements: usemaps,
    resolveElement: function(image) {
      const name = image.getAttribute('usemap').slice(1);
      return maps.getAreasFor(name);
    },
  });
}
