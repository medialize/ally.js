
import invalidGif from './media/gif.invalid';

// NOTE: https://github.com/medialize/ally.js/issues/35
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
export default {
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<map name="broken-image-map-test"><area href="#void" shape="rect" coords="63,19,144,45"></map>'
      + '<img usemap="#broken-image-map-test" alt="" src="' + invalidGif + '">';

    return element.querySelector('area');
  },
};
