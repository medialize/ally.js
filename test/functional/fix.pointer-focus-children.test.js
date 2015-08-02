define([
  'intern!object',
  'intern/chai!expect',
  'require',
], function(registerSuite, expect, require) {

  registerSuite(function() {

    // function isRelevantToBrowser() {
    //   var userAgent = window.navigator.userAgent;
    //   // This fix is only relevant to IE10 (Trident/6) and IE11 (Trident/7)
    //   return userAgent.indexOf('Trident/6') !== -1 || userAgent.indexOf('Trident/7') !== -1;
    // }

    return {
      name: 'fix/pointer-focus-children',

      firstTest: function() {
        // TODO: find out how we can identify the browser we're running on
        // if (!isRelevantToBrowser()) {
        //   this.skip('Current browser is not affected');
        // }

        return this.remote
          .get(require.toUrl('test/pages/fix.pointer-focus-children.test.html'))
          .setFindTimeout(5000)

          .findById('target-fail')
            .click()
            .end()
          .getActiveElement().getProperty('id')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('target-fail');
          })

          .findById('target-fixed')
            .click()
            .end()
          .getActiveElement().getProperty('id')
          .then(function(activeElementId) {
            expect(activeElementId).to.equal('target-fixed');
          });
      },
    };
  });
});
