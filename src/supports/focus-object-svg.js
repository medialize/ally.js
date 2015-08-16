
import detectFocus from './detect-focus';

export default detectFocus({
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
