define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/shadow-input.fixture',
  '../helper/dispatch-event',
  'ally/style/focus-source',
], function(registerSuite, expect, shadowInputFixture, dispatchEvent, styleFocusSource) {

  registerSuite(function() {
    var fixture;
    var handle;

    return {
      name: 'style/focus-source',

      beforeEach: function() {
        fixture = shadowInputFixture();
      },
      afterEach: function() {
        // make sure a failed test cannot leave listeners behind
        handle && handle.disengage({ force: true });
        fixture.remove();
        fixture = null;
      },

      lifecycle: function() {
        var deferred = this.async(100);
        expect(document.documentElement.hasAttribute('data-focus-source')).to.equal(false, 'before engage');

        // initiate with delay because of IE10's async focus event from previous test
        setTimeout(deferred.callback(function() {
          handle = styleFocusSource();
          expect(handle.disengage).to.be.a('function');
          expect(handle.lock).to.be.a('function');
          expect(handle.current).to.be.a('function');
          expect(handle.used).to.be.a('function');

          expect(document.documentElement.getAttribute('data-focus-source')).to.equal('initial', 'attribute after engage');
          expect(handle.current()).to.equal('initial', 'current after engage');

          fixture.input.outer.focus();
          expect(document.activeElement).to.equal(fixture.input.outer, 'focus shift');
          expect(document.documentElement.getAttribute('data-focus-source')).to.equal('script', 'attribute focus shift');
          expect(handle.current()).to.equal('script', 'current focus shift');
          expect(handle.used('initial')).to.equal(true, 'used(initial) focus shift');
          expect(handle.used('script')).to.equal(true, 'used(script) focus shift');
          expect(handle.used('key')).to.equal(false, 'used(key) focus shift');
          expect(handle.used('pointer')).to.equal(false, 'used(pointer) focus shift');

          handle.disengage();
          handle = null;
          expect(document.documentElement.hasAttribute('data-focus-source')).to.equal(false, 'after disengage');
        }), 20);
      },
      key: function() {
        var deferred = this.async(100);
        // initiate with delay because of IE10's async focus event from previous test
        setTimeout(deferred.rejectOnError(function() {
          handle = styleFocusSource();
          expect(handle.used('initial')).to.equal(true, 'used focus shift');

          dispatchEvent.key(document.documentElement, 'keydown', {
            key: 'Tab',
            keyCode: 9,
          });
          fixture.input.outer.focus();
          dispatchEvent.key(document.documentElement, 'keyup', {
            key: 'Tab',
            keyCode: 9,
          });

          expect(document.documentElement.getAttribute('data-focus-source')).to.equal('key', 'attribute after focus shift');
          expect(handle.current()).to.equal('key', 'current() after focus shift');
          expect(document.documentElement.classList.contains('focus-source-key')).to.equal(true, 'class after focus shift');
          expect(handle.used('key')).to.equal(true, 'used(key) after focus shift');
          expect(handle.used('pointer')).to.equal(false, 'used(pointer) after focus shift');

          // allow for observe/interaction-type disengaging async
          setTimeout(deferred.callback(function() {
            fixture.input.after.focus();
            expect(handle.current()).to.equal('script', 'current() after second focus shift');
          }), 20);
        }), 20);
      },
      pointer: function() {
        var deferred = this.async(100);
        // initiate with delay because of IE10's async focus event from previous test
        setTimeout(deferred.rejectOnError(function() {
          handle = styleFocusSource();

          dispatchEvent.mouse(document.documentElement, 'mousedown', {});
          fixture.input.outer.focus();
          dispatchEvent.mouse(document.documentElement, 'mouseup', {});

          expect(document.documentElement.getAttribute('data-focus-source')).to.equal('pointer', 'attribute after focus shift');
          expect(handle.current()).to.equal('pointer', 'current() after focus shift');
          expect(document.documentElement.classList.contains('focus-source-pointer')).to.equal(true, 'class after focus shift');
          expect(handle.used('key')).to.equal(false, 'used(key) after focus shift');
          expect(handle.used('pointer')).to.equal(true, 'used(pointer) after focus shift');

          // allow for observe/interaction-type disengaging async
          setTimeout(deferred.callback(function() {
            fixture.input.after.focus();
            expect(handle.current()).to.equal('script', 'current() after second focus shift');
          }), 20);
        }), 20);
      },
      'lock()': function() {
        handle = styleFocusSource();

        dispatchEvent.mouse(document.documentElement, 'mousedown', {});
        fixture.input.outer.focus();
        dispatchEvent.mouse(document.documentElement, 'mouseup', {});

        expect(handle.current()).to.equal('pointer', 'current() after focus shift');

        handle.lock('key');
        fixture.input.after.focus();
        expect(handle.current()).to.equal('key', 'current() after second focus shift');

        fixture.input.outer.focus();
        expect(handle.current()).to.equal('key', 'current() after third focus shift');
      },
    };
  });
});
