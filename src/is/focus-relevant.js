
// determine if an element can be focused by script regardless
// of the element actually being focusable at the time of execution
// i.e. <input disabled> is conisdered focus-relevant, but not focusable

import '../prototype/svgelement.prototype.focus';
import '../prototype/element.prototype.matches';
import getParents from '../get/parents';
import isValidTabindex from './valid-tabindex';
import isValidArea from './valid-area';

let canFocusSvgMethod = SVGElement.prototype.focus === HTMLElement.prototype.focus;
import canFocusAudioWithoutControls from '../supports/focus-audio-without-controls';
import canFocusAreaTabindex from '../supports/focus-area-tabindex';
import canFocusChildrenOfFocusableFlexbox from '../supports/focus-children-of-focusable-flexbox';
import canFocusFieldset from '../supports/focus-fieldset';
import canFocusHtml from '../supports/focus-html';
import canFocusImgIsmap from '../supports/focus-img-ismap';
import canFocusImgUsemapTabindex from '../supports/focus-img-usemap-tabindex';
import canFocusLabelTabindex from '../supports/focus-label-tabindex';
import canFocusScrollBody from '../supports/focus-scroll-body';
import canFocusScrollContainer from '../supports/focus-scroll-container';
import canFocusScrollContainerWithoutOverflow from '../supports/focus-scroll-container-without-overflow';
import canFocusSummary from '../supports/focus-summary';
import canFocusSvg from '../supports/focus-svg';
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
    // FIXME: <label tabindex="0"> only tabbable in Firefox, not script-focusable, needs to be dropped here!
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

  if (nodeName === 'iframe' || nodeName === 'object' || nodeName === 'embed') {
    // browsing context containers
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

  if (nodeName === 'img' && element.hasAttribute('usemap') && isValidTabindex(element)) {
    // Gecko, Trident and Edge do not allow an image with an image map and tabindex to be focused,
    // it appears the tabindex is overruled so focus is still forwarded to the <map>
    return canFocusImgUsemapTabindex;
  }

  if (nodeName === 'body') {
    return true;
  }

  if (canFocusHtml && nodeName === 'html') {
    // Firefox, IE11 can focus <html>
    return true;
  }

  if (canFocusTable && (nodeName === 'table' || nodeName === 'td')) {
    // IE10-11 can focus <table> and <td>
    return true;
  }

  if (canFocusFieldset && nodeName === 'fieldset') {
    // IE10-11 can focus <fieldset>
    return true;
  }

  if (canFocusSvgMethod && canFocusSvg && nodeName === 'svg') {
    // NOTE: in Chrome this would be something like 'svg, svg *,' as *every* svg element with a focus event listener is focusable
    return true;
  }

  // FIXME: svg a[xlink|href] has false negative in Chrome
  // FIXME: svg * has false positive in Firefox, IE
  if (canFocusSvgMethod && element.matches('svg a[*|href]')) {
    // Namespace problems of [xlink:href] explained in http://stackoverflow.com/a/23047888/515124
    // Firefox cannot focus <svg> child elements from script
    return true;
  }

  // http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
  if (isValidTabindex(element)) {
    return true;
  }

  const style = window.getComputedStyle(element, null);
  const userModify = style.webkitUserModify || '';
  if (userModify && userModify.indexOf('write') !== -1) {
    // http://www.w3.org/TR/1999/WD-css3-userint-19990916#user-modify
    // https://github.com/medialize/ally.js/issues/17
    return true;
  }

  if (canFocusImgIsmap && nodeName === 'img' && element.hasAttribute('ismap')) {
    // IE10-11 considers the <img> in <a href><img ismap> focusable
    // https://github.com/medialize/ally.js/issues/20
    let hasLinkParent = getParents({context: element}).some(
      parent => parent.nodeName.toLowerCase() === 'a' && parent.hasAttribute('href')
    );

    if (hasLinkParent) {
      return true;
    }
  }

  if (canFocusScrollContainer && (element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth)) {
    // scrollable containers are focusable Internet Explorer
    // scrollable containers are tabbable in Firefox
    // https://github.com/medialize/ally.js/issues/21
    if (canFocusScrollContainerWithoutOverflow) {
      return true;
    }
    // Firefox requires proper overflow setting, IE does not
    // https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
    return [
      style.getPropertyValue('overflow'),
      style.getPropertyValue('overflow-x'),
      style.getPropertyValue('overflow-y'),
    ].some(overflow => overflow === 'auto' || overflow === 'scroll');
  }

  const parent = element.parentElement || element.parentNode;
  if (canFocusScrollBody && (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth)) {
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

  // NOTE: elements marked as inert are not focusable,
  // but that property is not exposed to the DOM
  // http://www.w3.org/TR/html5/editing.html#inert

  return false;
}
