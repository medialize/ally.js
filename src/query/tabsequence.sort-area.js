
// move <area> elements to the location of the <img> elements that reference them

import 'css.escape';
import 'array.prototype.findindex';
import queryTabbable from './tabbable';
import mergeInDomOrder from '../util/merge-dom-order';
import getDocument from '../util/get-document';

export default function(elements, context) {
  // images - unless they are focusable themselves, likely not
  // part of the elements list, so we'll have to find them and
  // sort them into the elements list manually
  const usemaps = context.querySelectorAll('img[usemap]');
  const _document = getDocument(context);

  // container for the <area> elements we're going to pull out of the elements list
  const maps = {};
  const addMapByName = function(name) {
    // apparently getElementsByName() also considers id attribute in IE & opera
    // https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByName
    const map = _document.querySelector('map[name="' + CSS.escape(name) + '"]') || null;
    if (!map) {
      // if there is no map, the img[usemap] wasn't doing anything anyway
      return;
    }

    maps[map.name] = queryTabbable({context: map});
  };

  // remove all <area> elements from the elements list,
  // but put them the map for later retrieval
  const _elements = elements.filter(function(element) {
    const nodeName = element.nodeName.toLowerCase();
    if (nodeName !== 'area') {
      return true;
    }

    const map = element.parentNode;
    if (!maps[map.name]) {
      maps[map.name] = [];
    }

    maps[map.name].push(element);
    return false;
  });

  if (!usemaps.length) {
    // the context does not contain any images so no need
    // to replace anything, just remove any maps
    return _elements;
  }

  return mergeInDomOrder({
    list: _elements,
    elements: usemaps,
    resolveElement: function(image) {
      const name = image.getAttribute('usemap').slice(1);
      if (!maps[name]) {
        // the map is not defined within the context, so we
        // have to go find it elsewhere in the document
        addMapByName(name);
      }
      return maps[name];
    },
  });
}
