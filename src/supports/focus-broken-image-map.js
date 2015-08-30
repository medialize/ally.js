
import detectFocus from './detect-focus';

// NOTE: https://github.com/medialize/ally.js/issues/35
// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
export default detectFocus({
  name: 'can-focus-broken-image-map',
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<map name="broken-image-map-test"><area href="#void" shape="rect" coords="63,19,144,45"></map>'
      + '<img usemap="#broken-image-map-test" alt="" src="data:image/png;base64,broken-image-test">';

    return element.querySelector('area');
  },
});
