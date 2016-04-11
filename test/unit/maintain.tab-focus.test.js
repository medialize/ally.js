define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var dispatchEvent = require('../helper/dispatch-event');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var maintainTabFocus = require('ally/maintain/tab-focus');

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
              '<input type="text" id="first">',
              '<input type="text" id="second">',
              '<input type="text" id="third">',
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

        expect(handle.disengage).to.be.a('function');
      },
      forward: function() {
        var supportsSynthEvent = dispatchEvent.createKey('keydown', {
          key: 'Tab',
          keyCode: 9,
        });

        if (supportsSynthEvent.keyCode !== 9) {
          this.skip('Synthetic Tab events not supported');
        }

        handle = maintainTabFocus();

        document.getElementById('third').focus();

        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Tab',
          keyCode: 9,
        });

        expect(document.activeElement.id).to.equal('first', 'handle tab key');

        handle.disengage();

        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Tab',
          keyCode: 9,
        });

        expect(document.activeElement.id).to.equal('first', 'tab key not handled after disengage');
      },
    };
  });
});
