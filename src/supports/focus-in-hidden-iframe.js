
import detectFocus from './detect-focus';
import memorizeResult from './memorize-result';

// references to the iframe's browsing context
let _document;

export default memorizeResult(() => detectFocus({
  name: 'can-focus-in-hidden-iframe',
  element: function(wrapper) {
    const iframe = document.createElement('iframe');

    // iframe must be part of the DOM before accessing the contentWindow is possible
    wrapper.appendChild(iframe);

    const _window = iframe.contentWindow;
    _document = _window.document;

    return iframe;
  },
  mutate: function(iframe) {
    iframe.style.visibility = 'hidden';

    // writing the iframe's content is synchronous
    _document.open();
    const input = _document.createElement('input');
    _document.body.appendChild(input);
    _document.close();

    return _document.querySelector('input');
  },
  validate: function() {
    const focus = _document.querySelector('input');
    return _document.activeElement === focus;
  },
}));
