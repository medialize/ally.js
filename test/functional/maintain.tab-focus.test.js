define([
  'intern!object',
  'intern/chai!expect',
  'require',
  // https://theintern.github.io/leadfoot/keys.html
  'intern/dojo/node!leadfoot/keys',
], function(registerSuite, expect, require, keys) {

  registerSuite(function() {
    var timeout = 120000;

    return {
      name: 'maintain/tab-focus',

      before: function() {
        return this.remote
          .get(require.toUrl('test/pages/maintain.tab-focus.test.html'))
          .setPageLoadTimeout(timeout)
          .setFindTimeout(timeout)
          .setExecuteAsyncTimeout(timeout);
      },

      forward: function() {
        this.timeout = timeout;
        return this.remote
          .findById('first')
            .click()
            .end()
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('first', 'initial position');
          })

          .pressKeys(keys.TAB)
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('second', 'after first Tab');
          })

          .pressKeys(keys.TAB)
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('third', 'after second Tab');
          })

          .pressKeys(keys.TAB)
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('first', 'after third Tab');
          });
      },
      backward: function() {
        this.timeout = timeout;
        return this.remote
          .findById('third')
            .click()
            .end()
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('third', 'initial position');
          })

          .pressKeys(keys.SHIFT)
          .pressKeys(keys.TAB)
          .pressKeys(keys.NULL)
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('second', 'after first Tab');
          })

          .pressKeys(keys.SHIFT)
          .pressKeys(keys.TAB)
          .pressKeys(keys.NULL)
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('first', 'after second Tab');
          })

          .pressKeys(keys.SHIFT)
          .pressKeys(keys.TAB)
          .pressKeys(keys.NULL)
          .sleep(500)
          .execute('return document.activeElement.id || document.activeElement.nodeName')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('third', 'after third Tab');
          });
      },
    };
  });
});
