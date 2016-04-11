define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var pollUntil = require('intern/dojo/node!leadfoot/helpers/pollUntil');

  bdd.describe('observe/interaction-type', function() {
    var timeout = 120000;

    bdd.before(function() {
      return this.remote
        .get(require.toUrl('test/pages/observe.interaction-type.test.html'))
        .setPageLoadTimeout(timeout)
        .setFindTimeout(timeout)
        .setExecuteAsyncTimeout(timeout)
        // wait until we're really initialized
        .then(pollUntil('return window.platform'));
    });

    bdd.it('should identify pointer input', function() {
      this.timeout = timeout;
      return this.remote
        .execute('return window.platform.name')
        .then(function(platformName) {
          if (platformName === 'Firefox') {
            this.skip('WebDriver pressMouseButton not supported in Firefox');
          }
        }.bind(this))

        .pressMouseButton(0, 0)
        .execute('return window.handle.get()')
        .then(function(state) {
          expect(state.pointer).to.equal(true, 'pointer state down');
        })

        .releaseMouseButton(0)
        .execute('return window.handle.get()')
        .then(function(state) {
          expect(state.pointer).to.equal(false, 'pointer state up');
        });
    });

    bdd.it('should identify touch input', function() {
      var test = this;
      this.timeout = timeout;
      return this.remote
        .then(function() {
          if (!this.session.capabilities.touchEnabled) {
            test.skip('WebDriver touch not supported');
          }
        })

        .pressFinger(0, 0)
        .execute('return window.handle.get()')
        .then(function(state) {
          expect(state.pointer).to.equal(true, 'pointer state down');
        })

        .releaseFinger(0, 0)
        .execute('return window.handle.get()')
        .then(function(state) {
          expect(state.pointer).to.equal(false, 'pointer state up');
        });
    });

    bdd.it('should identify multi-touch input', function() {
      var test = this;
      this.timeout = timeout;
      return this.remote
        .then(function() {
          if (!this.session.capabilities.touchEnabled) {
            test.skip('WebDriver touch not supported');
          }
        })

        .pressFinger(0, 0)
        .pressFinger(50, 50)
        .execute('return window.handle.get()')
        .then(function(state) {
          expect(state.pointer).to.equal(true, 'pointer state down');
        })

        .releaseFinger(0, 0)
        .releaseFinger(50, 50)
        .execute('return window.handle.get()')
        .then(function(state) {
          expect(state.pointer).to.equal(false, 'pointer state up');
        });
    });
  });
});
