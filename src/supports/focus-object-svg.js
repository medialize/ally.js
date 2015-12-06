
import platform from 'platform';
import detectFocus from './detect-focus';
import svg from './media/svg';

let support = detectFocus({
  name: 'can-focus-object-svg',
  element: 'object',
  mutate: function(element) {
    element.setAttribute('type', 'image/svg+xml');
    element.setAttribute('data', svg);
    element.setAttribute('width', '200');
    element.setAttribute('height', '50');
  },
});

// Firefox seems to be handling the object creation asynchronously and thereby produces a false negative test result.
// Because we know Firefox is able to focus object elements referencing SVGs, we simply cheat by sniffing the user agent string
if (platform.name === 'Firefox') {
  support = true;
}

export default support;
