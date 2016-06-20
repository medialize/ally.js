
export default {
  element: function(wrapper, _document) {
    const iframe = _document.createElement('iframe');

    // iframe must be part of the DOM before accessing the contentWindow is possible
    wrapper.appendChild(iframe);

    // create the iframe's default document (<html><head></head><body></body></html>)
    const iframeDocument = iframe.contentWindow.document;
    iframeDocument.open();
    iframeDocument.close();
    return iframe;
  },
  mutate: function(iframe) {
    iframe.style.visibility = 'hidden';

    const iframeDocument = iframe.contentWindow.document;
    const input = iframeDocument.createElement('input');
    iframeDocument.body.appendChild(input);
    return input;
  },
  validate: function(iframe) {
    const iframeDocument = iframe.contentWindow.document;
    const focus = iframeDocument.querySelector('input');
    return iframeDocument.activeElement === focus;
  },
};
