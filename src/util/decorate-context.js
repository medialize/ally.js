
/*
  The Context Decorator is intended to allow modules to easily map dis/engage methods to the general
  dis/engage and context API format
*/

import nodeArray from '../dom/node-array';

function destruct(/* options = {force: false} */) {
  this.context.forEach(this.disengage);
  this.context = null;
  this.engage = null;
  this.disengage = null;
}

function initialize(options = {context: document}) {
  this.context = nodeArray(options.context);
  this.context.forEach(this.engage);
  return destruct.bind(this);
}

function noop() {}

export default function(options = {engage: noop, disengage: noop}) {
  let data = {
    engage: options.engage || noop,
    disengage: options.disengage || noop,
  };

  return initialize.bind(data);
}
