var expect = require("chai").expect;
var arrayFindIndex = require('./');

var runArrayTests = function() {
  var list = [5, 10, 15, 20];

  describe('Array#findIndex', function() {
    it('should have a length of 1', function() {
      expect(Array.prototype.findIndex.length).to.equal(1);
    });

    it('should find item key by predicate', function() {
      var result = list.findIndex(function(item) { return item === 15; });
      expect(result).to.equal(2);
    });

    it('should return -1 when nothing matched', function() {
      var result = list.findIndex(function(item) { return item === 'a'; });
      expect(result).to.equal(-1);
    });

    it('should throw TypeError when function was not passed', function() {
      expect(function() { list.findIndex(); }).to.throw(TypeError);
    });

    it('should receive all three parameters', function() {
      var index = list.findIndex(function(value, index, arr) {
        expect(list[index]).to.equal(value);
        expect(list).to.eql(arr);
        return false;
      });
      expect(index).to.equal(-1);
    });

    it('should work with the context argument', function() {
      var context = {};
      [1].findIndex(function() { expect(this).to.equal(context); }, context);
    });

    it('should work with an array-like object', function() {
      var obj = { '0': 1, '1': 2, '2': 3, length: 3 };
      var foundIndex = Array.prototype.findIndex.call(obj, function(item) { return item === 2; });
      expect(foundIndex).to.equal(1);
    });

    it('should work with an array-like object with negative length', function() {
      var obj = { '0': 1, '1': 2, '2': 3, length: -3 };
      var foundIndex = Array.prototype.findIndex.call(obj, function(item) {
        throw new Error('should not reach here');
      });
      expect(foundIndex).to.equal(-1);
    });

    it('should work with a sparse array', function() {
      var obj = [1, , undefined];
      expect(1 in obj).to.equal(false);
      var seen = [];
      var foundIndex = obj.findIndex(function(item, idx) {
        seen.push([idx, item]);
        return item === undefined && idx === 2;
      });
      expect(foundIndex).to.equal(2);
      expect(seen).to.eql([[0, 1], [1, undefined], [2, undefined]]);
    });

    it('should work with a sparse array-like object', function() {
      var obj = { '0': 1, '2': undefined, length: 3.2 };
      var seen = [];
      var foundIndex = Array.prototype.findIndex.call(obj, function(item, idx) {
        seen.push([idx, item]);
        return false;
      });
      expect(foundIndex).to.equal(-1);
      expect(seen).to.eql([[0, 1], [1, undefined], [2, undefined]]);
    });
  });
};

describe('clean Object.prototype', runArrayTests);

describe('polluted Object.prototype', function() {
  Object.prototype[1] = 42;
  runArrayTests();
  delete Object.prototype[1];
});

