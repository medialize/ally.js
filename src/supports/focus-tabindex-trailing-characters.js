
import detectFocus from './detect-focus';
import memorizeResult from './memorize-result';

// Firefox allows *any* value and treats invalid values like tabindex="-1"
// @browser-issue Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1128054
export default memorizeResult(() => detectFocus({
  name: 'allows-tabindex-trailing-characters',
  element: 'div',
  mutate: function(element) {
    element.setAttribute('tabindex', '3x');
  },
}));
