
import detectFocus from './detect-focus';
import memorizeResult from './memorize-result';
import svg from './media/svg';

export default memorizeResult(() => detectFocus({
  name: 'can-focus-object-svg-hidden',
  element: 'object',
  mutate: function(element) {
    element.setAttribute('type', 'image/svg+xml');
    element.setAttribute('data', svg);
    element.setAttribute('width', '200');
    element.setAttribute('height', '50');
    element.style.visibility = 'hidden';
  },
}));
