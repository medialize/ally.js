
import detectFocus from './detect-focus';
import memorizeResult from './memorize-result';
import gif from './media/gif';

export default memorizeResult(() => detectFocus({
  name: 'can-focus-redirect-img-usemap',
  element: 'div',
  mutate: function(element) {
    element.innerHTML = '<map name="focus-redirect-img-usemap"><area href="#void" shape="rect" coords="63,19,144,45"></map>'
      + '<img usemap="#focus-redirect-img-usemap" alt="" '
      + 'src="' + gif + '">';
  },
  validate: function(element) {
    const focus = element.querySelector('img');
    const target = element.querySelector('area');

    focus.focus();
    return document.activeElement === target;
  },
}));
