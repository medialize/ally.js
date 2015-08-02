define([
  'intern!object',
  'intern/chai!expect',
  'require',
], function(registerSuite, expect, require) {
  registerSuite({
    name: 'functional-tutorial',
    firstTest: function() {
      return this.remote
        .get(require.toUrl('test/pages/tutorial.html'))
        .setFindTimeout(5000)

        // shifting focus via TAB does not seem possible
        // https://code.google.com/p/chromedriver/issues/detail?id=762
        // .pressKeys([ '\u0009' ]) // Tab - key: 9
        // .sleep(100000)

        // // http://theintern.github.io/leadfoot/Command.html#getActiveElement
        // .getActiveElement().getProperty('id')
        // .then(function(activeElementId) {
        //   expect(activeElementId).to.equal('nameField');
        // })

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
