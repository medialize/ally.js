
import isFocusable from '../is/focusable';
import queryFocusable from '../query/focusable';
import queryTabbable from '../query/tabbable';
import contextToElement from '../util/context-to-element';
import getDocument from '../util/get-document';
import mergeInDomOrder from '../util/merge-dom-order';
import {getMapOfImage} from '../util/image-map';

import _supports from '../supports/supports';
let supports;

function formControlElement(element) {
  const nodeName = element.nodeName.toLowerCase();
  return nodeName === 'input'
    || nodeName === 'textarea'
    || nodeName === 'select'
    || nodeName === 'button';
}

function resolveLabelElement(element, _document) {
  const forId = element.getAttribute('for');
  if (forId) {
    // <label for="…"> - referenced form control
    return _document.getElementById(forId);
  }

  // <label><input - nested form control
  return element.querySelector('input, select, textarea');
}

function resolveLegendWithinFieldset(element) {
  // Chrome: first focusable input/select/textarea/button within <fieldset>
  const fieldset = element.parentNode;
  const focusable = queryFocusable({
    context: fieldset,
    strategy: 'strict',
  });

  return focusable.filter(formControlElement)[0] || null;
}

function resolveLegendWithinDocument(element, _document) {
  // Firefox: *next* tabbable (in DOM order)
  const tabbable = queryTabbable({
    // Firefox apparently needs to query from the body element,
    // not the document, looking inside a dynamically written iframe
    context: _document.body,
    strategy: 'strict',
  });

  if (!tabbable.length) {
    return null;
  }

  // sort <legend> into the list of tabbable elements
  // so that we can identify the next element
  const merged = mergeInDomOrder({
    list: tabbable,
    elements: [element],
  });

  const offset = merged.indexOf(element);
  if (offset === merged.length - 1) {
    return null;
  }

  return merged[offset + 1];
}

function resolveLegendElement(element, _document) {
  // <legend> - first <input> in <fieldset>
  if (!supports.focusRedirectLegend) {
    return null;
  }

  // legend must be the first child of a <fieldset>
  const fieldset = element.parentNode;
  if (fieldset.nodeName.toLowerCase() !== 'fieldset') {
    return null;
  }

  if (supports.focusRedirectLegend === 'tabbable') {
    // Firefox goes for *next* tabbable (in DOM order)
    return resolveLegendWithinDocument(element, _document);
  }

  // Chrome goes for first focusable input/select/textarea/button within <fieldset>
  return resolveLegendWithinFieldset(element, _document);
}

function resolveImgElement(element) {
  if (!supports.focusRedirectImgUsemap) {
    return null;
  }

  // IE9-11: <img usemap="#…" src="…"> - first <area>
  const map = getMapOfImage(element);
  return map && map.querySelector('area') || null;
}

export default function({context, skipFocusable} = {}) {
  if (!supports) {
    supports = _supports();
  }

  const element = contextToElement({
    label: 'get/focus-redirect-target',
    context,
  });

  if (!skipFocusable && isFocusable(element)) {
    return null;
  }

  const nodeName = element.nodeName.toLowerCase();
  const _document = getDocument(element);

  if (nodeName === 'label') {
    return resolveLabelElement(element, _document);
  }

  if (nodeName === 'legend') {
    return resolveLegendElement(element, _document);
  }

  if (nodeName === 'img') {
    return resolveImgElement(element, _document);
  }

  return null;
}

