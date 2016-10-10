
import gif from './media/gif';
import platform from '../util/platform';

// https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#attr-usemap
export default {
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<map name="image-map-tabindex-test">'
      + '<area href="#void" tabindex="-1" shape="rect" coords="63,19,144,45"></map>'
      + '<img usemap="#image-map-tabindex-test" alt="" src="' + gif + '">';

    return false;
  },
  validate: function(element, focusTarget, _document) {
    if (platform.is.GECKO) {
      // fixes https://github.com/medialize/ally.js/issues/35
      // Firefox loads the DataURI asynchronously, causing a false-negative
      return true;
    }

    const focus = element.querySelector('area');
    focus.focus();
    return _document.activeElement === focus;
  },
};
