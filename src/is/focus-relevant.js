
// determine if an element supports.can be focused by script regardless
// of the element actually being focusable at the time of execution
// i.e. <input disabled> is conisdered focus-relevant, but not focusable

import '../prototype/svgelement.prototype.focus';
import polyfillElementPrototypeMatches from '../prototype/element.prototype.matches';
import getParents from '../get/parents';
import getWindow from '../util/get-window';
import isValidTabindex from './valid-tabindex';
import isValidArea from './valid-area';
import {
  hasCssOverflowScroll,
  hasCssDisplayFlex,
  isScrollableContainer,
  isUserModifyWritable,
} from './is.util';

import _supports from './focus-relevant.supports';
let supports;

export default function(element) {
  if (!supports) {
    supports = _supports();
  }

  if (element === document) {
    element = document.documentElement;
  }

  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError('is/focus-relevant requires an argument of type Element');
  }

  const nodeName = element.nodeName.toLowerCase();

  if (nodeName === 'input' && element.type === 'hidden') {
    // input[type="hidden"] supports.cannot be focused
    return false;
  }

  if (nodeName === 'input' || nodeName === 'select' || nodeName === 'button' || nodeName === 'textarea') {
    return true;
  }

  if (nodeName === 'label' && !supports.canFocusLabelTabindex) {
    // <label tabindex="0"> is only tabbable in Firefox, not script-focusable
    // there's no way to make an element focusable other than by adding a tabindex,
    // and focus behavior of the label element seems hard-wired to ignore tabindex
    // in some browsers (like Gecko, Blink and WebKit)
    return false;
  }

  if (nodeName === 'area') {
    return isValidArea(element);
  }

  if (nodeName === 'a' && element.hasAttribute('href')) {
    return true;
  }

  if (nodeName === 'object' && element.hasAttribute('usemap')) {
    // object[usemap] is not focusable in any browser
    return false;
  }

  if (nodeName === 'object') {
    const svgType = element.getAttribute('type');
    if (!supports.canFocusObjectSvg && svgType === 'image/svg+xml') {
      // object[type="image/svg+xml"] is not focusable in Internet Explorer
      return false;
    } else if (!supports.canFocusObjectSwf && svgType === 'application/x-shockwave-flash') {
      // object[type="application/x-shockwave-flash"] is not focusable in Internet Explorer 9
      return false;
    }
  }

  if (nodeName === 'iframe' || nodeName === 'object') {
    // browsing context containers
    return true;
  }

  if (nodeName === 'embed' || nodeName === 'keygen') {
    // embed is considered focus-relevant but not focusable
    // see https://github.com/medialize/ally.js/issues/82
    return true;
  }

  if (element.hasAttribute('contenteditable')) {
    // also see CSS property user-modify below
    return true;
  }

  if (nodeName === 'audio' && (supports.canFocusAudioWithoutControls || element.hasAttribute('controls'))) {
    return true;
  }

  if (nodeName === 'video' && (supports.canFocusVideoWithoutControls || element.hasAttribute('controls'))) {
    return true;
  }

  if (supports.canFocusSummary && nodeName === 'summary') {
    return true;
  }

  const validTabindex = isValidTabindex(element);

  if (nodeName === 'img' && element.hasAttribute('usemap') && validTabindex) {
    // Gecko, Trident and Edge do not allow an image with an image map and tabindex to be focused,
    // it appears the tabindex is overruled so focus is still forwarded to the <map>
    return supports.canFocusImgUsemapTabindex;
  }

  if (supports.canFocusTable && (nodeName === 'table' || nodeName === 'td')) {
    // IE10-11 supports.can focus <table> and <td>
    return true;
  }

  if (supports.canFocusFieldset && nodeName === 'fieldset') {
    // IE10-11 supports.can focus <fieldset>
    return true;
  }

  if (nodeName === 'svg') {
    if (!supports.canFocusSvgMethod) {
      // Firefox and IE supports.cannot focus SVG elements because SVGElement.prototype.focus is missing
      return false;
    }
    // NOTE: in Chrome this would be something like 'svg, svg *,' as *every* svg element with a focus event listener is focusable
    return validTabindex;
  }

  const _window = getWindow(element);
  polyfillElementPrototypeMatches(_window);
  if (element.matches('svg a[*|href]')) {
    // Namespace problems of [xlink:href] explained in http://stackoverflow.com/a/23047888/515124
    // Firefox supports.cannot focus <svg> child elements from script
    return supports.canFocusSvgMethod;
  }

  // http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
  if (validTabindex) {
    return true;
  }

  const style = window.getComputedStyle(element, null);
  if (isUserModifyWritable(style)) {
    return true;
  }

  if (supports.canFocusImgIsmap && nodeName === 'img' && element.hasAttribute('ismap')) {
    // IE10-11 considers the <img> in <a href><img ismap> focusable
    // https://github.com/medialize/ally.js/issues/20
    const hasLinkParent = getParents({context: element}).some(
      parent => parent.nodeName.toLowerCase() === 'a' && parent.hasAttribute('href')
    );

    if (hasLinkParent) {
      return true;
    }
  }

  // https://github.com/medialize/ally.js/issues/21
  if (supports.canFocusScrollContainer) {
    if (supports.canFocusScrollContainerWithoutOverflow) {
      // Internet Explorer does will consider the scrollable area focusable
      // if the element is a <div> or a <span> and it is in fact scrollable,
      // regardless of the CSS overflow property
      if (isScrollableContainer(element, nodeName)) {
        return true;
      }
    } else if (hasCssOverflowScroll(style)) {
      // Firefox requires proper overflow setting, IE does not necessarily
      // https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
      return true;
    }
  }

  if (supports.canFocusFlexboxContainer && hasCssDisplayFlex(style)) {
    // elements with display:flex are focusable in IE10-11
    return true;
  }

  const parent = element.parentElement;
  if (parent) {
    if (supports.canFocusScrollBody && isScrollableContainer(parent, nodeName)) {
      // scrollable bodies are focusable Internet Explorer
      // https://github.com/medialize/ally.js/issues/21
      return true;
    }

    // Children of focusable elements with display:flex are focusable in IE10-11
    if (supports.canFocusChildrenOfFocusableFlexbox) {
      const parentStyle = window.getComputedStyle(parent, null);
      if (hasCssDisplayFlex(parentStyle)) {
        return true;
      }
    }
  }

  // NOTE: elements marked as inert are not focusable,
  // but that property is not exposed to the DOM
  // http://www.w3.org/TR/html5/editing.html#inert

  return false;
}
