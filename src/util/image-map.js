
import cssEscape from 'css.escape';
import getDocument from '../util/get-document';

export function getMapByName(name, _document) {
  // apparently getElementsByName() also considers id attribute in IE & opera
  // https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByName
  const map = _document.querySelector('map[name="' + cssEscape(name) + '"]');
  return map || null;
}

export function getMapOfImage(element) {
  const usemap = element.getAttribute('usemap');
  if (!usemap) {
    return null;
  }

  const _document = getDocument(element);
  return getMapByName(usemap.slice(1), _document);
}

export function getImageOfArea(element) {
  const map = element.parentElement;

  if (!map.name || map.nodeName.toLowerCase() !== 'map') {
    return null;
  }

  // NOTE: image maps can also be applied to <object> with image content,
  // but no browser supports this at the moment

  // HTML5 specifies HTMLMapElement.images to be an HTMLCollection of all
  // <img> and <object> referencing the <map> element, but no browser implements this
  //   https://www.w3.org/TR/html5/embedded-content-0.html#the-map-element
  //   https://developer.mozilla.org/en-US/docs/Web/API/HTMLMapElement
  // the image must be valid and loaded for the map to take effect
  const _document = getDocument(element);
  return _document.querySelector('img[usemap="#' + cssEscape(map.name) + '"]') || null;
}
