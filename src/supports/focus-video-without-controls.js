
import detectFocus from './detect-focus';
import memorizeResult from './memorize-result';
import mp4 from './media/mp4';

export default memorizeResult(() => detectFocus({
  name: 'can-focus-video-without-controls',
  element: 'video',
  mutate: function(element) {
    // invalid media file can trigger warning in console, data-uri to prevent HTTP request
    element.setAttribute('src', mp4);
  },
}));
