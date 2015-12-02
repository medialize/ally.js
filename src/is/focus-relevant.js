
// determine if an element can be focused by script regardless
// of the element actually being focusable at the time of execution
// i.e. <input disabled> is conisdered focus-relevant, but not focusable

import '../prototype/svgelement.prototype.focus';
import '../prototype/element.prototype.matches';
import getParents from '../get/parents';
import isValidTabindex from './valid-tabindex';
import isValidArea from './valid-area';
import {
  hasCssOverflowScroll,
  isScrollableContainer,
  isUserModifyWritable,
} from './is.util';

import canFocusAreaTabindex from '../supports/focus-area-tabindex';
import canFocusAudioWithoutControls from '../supports/focus-audio-without-controls';
import canFocusChildrenOfFocusableFlexbox from '../supports/focus-children-of-focusable-flexbox';
import canFocusFieldset from '../supports/focus-fieldset';
import canFocusImgIsmap from '../supports/focus-img-ismap';
import canFocusImgUsemapTabindex from '../supports/focus-img-usemap-tabindex';
import canFocusLabelTabindex from '../supports/focus-label-tabindex';
import canFocusObjectSvg from '../supports/focus-object-svg';
import canFocusScrollBody from '../supports/focus-scroll-body';
import canFocusScrollContainer from '../supports/focus-scroll-container';
import canFocusScrollContainerWithoutOverflow from '../supports/focus-scroll-container-without-overflow';
import canFocusSummary from '../supports/focus-summary';
import canFocusSvgMethod from '../supports/svg-focus-method';
import canFocusTable from '../supports/focus-table';
import canFocusVideoWithoutControls from '../supports/focus-video-without-controls';

export default function(element) {
  if (element === document) {
    element = document.documentElement;
  }

  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError('is/focus-relevant requires an argument of type Element');
  }

  const nodeName = element.nodeName.toLowerCase();

  if (nodeName === 'input' && element.type === 'hidden') {
    // input[type="hidden"] cannot be focused
    return false;
  }

  if (nodeName === 'input' || nodeName === 'select' || nodeName === 'button' || nodeName === 'textarea') {
    return true;
  }

  if (nodeName === 'label' && !canFocusLabelTabindex) {
    // <label tabindex="0"> is only tabbable in Firefox, not script-focusable
    // there's no way to make an element focusable other than by adding a tabindex,
    // and focus behavior of the label element seems hard-wired to ignore tabindex
    // in some browsers (like Gecko, Blink and WebKit)
    return false;
  }

  if (nodeName === 'area') {
    if (!canFocusAreaTabindex && element.hasAttribute('tabindex')) {
      // Blink and WebKit do not consider <area tabindex="-1" href="#void"> focusable
      return false;
    }

    return isValidArea(element);
  }

  if (nodeName === 'a' && element.hasAttribute('href')) {
    return true;
  }

  if (nodeName === 'object' && element.hasAttribute('usemap')) {
    // object[usemap] is not focusable in any browser
    return false;
  }

  if (!canFocusObjectSvg && nodeName === 'object' && element.getAttribute('type') === 'image/svg+xml') {
    // object[type="image/svg+xml"] is not focusable in Internet Explorer
    return false;
  }

  if (nodeName === 'iframe' || nodeName === 'object') {
    // browsing context containers
    return true;
  }

  const validTabindex = isValidTabindex(element);

  if (nodeName === 'embed') {
    // embed is considered focus-relevant but not focusable
    // see https://github.com/medialize/ally.js/issues/82
    return true;
  }

  if (element.hasAttribute('contenteditable')) {
    // also see CSS property user-modify below
    return true;
  }

  if (nodeName === 'audio' && (canFocusAudioWithoutControls || element.hasAttribute('controls'))) {
    return true;
  }

  if (nodeName === 'video' && (canFocusVideoWithoutControls || element.hasAttribute('controls'))) {
    return true;
  }

  if (canFocusSummary && nodeName === 'summary') {
    return true;
  }

  if (nodeName === 'img' && element.hasAttribute('usemap') && validTabindex) {
    // Gecko, Trident and Edge do not allow an image with an image map and tabindex to be focused,
    // it appears the tabindex is overruled so focus is still forwarded to the <map>
    return canFocusImgUsemapTabindex;
  }

  if (canFocusTable && (nodeName === 'table' || nodeName === 'td')) {
    // IE10-11 can focus <table> and <td>
    return true;
  }

  if (canFocusFieldset && nodeName === 'fieldset') {
    // IE10-11 can focus <fieldset>
    return true;
  }

  if (nodeName === 'svg') {
    if (!canFocusSvgMethod) {
      // Firefox and IE cannot focus SVG elements because SVGElement.prototype.focus is missing
      return false;
    }
    // NOTE: in Chrome this would be something like 'svg, svg *,' as *every* svg element with a focus event listener is focusable
    return validTabindex;
  }

  if (element.matches('svg a[*|href]')) {
    // Namespace problems of [xlink:href] explained in http://stackoverflow.com/a/23047888/515124
    // Firefox cannot focus <svg> child elements from script
    return canFocusSvgMethod;
  }

  // http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
  if (validTabindex) {
    return true;
  }

  const style = window.getComputedStyle(element, null);
  if (isUserModifyWritable(style)) {
    return true;
  }

  if (canFocusImgIsmap && nodeName === 'img' && element.hasAttribute('ismap')) {
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
  if (canFocusScrollContainer) {
    if (canFocusScrollContainerWithoutOverflow) {
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

  const parent = element.parentElement;
  if (parent) {
    if (canFocusScrollBody && isScrollableContainer(parent, nodeName)) {
      // scrollable bodies are focusable Internet Explorer
      // https://github.com/medialize/ally.js/issues/21
      return true;
    }

    // Children of focusable elements with display:flex are focusable in IE10-11
    if (canFocusChildrenOfFocusableFlexbox) {
      const parentStyle = window.getComputedStyle(parent, null);
      if (parentStyle.display.indexOf('flex') > -1) {
        return true;
      }
    }
  }

  // NOTE: elements marked as inert are not focusable,
  // but that property is not exposed to the DOM
  // http://www.w3.org/TR/html5/editing.html#inert

  return false;
}
