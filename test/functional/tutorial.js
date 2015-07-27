define([
  'intern!object',
  'intern/chai!expect',
  'require',
], function(registerSuite, expect, require) {
  registerSuite({
    name: 'functional-tutorial',
    firstTest: function() {
      return this.remote
        .get(require.toUrl('test/helper/tutorial.html'))
        .setFindTimeout(5000)
        .findById('nameField')
          .click()
          .type('Elaine')
          .end()
        .findByCssSelector('#loginForm input[type=submit]')
          .click()
          .end()
        .findById('greeting')
        .getVisibleText()
        .then(function(text) {
          expect(text).to.equal('Hello, Elaine!');
        });
    },
  });
});
