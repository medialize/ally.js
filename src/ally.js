
// this builds up the UMD bundle

import element from './element/_element';
import event from './event/_event';
import fix from './fix/_fix';
import get from './get/_get';
import is from './is/_is';
import maintain from './maintain/_maintain';
import map from './map/_map';
import observe from './observe/_observe';
import query from './query/_query';
import style from './style/_style';
import when from './when/_when';
import version from './version';

// save current window.ally for noConflict()
const conflicted = typeof window !== 'undefined' && window.ally;

export default {
  element,
  event,
  fix,
  get,
  is,
  maintain,
  map,
  observe,
  query,
  style,
  when,
  version,
  noConflict: function() {
    if (typeof window !== 'undefined' && window.ally === this) {
      window.ally = conflicted;
    }

    return this;
  },
};
