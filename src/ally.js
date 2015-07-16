
import queryFocusable from './query/focusable';
import queryTabbable from './query/tabbable';
import isFocusable from './is/focusable';
import isTabbable from './is/tabbable';
import keycode from './map/keycode';

export default {
  query: {
    focusable: queryFocusable,
    tabbable: queryTabbable,
  },
  is: {
    focusable: isFocusable,
    tabbable: isTabbable,
  },
  map: {
    keycode: keycode,
  },
};
