
import pointerFocusChildren from './fix/pointer-focus-children';
import pointerFocusInput from './fix/pointer-focus-input';
import pointerFocusParent from './fix/pointer-focus-parent';

import focusSource from './style/focus-source';
import focusWithin from './style/focus-within';

import disable from './focus/disable';
import trap from './focus/trap';

import queryFocusable from './query/focusable';
import queryFirstTabbable from './query/first-tabbable';
import queryTabbable from './query/tabbable';
import queryTabsequence from './query/tabsequence';

import disabled from './is/disabled';
import focusable from './is/focusable';
import shadowed from './is/shadowed';
import tabbable from './is/tabbable';
import validArea from './is/valid-area';
import validTabindex from './is/valid-tabindex';
import visible from './is/visible';

import attribute from './map/attribute';
import keycode from './map/keycode';

export default {
  fix: {
    pointerFocusChildren,
    pointerFocusInput,
    pointerFocusParent,
  },

  style: {
    focusSource,
    focusWithin,
  },

  focus: {
    disable,
    trap,
  },

  query: {
    firstTabbable: queryFirstTabbable,
    focusable: queryFocusable,
    tabbable: queryTabbable,
    tabsequence: queryTabsequence,
  },

  is: {
    disabled,
    focusable,
    shadowed,
    tabbable,
    validArea,
    validTabindex,
    visible,
  },

  map: {
    attribute,
    keycode,
  },
};
