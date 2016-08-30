
import getParents from '../get/parents';

export default function collectScrollPositions(element) {
  const parents = getParents({context: element});
  const list = parents.slice(1).map(function(element) {
    return {
      element,
      scrollTop: element.scrollTop,
      scrollLeft: element.scrollLeft,
    };
  });

  return function resetScrollPositions() {
    list.forEach(function(entry) {
      entry.element.scrollTop = entry.scrollTop;
      entry.element.scrollLeft = entry.scrollLeft;
    });
  };
}
