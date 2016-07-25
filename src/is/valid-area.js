
// determine if an <area> element is being properly used by and <img> via a <map>

import contextToElement from '../util/context-to-element';
import isVisible from './visible';
import getParents from '../get/parents';
import {getImageOfArea} from '../util/image-map';

import _supports from '../supports/supports';
let supports;

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
// https://github.com/jquery/jquery-ui/blob/master/ui/core.js#L88-L107
export default function(context) {
  if (!supports) {
    supports = _supports();
  }

  const element = contextToElement({
    label: 'is/valid-area',
    context,
  });

  const nodeName = element.nodeName.toLowerCase();
  if (nodeName !== 'area') {
    return false;
  }

  const hasTabindex = element.hasAttribute('tabindex');
  if (!supports.focusAreaTabindex && hasTabindex) {
    // Blink and WebKit do not consider <area tabindex="-1" href="#void"> focusable
    return false;
  }

  const img = getImageOfArea(element);
  if (!img || !isVisible(img)) {
    return false;
  }

  // Firefox only allows fully loaded images to reference image maps
  // https://stereochro.me/ideas/detecting-broken-images-js
  if (!supports.focusBrokenImageMap && (!img.complete || !img.naturalHeight || img.offsetWidth <= 0 || img.offsetHeight <= 0)) {
    return false;
  }

  // Firefox supports.can focus area elements even if they don't have an href attribute
  if (!supports.focusAreaWithoutHref && !element.href) {
    // Internet explorer supports.can focus area elements without href if either
    // the area element or the image element has a tabindex attribute
    return supports.focusAreaTabindex && hasTabindex || supports.focusAreaImgTabindex && img.hasAttribute('tabindex');
  }

  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
  const childOfInteractive = getParents({context: img}).slice(1).some(function(_element) {
    const name = _element.nodeName.toLowerCase();
    return name === 'button' || name === 'a';
  });

  if (childOfInteractive) {
    return false;
  }

  return true;
}
