define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var getDocument = require('ally/util/get-document');

  registerSuite(function() {
    return {
      name: 'util/get-document',

      'default document': function() {
        var _document = getDocument();
        expect(_document).to.equal(document);
      },
      'resolve document': function() {
        var _document = getDocument(document);
        expect(_document).to.equal(document);
      },
      'resolve node': function() {
        var _document = getDocument(document.body);
        expect(_document).to.equal(document);
      },
    };
  });
});
