define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var pollUntil = require('intern/dojo/node!leadfoot/helpers/pollUntil');
  var makeCustomCommand = require('../helper/leadfoot-commands');

  var InteractionTypeCommand = makeCustomCommand({
    expectState: function(stateFlag, value, message) {
      return this.parent
        .execute('return window.handle.get()')
        .then(function(state) {
          expect(state[stateFlag]).to.equal(value, message);
        });
    },
  });

  bdd.describe('observe/interaction-type', function() {
    var timeout = 120000;

    bdd.before(function() {
      return this.remote
        .setTimeouts(timeout)
        .get(require.toUrl('test/pages/observe.interaction-type.test.html'))
        // wait until we're really initialized
        .then(pollUntil('return window.platform'));
    });

    bdd.it('should identify pointer input', function() {
      this.timeout = timeout;
      return this.remote
        .useCommand(InteractionTypeCommand)

        .execute('return window.platform.name')
        .then(function(platformName) {
          if (platformName === 'Firefox') {
            this.skip('WebDriver pressMouseButton not supported in Firefox');
          }
        }.bind(this))

        .pressMouseButton(0, 0)
        .expectState('pointer', true, 'pointer state down')

        .releaseMouseButton(0)
        .expectState('pointer', false, 'pointer state up');
    });

    bdd.it('should identify touch input', function() {
      this.timeout = timeout;
      return this.remote
        .skipUnlessCapability(this, 'touchEnabled', 'WebDriver touch not supported')
        .useCommand(InteractionTypeCommand)

        .pressFinger(0, 0)
        .expectState('pointer', true, 'pointer state down')

        .releaseFinger(0, 0)
        .expectState('pointer', false, 'pointer state up');
    });

    bdd.it('should identify multi-touch input', function() {
      this.timeout = timeout;
      return this.remote
        .skipUnlessCapability(this, 'touchEnabled', 'WebDriver touch not supported')
        .useCommand(InteractionTypeCommand)

        .pressFinger(0, 0)
        .pressFinger(50, 50)
        .expectState('pointer', true, 'pointer state down')

        .releaseFinger(0, 0)
        .releaseFinger(50, 50)
        .expectState('pointer', false, 'pointer state up');
    });
  });
});
