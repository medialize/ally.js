
// Firefox allows *any* value and treats invalid values like tabindex="-1"
// @browser-issue Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1128054
export default {
  element: 'div',
  mutate: function(element) {
    element.setAttribute('tabindex', 'invalid-value');
  },
};
