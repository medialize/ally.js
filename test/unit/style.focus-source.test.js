define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var shadowInputFixture = require('../helper/fixtures/shadow-input.fixture');
  var delay = require('../helper/delay');
  var dispatchEvent = require('../helper/dispatch-event');
  var styleFocusSource = require('ally/style/focus-source');

  bdd.describe('style/focus-source', function() {
    var fixture;
    var handle;

    function simulateTabKeyTo(element) {
      dispatchEvent.key(document.documentElement, 'keydown', {
        key: 'Tab',
        keyCode: 9,
      });

      element.focus();
      dispatchEvent.key(document.documentElement, 'keyup', {
        key: 'Tab',
        keyCode: 9,
      });
    }

    function simulateClickOn(element) {
      dispatchEvent.mouse(document.documentElement, 'mousedown', {});
      element.focus();
      dispatchEvent.mouse(document.documentElement, 'mouseup', {});
    }

    bdd.before(function() {
      if (!document.hasFocus()) {
        this.skip('focus events are not processed properly while document does not have focus');
      }

      fixture = shadowInputFixture();
    });

    bdd.after(function() {
      handle && handle.disengage({ force: true });
      fixture && fixture.remove();
      fixture = null;
    });

    bdd.describe('lifecycle', function() {
      bdd.afterEach(function() {
        if (document.activeElement && document.activeElement !== document.body) {
          document.activeElement.blur();
        }

        // allow the EventLoop to run ally.style.focusSource's cleanup
        return delay(20);
      });

      bdd.it('should engage a service', function() {
        handle = styleFocusSource();
        expect(handle.disengage).to.be.a('function', 'handle.disengage');
        expect(handle.lock).to.be.a('function', 'handle.lock');
        expect(handle.current).to.be.a('function', 'handle.current');
        expect(handle.used).to.be.a('function', 'handle.used');
      });

      bdd.it('should start in initial state', function() {
        expect(document.documentElement.getAttribute('data-focus-source')).to.equal('initial', 'attribute');
        expect(handle.current()).to.equal('initial', 'handle.current()');
      });

      bdd.it('should register focus shift by script', function() {
        fixture.input.outer.focus();

        expect(document.activeElement).to.equal(fixture.input.outer, 'activeElement');
        expect(document.documentElement.getAttribute('data-focus-source')).to.equal('script', 'attribute');
        expect(document.documentElement.className.indexOf('focus-source-script') !== -1).to.equal(true, 'script class');
        expect(document.documentElement.className.indexOf('focus-source-key') !== -1).to.equal(false, 'key class');
        expect(document.documentElement.className.indexOf('focus-source-pointer') !== -1).to.equal(false, 'pointer class');
        expect(handle.current()).to.equal('script', 'handle.current()');
        expect(handle.used('initial')).to.equal(true, 'handle.used(initial)');
        expect(handle.used('script')).to.equal(true, 'handle.used(script)');
        expect(handle.used('key')).to.equal(false, 'handle.used(key)');
        expect(handle.used('pointer')).to.equal(false, 'handle.used(pointer)');
      });

      bdd.it('should register focus shift by keyboard', function() {
        simulateTabKeyTo(fixture.input.outer);

        expect(document.documentElement.getAttribute('data-focus-source')).to.equal('key', 'attribute');
        expect(document.documentElement.className.indexOf('focus-source-script') !== -1).to.equal(true, 'script class');
        expect(document.documentElement.className.indexOf('focus-source-key') !== -1).to.equal(true, 'key class');
        expect(document.documentElement.className.indexOf('focus-source-pointer') !== -1).to.equal(false, 'pointer class');
        expect(handle.current()).to.equal('key', 'handle.current()');
        expect(handle.used('initial')).to.equal(true, 'handle.used(initial)');
        expect(handle.used('script')).to.equal(true, 'handle.used(script)');
        expect(handle.used('key')).to.equal(true, 'handle.used(key)');
        expect(handle.used('pointer')).to.equal(false, 'handle.used(pointer)');
      });

      bdd.it('should register focus shift by script after keyboard', function() {
        fixture.input.after.focus();
        expect(handle.current()).to.equal('script', 'handle.current()');
      });

      bdd.it('should register focus shift by pointer', function() {
        simulateClickOn(fixture.input.outer);

        expect(document.documentElement.getAttribute('data-focus-source')).to.equal('pointer', 'attribute');
        expect(document.documentElement.className.indexOf('focus-source-script') !== -1).to.equal(true, 'script class');
        expect(document.documentElement.className.indexOf('focus-source-key') !== -1).to.equal(true, 'key class');
        expect(document.documentElement.className.indexOf('focus-source-pointer') !== -1).to.equal(true, 'pointer class');
        expect(handle.current()).to.equal('pointer', 'handle.current()');
        expect(handle.used('initial')).to.equal(true, 'handle.used(initial)');
        expect(handle.used('script')).to.equal(true, 'handle.used(script)');
        expect(handle.used('key')).to.equal(true, 'handle.used(key) after focus shift');
        expect(handle.used('pointer')).to.equal(true, 'handle.used(pointer) after focus shift');
      });

      bdd.it('should register focus shift by script after pointer', function() {
        fixture.input.after.focus();
        expect(handle.current()).to.equal('script', 'handle.current()');
      });

      bdd.it('should retain "key" on lock("key")', function() {
        handle.lock('key');
        fixture.input.after.focus();
        expect(handle.current()).to.equal('key', 'handle.current()');

        fixture.input.outer.focus();
        expect(handle.current()).to.equal('key', 'handle.current() repeat');
      });

      bdd.it('should retain "pointer" on lock("pointer")', function() {
        handle.lock('pointer');
        fixture.input.after.focus();
        expect(handle.current()).to.equal('pointer', 'handle.current()');

        fixture.input.outer.focus();
        expect(handle.current()).to.equal('pointer', 'handle.current() repeat');
      });

      bdd.it('should unlock on unlock()', function() {
        handle.unlock();

        fixture.input.after.focus();
        expect(handle.current()).to.equal('script', 'handle.current()');
      });

      bdd.it('should cleanup after disengage', function() {
        handle.disengage();
        handle = null;

        expect(document.documentElement.hasAttribute('data-focus-source')).to.equal(false, 'attribute');
      });
    });
  });
});
