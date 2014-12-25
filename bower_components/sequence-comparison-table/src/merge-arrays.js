/**
  USAGE:

    mergeArrays(
       ['alpha', 'bravo', 'charlie',                  'foxtrot',            'golf', 'golf'],
       ['alpha',          'charlie', 'delta', 'echo', 'foxtrot', 'charlie', 'golf',         'hotel'],
       [                                                                                    'hotel', 'india']
    );
    // ['alpha', 'bravo', 'charlie', 'delta', 'echo', 'foxtrot', 'charlie', 'golf', 'golf', 'hotel', 'india'];

 */
define(function defineMergeArrays(/*require*/) {
  'use strict';

  function getInsertionIndexes(from, to) {
    var previous = -1;
    var changes = 0;
    var indexes = from.map(function(item) {
      var position = to.indexOf(item);
      if (position <= previous) {
        position = -1;
      } else {
        previous = position;
      }

      if (position === -1) {
        changes++;
      }

      return position;
    });

    indexes.changes = changes;
    return indexes;
  }

  function insertIndexes(indexes, from, to) {
    var previous = 0;
    var result = [];

    indexes.forEach(function(_to, _from) {
      if (_to === -1) {
        result.push(from[_from]);
      } else {
        result = result.concat(to.slice(previous, _to + 1));
        previous = _to + 1;
      }
    });

    if (previous <= to.length) {
      result = result.concat(to.slice(previous));
    }

    return result;
  }

  function mergeArrays() {
    var target = arguments[0].slice(0);
    var sources = [].slice.call(arguments, 1);
    sources.forEach(function(source) {
      var _sources = getInsertionIndexes(source, target);
      var _targets = getInsertionIndexes(target, source);
      if (!_sources.changes) {
        // no mutation required
      } else if (_sources.changes < _targets.changes) {
        target = insertIndexes(_sources, source, target);
      } else {
        target = insertIndexes(_targets, target, source);
      }
    });

    return target;
  }

  return mergeArrays;
});