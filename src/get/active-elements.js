
// [0] always is the actual active element (even within web-components)
// [0+n] is the hierarchy of shadow-doms with [length -1] being the top most shadow-host

import isShadowed from './is-shadowed';
import getShadowHostParents from './shadow-host-parents';

function walkToShadowedElement() {
  var list = [document.activeElement];

  while (list[0] && list[0].shadowRoot) {
    list.unshift(list[0].shadowRoot.activeElement);
  }

  return list;
}

function walkFromShadowedElement() {
  var hosts = getShadowHostParents(document.activeElement);
  return [document.activeElement].concat(hosts);
}

export default function() {
  // Firefox currently leaks the shadowed element
  // @browser-issue https://bugzilla.mozilla.org/show_bug.cgi?id=1117535
  if (isShadowed(document.activeElement)) {
    return walkFromShadowedElement();
  }

  return walkToShadowedElement();
}
