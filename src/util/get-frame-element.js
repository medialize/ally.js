
import getContentDocument from './get-content-document';
import getWindow from './get-window';
import selectInShadows from './select-in-shadows';

let selector;

function findDocumentHostElement(_window) {
  if (!selector) {
    selector = selectInShadows('object, iframe');
  }

  if (_window._frameElement !== undefined) {
    return _window._frameElement;
  }

  _window._frameElement = null;

  const potentialHosts = _window.parent.document.querySelectorAll(selector);
  [].some.call(potentialHosts, function(element) {
    const _document = getContentDocument(element);
    if (_document !== _window.document) {
      return false;
    }

    _window._frameElement = element;
    return true;
  });

  return _window._frameElement;
}

export default function getFrameElement(element) {
  const _window = getWindow(element);
  if (!_window.parent || _window.parent === _window) {
    // if there is no parent browsing context,
    // we're not going to get a frameElement either way
    return null;
  }

  try {
    // see https://developer.mozilla.org/en-US/docs/Web/API/Window/frameElement
    // does not work within <embed> anywhere, and not within in <object> in IE
    return _window.frameElement || findDocumentHostElement(_window);
  } catch (e) {
    return null;
  }
}
