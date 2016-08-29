
import isActiveElement from '../is/active-element';
import queryTabsequence from '../query/tabsequence';
import whenKey from '../when/key';

export default function({ context } = {}) {
  if (!context) {
    context = document.documentElement;
  }

  // Make sure the supports tests are run before intercepting the Tab key,
  // or IE10 and IE11 will fail to process the first Tab key event. Not
  // limiting this warm-up to IE because it may be a problem elsewhere, too.
  queryTabsequence();

  return whenKey({
    // Safari on OSX may require ALT+TAB to reach links,
    // see https://github.com/medialize/ally.js/issues/146
    '?alt+?shift+tab': function(event) {
      // we're completely taking over the Tab key handling
      event.preventDefault();

      const sequence = queryTabsequence({
        context,
      });

      const backward = event.shiftKey;
      const first = sequence[0];
      const last = sequence[sequence.length - 1];

      // wrap around first to last, last to first
      const source = backward ? first : last;
      const target = backward ? last : first;
      if (isActiveElement(source)) {
        target.focus();
        return;
      }

      // find current position in tabsequence
      let currentIndex;
      const found = sequence.some(function(element, index) {
        if (!isActiveElement(element)) {
          return false;
        }

        currentIndex = index;
        return true;
      });

      if (!found) {
        // redirect to first as we're not in our tabsequence
        first.focus();
        return;
      }

      // shift focus to previous/next element in the sequence
      const offset = backward ? -1 : 1;
      sequence[currentIndex + offset].focus();
    },
  });
}
