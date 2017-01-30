define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var findIndex = require('ally/util/array-find-index');

  bdd.describe('util/findIndex', function() {
    bdd.it('should return -1 for an empty array', function() {
      var array = [];
      var result = findIndex(array, function() {
        return true;
      });
      expect(result).to.equal(-1);
    });

    bdd.it('should return -1 if an item is not found in an array', function() {
      var array = [1, 2, 3, 4, 5];
      var result = findIndex(array, function(item) {
        return item === 6;
      });
      expect(result).to.equal(-1);
    });

    bdd.it('should return the index of the matched item if one is found', function() {
      var array = [1, 2, 3, 4, 5];
      var result = findIndex(array, function(item) {
        return item === 3;
      });
      expect(result).to.equal(2);
      expect(array[result]).to.equal(3);
    });
  });
});
