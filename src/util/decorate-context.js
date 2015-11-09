
/*
  The Context Decorator is intended to allow modules to easily map dis/engage methods to the general
  dis/engage and context API format
*/

import nodeArray from '../util/node-array';

function destruct(/* {force: false} */) {
  if (!this.context) {
    return;
  }

  this.context.forEach(this.disengage);
  this.context = null;
  this.engage = null;
  this.disengage = null;
}

function initialize({context} = {}) {
  this.context = nodeArray(context || document);
  this.context.forEach(this.engage);
  return {
    disengage: destruct.bind(this),
  };
}

function noop() {}

export default function({engage, disengage} = {}) {
  const data = {
    engage: engage || noop,
    disengage: disengage || noop,
    context: null,
  };

  return initialize.bind(data);
}
