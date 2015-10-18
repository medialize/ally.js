
import pointerFocusChildren from './fix/pointer-focus-children';
import pointerFocusInput from './fix/pointer-focus-input';
import pointerFocusParent from './fix/pointer-focus-parent';

import focusSource from './style/focus-source';
import focusWithin from './style/focus-within';

import maintainDisabled from './maintain/disable';
import maintainFocusTrapped from './maintain/trap';

import queryFocusable from './query/focusable';
import queryFirstTabbable from './query/first-tabbable';
import queryTabbable from './query/tabbable';
import queryTabsequence from './query/tabsequence';

import disabled from './is/disabled';
import focusRelevant from './is/focus-relevant';
import focusable from './is/focusable';
import shadowed from './is/shadowed';
import tabbable from './is/tabbable';
import validArea from './is/valid-area';
import validTabindex from './is/valid-tabindex';
import visible from './is/visible';

import elementDisabled from './element/disabled';
import insignificantBranches from './get/insignificant-branches';
import parents from './get/parents';

import attribute from './map/attribute';
import keycode from './map/keycode';

import version from './version';

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

  maintain: {
    disabled: maintainDisabled,
    focusTrapped: maintainFocusTrapped,
  },

  query: {
    firstTabbable: queryFirstTabbable,
    focusable: queryFocusable,
    tabbable: queryTabbable,
    tabsequence: queryTabsequence,
  },

  is: {
    disabled,
    focusRelevant,
    focusable,
    shadowed,
    tabbable,
    validArea,
    validTabindex,
    visible,
  },

  element: {
    disabled: elementDisabled,
  },

  get: {
    insignificantBranches,
    parents,
  },

  map: {
    attribute,
    keycode,
  },

  version,
};
