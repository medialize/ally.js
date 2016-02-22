define([
  'intern!object',
  'intern/chai!expect',
  'ally/util/get-document',
], function(registerSuite, expect, getDocument) {

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
