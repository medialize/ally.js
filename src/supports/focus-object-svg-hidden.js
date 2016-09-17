
import svg from './media/svg';

// Note: IE10 on BrowserStack does not like this test

export default {
  element: 'object',
  mutate: function(element) {
    element.setAttribute('type', 'image/svg+xml');
    element.setAttribute('data', svg);
    element.setAttribute('width', '200');
    element.setAttribute('height', '50');
    element.style.visibility = 'hidden';
  },
};
