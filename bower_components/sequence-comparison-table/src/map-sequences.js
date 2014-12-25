/**
  USAGE:

    mapSequences({
      first: ['alpha', 'charlie', 'delta'],
      second: ['bravo', 'charlie', 'delta', 'echo'],
      third: ['alpha', 'alpha', 'charlie', 'alpha' 'delta'],
    });

    // result:
    {
      sequence: ['alpha', 'alpha', 'bravo', 'charlie', 'alpha', 'delta', 'echo'],
      indexes: {
        first: [0, null, null, 1, null, 2, null],
        second: [null, null, 0, 1, null, 2, 3],
        third: [0, 1, null, 2, 3, 4, null],
      }
    }

 */

define(function defineMapSequences(require) {
  'use strict';

  var mergeArrays = require('./merge-arrays');
  var mapIndexes = require('./map-indexes');

  function mapSequences(data) {
    var sequences = Object.keys(data).map(function(key) {
      if (!Array.isArray(data[key])) {
        throw new Error('sequenceTable() expectes an object of arrays, property "' + key + '" is not an array!');
      }

      return data[key];
    });

    if (sequences.length < 2) {
      throw new Error('sequenceTable() expectes at least two sequences, ' + sequences.length + ' given!');
    }

    var sequence = mergeArrays.apply(null, sequences);
    var result = {
      sequence: sequence,
      indexes: {}
    };

    Object.keys(data).forEach(function(key) {
      result.indexes[key] = mapIndexes(sequence, data[key], null);
    });

    return result;
  }

  return mapSequences;
});