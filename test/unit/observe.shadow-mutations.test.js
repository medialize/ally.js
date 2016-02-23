define([
  'intern!object',
  'intern/chai!expect',
  'sinon',
  '../helper/fixtures/shadow-input.fixture',
  'ally/observe/shadow-mutations',
], function(registerSuite, expect, sinon, shadowInputFixture, observeShadowMutations) {

  registerSuite(function() {
    var fixture;
    var handle;

    return {
      name: 'observe/shadow-mutations',

      beforeEach: function() {
        fixture = shadowInputFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
        handle && handle.disengage();
      },

      invalid: function() {
        expect(function() {
          observeShadowMutations();
        }).to.throw(TypeError, 'observe/shadow-mutations requires options.callback to be a function');
        expect(function() {
          observeShadowMutations({
            callback: function() {},
          });
        }).to.throw(TypeError, 'observe/shadow-mutations requires options.config to be an object');
      },

      lifecycle: function() {
        if (!window.MutationObserver) {
          this.skip('MutationObserver not supported');
        }

        var deferred = this.async(10000);

        var callback = sinon.spy();
        handle = observeShadowMutations({
          context: fixture.root,
          callback: callback,
          config: {
            subtree: true,
            attributes: true,
            attributeFilter: ['data-test'],
          },
        });

        expect(handle.disengage).to.be.a('function', 'handle.disengage');
        expect(callback.callCount).to.equal(0, 'before change');

        fixture.input.outer.setAttribute('data-test', 'alpha');

        setTimeout(deferred.rejectOnError(function() {
          expect(callback.callCount).to.equal(1, 'after change');

          handle.disengage();
          fixture.input.outer.setAttribute('data-test', 'bravo');

          setTimeout(deferred.callback(function() {
            expect(callback.callCount).to.equal(1, 'after disengage');
          }), 200);
        }), 200);
      },

      'lifecycle ShadowDOM': function() {
        if (!window.MutationObserver) {
          this.skip('MutationObserver not supported');
        }

        if (document.body.createShadowRoot === undefined) {
          this.skip('Shadow DOM not supported');
        }

        var deferred = this.async(10000);

        var callback = sinon.spy();
        handle = observeShadowMutations({
          context: fixture.root,
          callback: callback,
          config: {
            subtree: true,
            attributes: true,
            attributeFilter: ['data-test'],
          },
        });

        expect(callback.callCount).to.equal(0, 'before change');

        fixture.input.first.setAttribute('data-test', 'alpha');

        setTimeout(deferred.rejectOnError(function() {
          expect(callback.callCount).to.equal(1, 'after change');

          handle.disengage();
          fixture.input.first.setAttribute('data-test', 'bravo');

          setTimeout(deferred.callback(function() {
            expect(callback.callCount).to.equal(1, 'after disengage');
          }), 200);
        }), 200);
      },

      'lifecycle added ShadowDOM': function() {
        if (!window.MutationObserver) {
          this.skip('MutationObserver not supported');
        }

        if (document.body.createShadowRoot === undefined) {
          this.skip('Shadow DOM not supported');
        }

        var deferred = this.async(10000);

        var callback = sinon.spy();
        handle = observeShadowMutations({
          context: fixture.root,
          callback: callback,
          config: {
            subtree: true,
            attributes: true,
            attributeFilter: ['data-test'],
          },
        });

        expect(callback.callCount).to.equal(0, 'before adding root');

        var host = document.createElement('div');
        var root = host.createShadowRoot();
        root.innerHTML = '<input>';
        var input = root.firstElementChild;
        fixture.root.appendChild(host);

        setTimeout(deferred.rejectOnError(function() {
          expect(callback.callCount).to.equal(0, 'after adding root');

          input.setAttribute('data-test', 'bravo');

          setTimeout(deferred.callback(function() {
            expect(callback.callCount).to.equal(1, 'after change');
          }), 200);
        }), 200);
      },

      'unsupported MutationObserver': function() {
        if (window.MutationObserver) {
          this.skip('MutationObserver is supported');
        }

        handle = observeShadowMutations({
          context: fixture.root,
          callback: function() {},
          config: {},
        });

        expect(handle.disengage).to.be.a('function', 'handle.disengage');
        handle.disengage();
      },

    };
  });
});
