define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var getDocument = require('ally/util/get-document');

  bdd.describe('util/get-document', function() {
    bdd.it('should default document', function() {
      var _document = getDocument();
      expect(_document).to.equal(document);
    });

    bdd.it('should resolve document', function() {
      var _document = getDocument(document);
      expect(_document).to.equal(document);
    });

    bdd.it('should resolve elements', function() {
      var _document = getDocument(document.body);
      expect(_document).to.equal(document);
    });

  });
});
