
/*
  create ally.get.activeElement()
    wrapping ally.get.activeElements()

  fix ally.get.activeElements()
    https://github.com/jquery/jquery-ui/blob/ffcfb85c9818954adda69e73cf9ba76ea07b554c/ui/safe-active-element.js
*/

import getDocument from '../util/get-document';

export default function({ context } = {}) {
  const _document = getDocument(context);
  let activeElement;

  try {
    // IE9 throws an "Unspecified error" accessing document.activeElement from an <iframe>
    // see https://github.com/jquery/jquery-ui/blob/ffcfb85c9818954adda69e73cf9ba76ea07b554c/ui/safe-active-element.js#L15-L21
    activeElement = _document.activeElement;
  } catch (e) {
    // ignore
  }

  // IE11 may return null instead of an element
  // see https://github.com/jquery/jquery-ui/blob/ffcfb85c9818954adda69e73cf9ba76ea07b554c/ui/safe-active-element.js#L23-L28
  // https://github.com/jquery/jquery-ui/blob/ffcfb85c9818954adda69e73cf9ba76ea07b554c/ui/safe-active-element.js#L30-L35
  if (!activeElement || !activeElement.nodeType) {
    activeElement = _document.body || _document.documentElement;
  }

  return activeElement;
}
