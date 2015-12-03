
// move <area> elements to the location of the <img> elements that reference them

import 'css.escape';
import 'array.prototype.findindex';
import queryTabbable from './tabbable';
import getDocument from '../util/get-document';
import nodeArray from '../util/node-array';

function getFirstSuccessorOffset(list, target) {
  // find the first element that comes AFTER the target element
  return list.findIndex(function(element) {
    return target.compareDocumentPosition(element) & Node.DOCUMENT_POSITION_FOLLOWING;
  });
}

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

  // instead of mutating the elements list directly, remember position and map
  // to inject later, when we can do this more efficiently
  const insertions = [];
  nodeArray(usemaps).forEach(function(image) {
    let offset = getFirstSuccessorOffset(_elements, image);
    if (offset === -1) {
      // there is no successor in the tabsequence,
      // meaning the image must be the last element
      offset = _elements.length;
    }

    const name = image.getAttribute('usemap').slice(1);
    if (!maps[name]) {
      // the map is not defined within the context, so we
      // have to go find it elsewhere in the document
      addMapByName(name);
    }

    insertions.push({
      offset,
      name,
    });
  });

  // remember the number of elements we have already injected
  // so we account for the caused index offset
  let inserted = 0;
  // make sure that we insert the elements in sequence,
  // otherwise the offset compensation won't work
  insertions.sort((a, b) => a.offset - b.offset);
  insertions.forEach(function(insertion) {
    const areas = maps[insertion.name];
    if (!areas.length) {
      // we can't inject an empty map and since <area> elements
      // are already removed there's nothing left to do
      return;
    }

    // array.splice has an annoying function signature :(
    const args = [insertion.offset + inserted, 0].concat(areas);
    _elements.splice.apply(_elements, args);
    inserted += areas.length;
  });

  return _elements;
}
