
import isValidTabindex from '../is/valid-tabindex';

export default function(element) {
  if (!isValidTabindex(element)) {
    return null;
  }

  // @browser-issue Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1128054
  const tabindex = parseInt(element.getAttribute('tabindex'), 10);
  return isNaN(tabindex) ? -1 : tabindex;
}
