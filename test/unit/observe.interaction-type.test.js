define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var dispatchEvent = require('../helper/dispatch-event');
  var observeInteractionType = require('ally/observe/interaction-type');

  bdd.describe('observe/interaction-type', function() {
    bdd.it('should return a service handle', function() {
      var handle = observeInteractionType();
      expect(handle.disengage).to.be.a('function');
      expect(handle.get).to.be.a('function');

      var type = handle.get();
      expect(type.pointer).to.equal(false, 'pointer');
      expect(type.key).to.equal(false, 'key');

      handle.disengage({force: true});
    });

    bdd.describe('for mouse interaction', function() {
      var handle;

      bdd.before(function() {
        handle = observeInteractionType();
      });

      bdd.after(function() {
        // make sure a failed test cannot leave listeners behind
        handle && handle.disengage({force: true});
      });

      bdd.it('should show no interaction initially', function() {
        var type = handle.get();
        expect(type.pointer).to.equal(false, 'pointer');
        expect(type.key).to.equal(false, 'key');
      });

      bdd.it('should show interaction after mousedown', function() {
        dispatchEvent.mouse(document.documentElement, 'mousedown', {});

        var type = handle.get();
        expect(type.pointer).to.equal(true, 'pointer');
        expect(type.key).to.equal(false, 'key');
      });

      bdd.it('should revert interactions after mouseup event', function() {
        var deferred = this.async(10000);

        dispatchEvent.mouse(document.documentElement, 'mouseup', {});

        var type = handle.get();
        expect(type.pointer).to.equal(true, 'pointer immediately');
        expect(type.key).to.equal(false, 'key immediately');

        setTimeout(deferred.callback(function() {
          type = handle.get();
          expect(type.pointer).to.equal(false, 'pointer delayed');
          expect(type.key).to.equal(false, 'key delayed');
        }), 20);
      });
    });

    bdd.describe('for keyboard interaction', function() {
      var handle;

      bdd.before(function() {
        handle = observeInteractionType();

        var supportsSynthEvent = dispatchEvent.createKey('keydown', {
          key: 'Tab',
          keyCode: 9,
        });

        if (supportsSynthEvent.keyCode !== 9) {
          this.skip('Synthetic Tab events not supported');
        }
      });

      bdd.after(function() {
        // make sure a failed test cannot leave listeners behind
        handle && handle.disengage({force: true});
      });

      bdd.it('should show no interaction initially', function() {
        var type = handle.get();
        expect(type.pointer).to.equal(false, 'pointer');
        expect(type.key).to.equal(false, 'key');
      });

      bdd.it('should show interaction after keydown', function() {
        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Tab',
          keyCode: 9,
        });

        var type = handle.get();
        expect(type.pointer).to.equal(false, 'pointer');
        expect(type.key).to.equal(true, 'key');
      });

      bdd.it('should revert interactions after keyup event', function() {
        var deferred = this.async(10000);

        dispatchEvent.key(document.documentElement, 'keyup', {
          key: 'Tab',
          keyCode: 9,
        });

        var type = handle.get();
        expect(type.pointer).to.equal(false, 'pointer immediately');
        expect(type.key).to.equal(true, 'key immediately');

        setTimeout(deferred.callback(function() {
          type = handle.get();
          expect(type.pointer).to.equal(false, 'pointer delayed');
          expect(type.key).to.equal(false, 'key delayed');
        }), 20);
      });

      bdd.it('should ignore shift on keydown', function() {
        var spaceKey = {
          key: 'Space',
          keyCode: 16,
        };

        if (dispatchEvent.key(null, 'keydown', spaceKey).keyCode !== 16) {
          this.skip('Synthetic shift event not detectable');
        }

        dispatchEvent.key(document.documentElement, 'keydown', spaceKey);

        var type = handle.get();
        expect(type.pointer).to.equal(false, 'key-down pointer');
        expect(type.key).to.equal(false, 'key-down key');
      });
    });

  });
});
