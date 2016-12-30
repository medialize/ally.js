define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var dispatchEvent = require('../helper/dispatch-event');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var maintainTabFocus = require('ally/maintain/tab-focus');

  bdd.describe('maintain/tab-focus', function() {
    var fixture;
    var handle;

    bdd.before(function() {
      fixture = customFixture([
        /* eslint-disable indent */
        '<div id="outer">',
          '<div id="inner">',
            '<input type="text" id="first">',
            '<input type="text" id="second">',
            '<input type="text" id="third">',
          '</div>',
        '</div>',
        /*eslint-disable indent */
      ]);

      var supportsSynthEvent = dispatchEvent.createKey('keydown', {
        key: 'Tab',
        keyCode: 9,
      });

      if (supportsSynthEvent.keyCode !== 9) {
        this.skip('Synthetic Tab events not supported');
      }
    });

    bdd.after(function() {
      handle && handle.disengage({ force: true });
      fixture.remove();
      fixture = null;
    });

    bdd.it('should wrap focus from last to first element', function() {
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
    });
  });
});
