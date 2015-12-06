
import detectFocus from './detect-focus';
import gif from './media/gif';

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
export default detectFocus({
  name: 'can-focus-area-img-tabindex',
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<map name="image-map-tabindex-test">'
      + '<area shape="rect" coords="63,19,144,45"></map>'
      + '<img usemap="#image-map-tabindex-test" tabindex="-1" alt="" src="' + gif + '">';

    return element.querySelector('area');
  },
});
