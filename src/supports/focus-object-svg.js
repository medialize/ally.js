
import platform from 'platform';
import detectFocus from './detect-focus';

let support = detectFocus({
  name: 'can-focus-object-svg',
  element: 'object',
  mutate: function(element) {
    var svg = 'PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk'
     + '5L3hsaW5rIiBpZD0ic3ZnIj48dGV4dCB4PSIxMCIgeT0iMjAiIGlkPSJzdmctbGluay10ZXh0Ij50ZXh0PC90ZXh0Pjwvc3ZnPg==';

    element.setAttribute('type', 'image/svg+xml');
    element.setAttribute('data', 'data:image/svg+xml,base64,' + svg);
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
