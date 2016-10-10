
import gif from './media/gif';

export default {
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<map name="focus-redirect-img-usemap"><area href="#void" shape="rect" coords="63,19,144,45"></map>'
      + '<img usemap="#focus-redirect-img-usemap" alt="" '
      + 'src="' + gif + '">';

    // focus the <img>, not the <div>
    return element.querySelector('img');
  },
  validate: function(element, focusTarget, _document) {
    const target = element.querySelector('area');
    return _document.activeElement === target;
  },
};
