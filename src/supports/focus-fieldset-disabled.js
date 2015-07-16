
import detectFocus from './detect-focus';

// fieldset[tabindex=0][disabled] should not be focusable, but Blink and WebKit disagree
// @specification http://www.w3.org/TR/html5/disabled-elements.html#concept-element-disabled
// @browser-issue Chromium https://crbug.com/453847
// @browser-issue WebKit https://bugs.webkit.org/show_bug.cgi?id=141086
export default detectFocus({
  name: 'can-focus-disabled-fieldset',
  element: 'fieldset',
  mutate: function(element) {
    element.setAttribute('tabindex', 0);
    element.setAttribute('disabled', 'disabled');
  },
});
