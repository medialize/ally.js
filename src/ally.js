
import pointerFocusChildren from './fix/pointer-focus-children';
import pointerFocusInput from './fix/pointer-focus-input';
import pointerFocusParent from './fix/pointer-focus-parent';

import focusSource from './style/focus-source';
import focusWithin from './style/focus-within';

import maintainDisabled from './maintain/disabled';
import maintainFocusTrapped from './maintain/focus-trapped';
import maintainHidden from './maintain/hidden';

import whenFocusable from './when/focusable';
import whenKey from './when/key';
import whenVisibleArea from './when/visible-area';

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
    hidden: maintainHidden,
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

  when: {
    focusable: whenFocusable,
    key: whenKey,
    visible: whenVisibleArea,
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
