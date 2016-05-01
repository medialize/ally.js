define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var sinon = require('sinon');
  var shadowInputFixture = require('../helper/fixtures/shadow-input.fixture');
  var observeShadowMutations = require('ally/observe/shadow-mutations');

  bdd.describe('observe/shadow-mutations', function() {
    var fixture;
    var handle;

    bdd.before(function() {
      fixture = shadowInputFixture();
    });

    bdd.after(function() {
      handle && handle.disengage();
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        observeShadowMutations();
      }).to.throw(TypeError, 'observe/shadow-mutations requires options.callback to be a function');

      expect(function() {
        observeShadowMutations({
          callback: function() {},
        });
      }).to.throw(TypeError, 'observe/shadow-mutations requires options.config to be an object');
    });

    bdd.it('should not fail if MutationObserver is missing', function() {
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
    });

    bdd.describe('during lifecycle', function() {
      var callback;

      bdd.before(function() {
        if (!window.MutationObserver) {
          this.skip('MutationObserver not supported');
        }

        callback = sinon.spy();
        handle = observeShadowMutations({
          context: fixture.root,
          callback: callback,
          config: {
            subtree: true,
            attributes: true,
            attributeFilter: ['data-test'],
          },
        });
      });

      bdd.it('should initialize without changes', function() {
        expect(handle.disengage).to.be.a('function', 'handle.disengage');
        expect(callback.callCount).to.equal(0, 'before change');
      });

      bdd.it('should observe changes in the context', function() {
        var deferred = this.async(10000);

        fixture.input.outer.setAttribute('data-test', 'alpha');

        setTimeout(deferred.callback(function() {
          expect(callback.callCount).to.equal(1, 'after change');
        }), 200);
      });

      bdd.describe('for ShadowDOM', function() {
        bdd.before(function() {
          if (document.body.createShadowRoot === undefined) {
            this.skip('ShadowDOM is not supported');
          }
        });

        bdd.it('should observe changes in nested ShadowRoot', function() {
          var deferred = this.async(10000);

          fixture.input.first.setAttribute('data-test', 'alpha');

          setTimeout(deferred.callback(function() {
            expect(callback.callCount).to.equal(2, 'after change');
          }), 200);
        });

        bdd.it('should observe changes in added ShadowRoot', function() {
          var deferred = this.async(10000);

          var host = document.createElement('div');
          var root = host.createShadowRoot();
          root.innerHTML = '<input>';
          var input = root.firstElementChild;
          fixture.root.appendChild(host);

          setTimeout(deferred.rejectOnError(function() {
            expect(callback.callCount).to.equal(2, 'after change');
            // trigger mutation in the new ShadowRoot
            input.setAttribute('data-test', 'bravo');
          }), 200);

          setTimeout(deferred.callback(function() {
            expect(callback.callCount).to.equal(3, 'after change');
          }), 400);
        });

        bdd.it('should not observe changes after disengage', function() {
          var deferred = this.async(10000);

          handle.disengage();
          fixture.input.outer.setAttribute('data-test', 'bravo');
          fixture.input.first && fixture.input.first.setAttribute('data-test', 'bravo');

          setTimeout(deferred.callback(function() {
            expect(callback.callCount).to.equal(3, 'after disengage');
          }), 200);
        });
      });
    });

  });
});
