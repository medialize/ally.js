/*
* Children of focusable elements with display:flex are focusable.
* Because focus can be given to focusable (not tabbable) elements
* by mouse, we have to counter this behavior, so the correct element
* becomes the activeElement (i.e. receives focus).
*
* Example:
*   <div tabindex="-1" style="display:flex">
*     <span>I would receive focus</span>
*   </div>
*
* This (wrong) behavior was observed in Internet Explorer 10 and 11.
* It is fixed in IE12 (Win10 IE Tec Preview)
*/

import focusTarget from '../dom/focus-target';
import decorateContext from '../util/decorate-context';

let engage;
let disengage;
const userAgent = window.navigator.userAgent;
// This fix is only relevant to IE10 (Trident/6) and IE11 (Trident/7)
const relevantToCurrentBrowser = userAgent.indexOf('Trident/6') !== -1 || userAgent.indexOf('Trident/7') !== -1;
// IE10 requires prefix, IE11 does not
const eventName = 'onpointerdown' in document ? 'pointerdown' : 'MSPointerDown';

if (!relevantToCurrentBrowser) {
  engage = function() {};
} else {
  const handleBeforeFocusEvent = function(event) {
    // find the element that would receive focus
    const target = focusTarget(event.target);
    if (!target || target === event.target) {
      // there's nothing to focus, or we're focusing the element clicked on
      return;
    }

    // if the focus target does not have display:flex we're good
    const display = window.getComputedStyle(target, null).getPropertyValue('display');
    // flex, flexbox, -ms-flex, inline-flexbox (yeah, whatever…)
    if (display.indexOf('flex') === -1) {
      return;
    }

    // hide all children, because hidden elements can't get focus
    // remember previous element style (not necessarily computed style)
    // to undo hiding later. Reset transitions as well, in case visibility
    // is to be transitioned. This will effectively kill all transitions
    // that are executed on mousedown / :active
    const reverse = [].map.call(target.children, function(element) {
      const visibility = element.style.visibility || '';
      const transition = element.style.transition || '';
      element.style.visibility = 'hidden';
      element.style.transition = 'none';
      return [element, visibility, transition];
    });

    // add cleanup (undo hide) to the RunLoop
    window.setImmediate(function() {
      reverse.forEach(function(item) {
        item[0].style.visibility = item[1];
        item[0].style.transition = item[2];
      });
    });
  };

  engage = function(element) {
    element.addEventListener(eventName, handleBeforeFocusEvent, true);
  };

  disengage = function(element) {
    element.removeEventListener(eventName, handleBeforeFocusEvent, true);
  };
}

export default decorateContext({ engage, disengage });
