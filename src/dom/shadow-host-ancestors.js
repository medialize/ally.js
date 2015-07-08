
import shadowHost from './shadow-host';

export default function shadowHostAncestors(element) {
  var list = [];
  while (element) {
    element = shadowHost(element);
    if (!element) {
      break;
    }

    list.push(element);
  }

  return list;
}
