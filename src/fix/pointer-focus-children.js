/*
  Children of focusable elements with display:flex are focusable.
  Because focus can be given to focusable (not tabbable) elements
  by mouse, we have to counter this behavior, so the correct element
  becomes the activeElement (i.e. receives focus).

  Example:
    <div tabindex="-1" style="display:flex">
      <span>I would receive focus</span>
    </div>

  This (wrong) behavior was observed in Internet Explorer 10 and 11.
  It is fixed in IE12 (Win10 IE Tec Preview)
*/

import getFocusTarget from '../get/focus-target';
import decorateContext from '../util/decorate-context';
import platform from '../util/platform';

let engage;
let disengage;
// This fix is only relevant to IE10 (Trident/6) and IE11 (Trident/7)
const relevantToCurrentBrowser = platform.is.TRIDENT && (platform.is.IE10 || platform.is.IE11);

if (!relevantToCurrentBrowser) {
  engage = function() {};
} else {
  const handleBeforeFocusEvent = function(event) {
    // find the element that would receive focus
    const target = getFocusTarget({
      context: event.target,
      except: {
        flexbox: true,
        scrollable: true,
      },
    });

    if (!target || target === event.target) {
      // there's nothing to focus, or we're focusing the element clicked on
      return;
    }

    window.setImmediate(function() {
      target.focus();
    });

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
    // WebDriver does not reliably dispatch PointerEvents so we'll go with
    // mousedown, which shouldn't be a problem since we're targeting the
    // focus handling which immediately follows mousedown.
    element.addEventListener('mousedown', handleBeforeFocusEvent, true);
  };

  disengage = function(element) {
    element.removeEventListener('mousedown', handleBeforeFocusEvent, true);
  };
}

export default decorateContext({ engage, disengage });
