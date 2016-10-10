
import svg from './media/svg';
import platform from '../util/platform';

// Note: IE10 on BrowserStack does not like this test

export default {
  name: 'can-focus-object-svg',
  element: 'object',
  mutate: function(element) {
    element.setAttribute('type', 'image/svg+xml');
    element.setAttribute('data', svg);
    element.setAttribute('width', '200');
    element.setAttribute('height', '50');
  },
  validate: function(element, focusTarget, _document) {
    if (platform.is.GECKO) {
      // Firefox seems to be handling the object creation asynchronously and thereby produces a false negative test result.
      // Because we know Firefox is able to focus object elements referencing SVGs, we simply cheat by sniffing the user agent string
      return true;
    }

    return _document.activeElement === element;
  },
};
