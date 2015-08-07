
// determine if an element can be focused

// http://www.w3.org/TR/html5/editing.html#focus-management

// NOTE: The following known issues exist:
//   Gecko: `svg a[xlink|href]` is not identified as focusable (because SVGElement.prototype.focus is missing)
//   Blink, WebKit: SVGElements that have been made focusable by adding a focus event listener are not identified as focusable

import '../prototype/svgelement.prototype.focus';
import '../prototype/element.prototype.matches';
import getParents from '../get/parents';
import isVisible from './visible';
import isDisabled from './disabled';
import isValidTabindex from './valid-tabindex';
import isValidArea from './valid-area';

let canFocusSvgMethod = SVGElement.prototype.focus === HTMLElement.prototype.focus;
import canFocusAudioWithoutControls from '../supports/focus-audio-without-controls';
import canFocusVideoWithoutControls from '../supports/focus-video-without-controls';
import canFocusHtml from '../supports/focus-html';
import canFocusSvg from '../supports/focus-svg';
import canFocusTable from '../supports/focus-table';
import canFocusFieldset from '../supports/focus-fieldset';
import canFocusSummary from '../supports/focus-summary';
import canFocusImgIsmap from '../supports/focus-img-ismap';
import canFocusScrollContainerWithoutOverflow from '../supports/focus-scroll-container-without-overflow';
import canFocusScrollContainer from '../supports/focus-scroll-container';
import canFocusScrollBody from '../supports/focus-scroll-body';

export default function(element) {
  if (element === document) {
    element = document.documentElement;
  }

  if (!element || element.nodeType !== Node.ELEMENT_NODE) {
    throw new TypeError('is/focusable requires an argument of type Element');
  }

  const nodeName = element.nodeName.toLowerCase();

  // object[usemap] is not focusable in any browser
  if (nodeName === 'object' && element.hasAttribute('usemap')) {
    return false;
  }

  // input[type="hidden"] cannot be focused
  if (nodeName === 'input' && element.type === 'hidden') {
    return false;
  }

  if (isDisabled(element)) {
    return false;
  }

  if (nodeName === 'area') {
    return isValidArea(element);
  }

  // elements that are not rendered, cannot be focused
  if (!isVisible(element)) {
    return false;
  }

  // http://www.w3.org/TR/html5/editing.html#sequential-focus-navigation-and-the-tabindex-attribute
  if (isValidTabindex(element)) {
    return true;
  }

  if (nodeName === 'input' || nodeName === 'select' || nodeName === 'button' || nodeName === 'textarea') {
    // disabled elements have been filtered out above, using isDisabled()
    return true;
  }

  if (nodeName === 'a' && element.hasAttribute('href')) {
    return true;
  }

  if (nodeName === 'iframe' || nodeName === 'object' || nodeName === 'embed') {
    // browsing context containers
    return true;
  }

  if (element.hasAttribute('contenteditable')) {
    // also see CSS property user-modify below
    return true;
  }

  if (nodeName === 'keygen') {
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

  // TODO: not not identify body as focusable
  if (nodeName === 'body') {
    return true;
  }

  // TODO: not not identify html as focusable
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

  if (canFocusSvgMethod && element.matches('svg a[*|href]')) {
    // Namespace problems of [xlink:href] explained in http://stackoverflow.com/a/23047888/515124
    // Firefox cannot focus <svg> child elements from script
    return true;
  }

  const style = window.getComputedStyle(element, null);
  if (style.getPropertyValue('-webkit-user-modify').indexOf('write') !== -1) {
    // http://www.w3.org/TR/1999/WD-css3-userint-19990916#user-modify
    // https://github.com/medialize/ally.js/issues/17
    return true;
  }

  if (canFocusImgIsmap && nodeName === 'img' && element.hasAttribute('ismap')) {
    // IE10-11 considers the <img> in <a href><img ismap> focusable
    // https://github.com/medialize/ally.js/issues/20
    return getParents({context: element}).some(
      parent => parent.nodeName.toLowerCase() === 'a' && parent.hasAttribute('href')
    );
  }

  if (canFocusScrollContainer && (element.offsetHeight < element.scrollHeight || element.offsetWidth < element.scrollWidth)) {
    // scrollable containers are focusable Internet Explorer
    // scrollable containers are tabbable in Firefox
    // https://github.com/medialize/ally.js/issues/21
    // Firefox requires proper overflow setting, IE does not
    // https://developer.mozilla.org/en-US/docs/Web/CSS/overflow
    let overflow = style.getPropertyValue('overflow');
    if (canFocusScrollContainerWithoutOverflow || overflow === 'auto' || overflow === 'scroll') {
      // TODO: what about overflow-x and overflow-y?
      return true;
    }
  }

  const parent = element.parentElement;
  if (canFocusScrollBody && (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth)) {
    // scrollable bodies are focusable Internet Explorer
    // https://github.com/medialize/ally.js/issues/21
    return true;
  }

  // NOTE: elements marked as inert are not focusable,
  // but that property is not exposed to the DOM
  // http://www.w3.org/TR/html5/editing.html#inert

  return false;
}
