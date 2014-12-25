/**
  USAGE:

    mapIndexes(
       ['alpha', 'bravo', 'charlie', 'delta'],
       ['alpha',          'charlie',        ],
       null
    );
    // [0, null, 1, null];

 */

define(function defineMapIndexes(/*require*/) {
  'use strict';

  function mapIndexes(master, list, placeholder) {
    var offset = 0;
    return master.map(function(item, index) {
      var target = index + offset;
      if (item === list[target]) {
        return target;
      }

      var position = list.indexOf(item, target);
      var nextPosition = master.indexOf(list[target + 1], index);

      if (position !== -1) {
        if (nextPosition !== -1) {
          offset--;
          return placeholder;
        }

        offset += position - target;
        return index + offset;
      }

      offset--;
      return placeholder;
    });
  }

  return mapIndexes;
});