/*
  Clicking on a link that has a focusable element in its ancestry [tabindex="-1"],
  can lead to that parental element gaining focus, instead of the link.

  Example:
    <div tabindex="-1">
      <a href="#foo">click me</a>
    </div>

  This (wrong) behavior was observed in Chrome 38, iOS8, Safari 6.2, WebKit r175131
  It is not a problem in Firefox 33, Internet Explorer 11, Chrome 39.
*/

import getFocusTarget from '../get/focus-target';
import isValidTabIndex from '../is/valid-tabindex';
import decorateContext from '../util/decorate-context';
import platform from '../util/platform';

let engage;
let disengage;
// This fix is only relevant to WebKit
const relevantToCurrentBrowser = platform.is.WEBKIT;

if (!relevantToCurrentBrowser) {
  engage = function() {};
} else {
  // add [tabindex="0"] to the (focusable) element that is about to be clicked
  // if it does not already have an explicit tabindex (attribute).
  // By applying an explicit tabindex, WebKit will not go look for
  // the first valid tabindex in the element's parents.
  const handleBeforeFocusEvent = function(event) {
    // find the element that would receive focus
    const target = getFocusTarget({context: event.target});
    if (!target || target.hasAttribute('tabindex') && isValidTabIndex(target)) {
      // there's nothing to focus, or the element already has tabindex, we're good
      return;
    }

    // assign explicit tabindex, as implicit tabindex is the problem
    target.setAttribute('tabindex', 0);

    // add cleanup to the RunLoop
    (window.setImmediate || window.setTimeout)(function() {
      target.removeAttribute('tabindex');
    }, 0);
  };

  engage = function(element) {
    element.addEventListener('mousedown', handleBeforeFocusEvent, true);
    element.addEventListener('touchstart', handleBeforeFocusEvent, true);
  };

  disengage = function(element) {
    element.removeEventListener('mousedown', handleBeforeFocusEvent, true);
    element.removeEventListener('touchstart', handleBeforeFocusEvent, true);
  };
}

export default decorateContext({ engage, disengage });
