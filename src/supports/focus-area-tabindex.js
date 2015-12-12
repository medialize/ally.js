
import platform from 'platform';
import detectFocus from './detect-focus';
import memorizeResult from './memorize-result';
import gif from './media/gif';

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
export default memorizeResult(() => detectFocus({
  name: 'can-focus-area-tabindex',
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<map name="image-map-tabindex-test">'
      + '<area href="#void" tabindex="-1" shape="rect" coords="63,19,144,45"></map>'
      + '<img usemap="#image-map-tabindex-test" alt="" src="' + gif + '">';

    return element.querySelector('area');
  },
  validate: function(element) {
    if (platform.name === 'Firefox') {
      // fixes https://github.com/medialize/ally.js/issues/35
      // Firefox loads the DataURI asynchronously, causing a false-negative
      return true;
    }

    const focus = element.querySelector('area');
    return document.activeElement === focus;
  },
}));
