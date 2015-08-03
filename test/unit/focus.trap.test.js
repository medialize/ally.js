define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  'ally/supports/focusout-event',
  'ally/focus/trap',
], function(registerSuite, expect, focusableFixture, canFocusoutEvent, focusTrap) {

  registerSuite(function() {
    var fixture;
    var handle;

    return {
      name: 'focus/trap',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        // make sure a failed test cannot leave listeners behind
        handle && handle.disengage();
        // blur shadowed activeElements before removal
        // @browser-issue Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1117535#c5
        document.activeElement.blur();
        fixture.remove();
        fixture = null;
      },

      lifecycle: function() {
        handle = focusTrap({
          context: '.context',
        });

        expect(document.activeElement).to.equal(document.body, 'initial');

        document.getElementById('link').focus();
        expect(document.activeElement).to.equal(document.getElementById('link'), 'first');

        document.getElementById('link-tabindex--1').focus();
        expect(document.activeElement).to.equal(document.getElementById('link-tabindex--1'), 'last');

        if (canFocusoutEvent) {
          document.getElementById('tabindex-0').focus();
          expect(document.activeElement).to.equal(document.getElementById('link'), 'outside before goes to first');

          document.getElementById('input').focus();
          expect(document.activeElement).to.equal(document.getElementById('link'), 'outside after goes to first');
        }

        document.activeElement.blur();
        expect(document.activeElement).to.equal(document.body, 'allow blur');

        handle.disengage();
      },
      'focus first': function() {
        handle = focusTrap({
          context: '.context',
          focusFirst: true,
        });

        expect(document.activeElement).to.equal(document.getElementById('link'));
      },
    };
  });
});
