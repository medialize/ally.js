define([
  'intern!object',
  'intern/chai!expect',
  '../helper/dispatch-event',
  '../helper/fixtures/custom.fixture',
  'ally/maintain/tab-focus',
], function(registerSuite, expect, dispatchEvent, customFixture, maintainTabFocus) {

  registerSuite(function() {
    var fixture;
    var handle;

    return {
      name: 'maintain/tab-focus',

      beforeEach: function() {
        fixture = customFixture([
          /*eslint-disable indent */
          '<div id="outer">',
            '<div id="inner">',
              '<input type="text" id="target">',
            '</div>',
          '</div>',
          /*eslint-enable indent */
        ]);
      },
      afterEach: function() {
        // make sure a failed test cannot leave listeners behind
        handle && handle.disengage({ force: true });
        fixture.remove();
        fixture = null;
      },

      lifecycle: function() {
        expect(maintainTabFocus).to.be.a('function');
        handle = maintainTabFocus({
          context: fixture.root,
        });

        // cannot test this because we can't synthesize keydown events for Tab
        // testing this in functional/maintain.tab-focus.test.js

        expect(handle.disengage).to.be.a('function');
      },
    };
  });
});
