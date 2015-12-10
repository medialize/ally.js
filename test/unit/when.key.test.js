define([
  'intern!object',
  'intern/chai!expect',
  '../helper/dispatch-event',
  '../helper/fixtures/custom.fixture',
  'ally/when/key',
  'ally/when/key.binding',
], function(registerSuite, expect, dispatchEvent, customFixture, whenKey, keyBinding) {

  registerSuite(function() {
    var fixture;
    var handle;

    var preventDefaultKeydown = function(event) {
      dispatchEvent.preventDefault(event);
    };

    return {
      name: 'when/key',

      beforeEach: function() {
        fixture = customFixture([
          /*eslint-disable indent */
          '<div id="outer">',
            '<div id="inner">',
              '<input type="text" id="target">',
            '</div>',
          '</div>',
          /*eslint-enable indent */
        ]);
      },
      afterEach: function() {
        // make sure a failed test cannot leave listeners behind
        handle && handle.disengage({ force: true });
        document.documentElement.removeEventListener('keydown', preventDefaultKeydown, true);
        fixture.remove();
        fixture = null;
      },

      'invalid invocation': function() {
        expect(function() {
          handle = whenKey();
        }).to.throw(TypeError, 'when/key requires at least one option key');

        expect(function() {
          handle = whenKey({
            world: function() {},
          });
        }).to.throw(TypeError, 'Unknown key "world"');

        expect(function() {
          handle = whenKey({
            enter: true,
          });
        }).to.throw(TypeError, 'when/key requires option["enter"] to be a function');

        expect(function() {
          handle = whenKey({
            'enter+shift': function() {},
          });
        }).to.throw(TypeError, 'Unknown modifier "enter"');

        expect(function() {
          handle = whenKey({
            'shaft+enter': function() {},
          });
        }).to.throw(TypeError, 'Unknown modifier "shaft"');
      },
      lifecycle: function() {
        var supportsSynthEvent = dispatchEvent.createKey('keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        if (supportsSynthEvent.keyCode !== 13) {
          this.skip('Synthetic enter events not supported');
        }

        var events = [];
        handle = whenKey({
          enter: function() {
            events.push('enter');
          },
          escape: function() {
            events.push('escape');
          },
        });

        expect(events).to.deep.equal([], 'before enter event');

        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        expect(events).to.deep.equal(['enter'], 'after enter event');

        handle.disengage();

        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        expect(events).to.deep.equal(['enter'], 'after second enter event');
      },
      disengaging: function() {
        var supportsSynthEvent = dispatchEvent.createKey('keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        if (supportsSynthEvent.keyCode !== 13) {
          this.skip('Synthetic enter events not supported');
        }

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

        expect(events).to.deep.equal([], 'before enter event');

        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        expect(events).to.deep.equal(['enter'], 'after enter event');

        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        expect(events).to.deep.equal(['enter'], 'after second enter event');

        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Escape',
          keyCode: 27,
        });

        expect(events).to.deep.equal(['enter'], 'after escape event');
      },
      defaultPrevented: function() {
        var supportsSynthEvent = dispatchEvent.createKey('keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        if (supportsSynthEvent.keyCode !== 13) {
          this.skip('Synthetic enter events not supported');
        }

        document.documentElement.addEventListener('keydown', preventDefaultKeydown, true);

        var events = [];
        handle = whenKey({
          enter: function() {
            events.push('enter');
          },
        });

        expect(events).to.deep.equal([], 'before events');

        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        expect(events).to.deep.equal([], 'after prevented enter event');

        document.documentElement.removeEventListener('keydown', preventDefaultKeydown, true);

        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        expect(events).to.deep.equal(['enter'], 'after unprevented enter event');
      },
      modifiers: function() {
        var supportsSynthEvent = dispatchEvent.createKey('keydown', {
          key: 'Enter',
          keyCode: 13,
          shiftKey: true,
        });

        if (supportsSynthEvent.keyCode !== 13) {
          this.skip('Synthetic enter events not supported');
        }

        var events = [];
        handle = whenKey({
          enter: function() {
            events.push('enter');
          },
          'shift+enter': function() {
            events.push('shift enter');
          },
          'shift+ctrl+enter': function() {
            events.push('shift ctrl enter');
          },
        });

        expect(events).to.deep.equal([], 'before events');

        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Space',
          keyCode: 32,
        });

        expect(events).to.deep.equal([], 'after space event');

        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        expect(events).to.deep.equal(['enter'], 'after enter event');

        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Enter',
          keyCode: 13,
          shiftKey: true,
        });

        expect(events).to.deep.equal(['enter', 'shift enter'], 'after shift+enter event');

        dispatchEvent.key(document.documentElement, 'keydown', {
          key: 'Enter',
          keyCode: 13,
          ctrlKey: true,
          shiftKey: true,
        });

        expect(events).to.deep.equal(['enter', 'shift enter', 'shift ctrl enter'], 'after shift+ctrl+enter event');
      },
      context: function() {
        var supportsSynthEvent = dispatchEvent.createKey('keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        if (supportsSynthEvent.keyCode !== 13) {
          this.skip('Synthetic enter events not supported');
        }

        var events = [];
        handle = whenKey({
          context: '#outer',
          enter: function() {
            events.push('enter');
          },
        });

        expect(events).to.deep.equal([], 'before events');

        dispatchEvent.key(fixture.root, 'keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        expect(events).to.deep.equal([], 'after outer enter event');

        dispatchEvent.key(document.getElementById('target'), 'keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        expect(events).to.deep.equal(['enter'], 'after inner enter event');
      },
      filter: function() {
        var supportsSynthEvent = dispatchEvent.createKey('keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        if (supportsSynthEvent.keyCode !== 13) {
          this.skip('Synthetic enter events not supported');
        }

        var events = [];
        handle = whenKey({
          filter: '#inner',
          enter: function() {
            events.push('enter');
          },
        });

        expect(events).to.deep.equal([], 'before events');

        dispatchEvent.key(document.getElementById('target'), 'keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        expect(events).to.deep.equal([], 'after inner enter event');

        dispatchEvent.key(fixture.root, 'keydown', {
          key: 'Enter',
          keyCode: 13,
        });

        expect(events).to.deep.equal(['enter'], 'after outer enter event');
      },

      'parse token "enter"': function() {
        var events = keyBinding('enter');
        expect(events).to.be.a('array');
        expect(events.length).to.equal(1);

        expect(events[0].keyCodes).to.deep.equal([13], 'keyCode');
        expect(events[0].modifiers.altKey).to.equal(false, 'alt modifier');
        expect(events[0].modifiers.ctrlKey).to.equal(false, 'ctrl modifier');
        expect(events[0].modifiers.metaKey).to.equal(false, 'meta modifier');
        expect(events[0].modifiers.shiftKey).to.equal(false, 'shift modifier');
      },
      'parse token "shift+enter"': function() {
        var events = keyBinding('shift+enter');
        expect(events).to.be.a('array');
        expect(events.length).to.equal(1);

        expect(events[0].keyCodes).to.deep.equal([13], 'keyCode');
        expect(events[0].modifiers.altKey).to.equal(false, 'alt modifier');
        expect(events[0].modifiers.ctrlKey).to.equal(false, 'ctrl modifier');
        expect(events[0].modifiers.metaKey).to.equal(false, 'meta modifier');
        expect(events[0].modifiers.shiftKey).to.equal(true, 'shift modifier');
      },
      'parse token "*+enter"': function() {
        var events = keyBinding('*+enter');
        expect(events).to.be.a('array');
        expect(events.length).to.equal(1);

        expect(events[0].keyCodes).to.deep.equal([13], 'keyCode');
        expect(events[0].modifiers.altKey).to.equal(null, 'alt modifier');
        expect(events[0].modifiers.ctrlKey).to.equal(null, 'ctrl modifier');
        expect(events[0].modifiers.metaKey).to.equal(null, 'meta modifier');
        expect(events[0].modifiers.shiftKey).to.equal(null, 'shift modifier');
      },
      'parse token "shift+*+enter"': function() {
        var events = keyBinding('shift+*+enter');
        expect(events).to.be.a('array');
        expect(events.length).to.equal(1);

        expect(events[0].keyCodes).to.deep.equal([13], 'keyCode');
        expect(events[0].modifiers.altKey).to.equal(null, 'alt modifier');
        expect(events[0].modifiers.ctrlKey).to.equal(null, 'ctrl modifier');
        expect(events[0].modifiers.metaKey).to.equal(null, 'meta modifier');
        expect(events[0].modifiers.shiftKey).to.equal(true, 'shift modifier');
      },
      'parse token "!ctrl+shift+*+enter"': function() {
        var events = keyBinding('!ctrl+shift+*+enter');
        expect(events).to.be.a('array');
        expect(events.length).to.equal(1);

        expect(events[0].keyCodes).to.deep.equal([13], 'keyCode');
        expect(events[0].modifiers.altKey).to.equal(null, 'alt modifier');
        expect(events[0].modifiers.ctrlKey).to.equal(false, 'ctrl modifier');
        expect(events[0].modifiers.metaKey).to.equal(null, 'meta modifier');
        expect(events[0].modifiers.shiftKey).to.equal(true, 'shift modifier');
      },
      'parse token "?meta+enter"': function() {
        var events = keyBinding('?meta+enter');
        expect(events).to.be.a('array');
        expect(events.length).to.equal(1);

        expect(events[0].keyCodes).to.deep.equal([13], 'keyCode');
        expect(events[0].modifiers.altKey).to.equal(false, 'alt modifier');
        expect(events[0].modifiers.ctrlKey).to.equal(false, 'ctrl modifier');
        expect(events[0].modifiers.metaKey).to.equal(null, 'meta modifier');
        expect(events[0].modifiers.shiftKey).to.equal(false, 'shift modifier');
      },
      'parse token "?meta+enter shift+space"': function() {
        var events = keyBinding('?meta+enter shift+space');
        expect(events).to.be.a('array');
        expect(events.length).to.equal(2);

        expect(events[0].keyCodes).to.deep.equal([13], 'keyCode');
        expect(events[0].modifiers.altKey).to.equal(false, 'alt modifier for enter');
        expect(events[0].modifiers.ctrlKey).to.equal(false, 'ctrl modifier for enter');
        expect(events[0].modifiers.metaKey).to.equal(null, 'meta modifier for enter');
        expect(events[0].modifiers.shiftKey).to.equal(false, 'shift modifier for enter');

        expect(events[1].keyCodes).to.deep.equal([32], 'keyCode');
        expect(events[1].modifiers.altKey).to.equal(false, 'alt modifier for space');
        expect(events[1].modifiers.ctrlKey).to.equal(false, 'ctrl modifier for space');
        expect(events[1].modifiers.metaKey).to.equal(false, 'meta modifier for space');
        expect(events[1].modifiers.shiftKey).to.equal(true, 'shift modifier for space');
      },
      'parse token with aliased codes': function() {
        var events = keyBinding('0 meta');
        expect(events).to.be.a('array');
        expect(events.length).to.equal(2);

        expect(events[0].keyCodes).to.deep.equal([48, 96], 'keyCode');
        expect(events[1].keyCodes).to.deep.equal([91, 92, 93, 224], 'keyCode');
      },
    };
  });
});
