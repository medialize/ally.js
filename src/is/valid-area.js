
// determine if an <area> element is being properly used by and <img> via a <map>

import 'css.escape';
import isVisible from './visible';
import getParents from '../get/parents';
import canFocusBrokenImageMaps from '../supports/focus-broken-image-map';

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/map
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
// https://github.com/jquery/jquery-ui/blob/master/ui/core.js#L88-L107
export default function(element) {
  var nodeName = element.nodeName.toLowerCase();
  if (nodeName !== 'area') {
    return true;
  }

  var map = element.parentElement;

  // an <area> matches the area[href] selector even if it is not applicable
  if (!map.name || !element.href || map.nodeName.toLowerCase() !== 'map') {
    return false;
  }

  // NOTE: image maps can also be applied to <object> with image content,
  // but no browser supports this at the moment

  // HTML5 specifies HTMLMapElement.images to be an HTMLCollection of all
  // <img> and <object> referencing the <map> element, but no browser implements this
  //   http://www.w3.org/TR/html5/embedded-content-0.html#the-map-element
  //   https://developer.mozilla.org/en-US/docs/Web/API/HTMLMapElement
  // the image must be valid and loaded for the map to take effect
  var img = document.querySelector('img[usemap="#' + CSS.escape(map.name) + '"]');
  if (!img || !isVisible(img) || img.offsetWidth <= 0 || img.offsetHeight <= 0) {
    return false;
  }

  // Firefox only allows fully loaded images to reference image maps
  // https://stereochro.me/ideas/detecting-broken-images-js
  if (!canFocusBrokenImageMaps && (!img.complete || !img.naturalHeight)) {
    return false;
  }

  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
  var childOfInteractive = getParents({context: img}).slice(1).some(function(_element) {
    var name = _element.nodeName.toLowerCase();
    return name === 'button' || name === 'a';
  });

  if (childOfInteractive) {
    return false;
  }

  return true;
}
