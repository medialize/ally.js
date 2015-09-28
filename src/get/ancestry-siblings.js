
// inspired by Marcy Sutton's Material Dialog Component:
// https://github.com/angular/material/blob/v0.11.1/src/components/dialog/dialog.js#L748-L783

import getParents from './parents';
import contextToElement from '../util/context-to-element';

function getSiblings(element) {
  const parent = element.parentElement;
  return parent && [].filter.call(parent.children, function(sibling) {
    return sibling !== element;
  }) || [];
}

export default function({context} = {}) {
  const element = contextToElement({
    message: 'get/ancestry-siblings requires valid options.context',
    context,
  });
  const parents = getParents({context: element});
  return parents.map(getSiblings).reduce(function(previous, current) {
    return previous.concat(current);
  }, []);
}
