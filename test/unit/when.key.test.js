define([
  'intern!object',
  'intern/chai!expect',
  '../helper/dispatch-event',
  'ally/when/key',
], function(registerSuite, expect, dispatchEvent, whenKey) {

  registerSuite(function() {
    var handle;

    return {
      name: 'when/key',

      beforeEach: function() {

      },
      afterEach: function() {
        // make sure a failed test cannot leave listeners behind
        handle && handle.disengage({ force: true });
      },

      'invalid invocation': function() {
        expect(function() {
          handle = whenKey();
        }).to.throw(TypeError, 'when/key requires at least one option key');

        expect(function() {
          handle = whenKey({
            world: function() {},
          });
        }).to.throw(TypeError, 'when/key requires option keys to be numeric or references to map/keycode, but "world" is neither');

        expect(function() {
          handle = whenKey({
            enter: true,
          });
        }).to.throw(TypeError, 'when/key requires option.enter to be a function');
      },

      lifecycle: function() {
        var events = [];
        handle = whenKey({
          enter: function() {
            events.push('enter');
          },
          escape: function() {
            events.push('escape');
          },
        });

        expect(events.join(', ')).to.equal('', 'before enter event');

        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        expect(events.join(', ')).to.equal('enter', 'after enter event');

        handle.disengage();

        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        expect(events.join(', ')).to.equal('enter', 'after second enter event');
      },

      disengaging: function() {
        var events = [];
        handle = whenKey({
          enter: function(event, disengage) {
            events.push('enter');
            disengage();
          },
          escape: function() {
            events.push('escape');
          },
        });

        expect(events.join(', ')).to.equal('', 'before enter event');

        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        expect(events.join(', ')).to.equal('enter', 'after enter event');

        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        expect(events.join(', ')).to.equal('enter', 'after second enter event');

        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Escape',
          keyCode: 27,
        });

        expect(events.join(', ')).to.equal('enter', 'after escape event');
      },

    };
  });
});
