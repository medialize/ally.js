define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var dispatchEvent = require('../helper/dispatch-event');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var whenKey = require('ally/when/key');
  var keyBinding = require('ally/when/key.binding');

  bdd.describe('when/key', function() {
    var fixture;

    var keys = {
      tab: {
        key: 'Tab',
        keyCode: 9,
      },
      enter: {
        key: 'Enter',
        keyCode: 13,
      },
      space: {
        key: 'Space',
        keyCode: 32,
      },
      escape: {
        key: 'Escape',
        keyCode: 27,
      },
    };

    function skipSyntheticEnterFailure(test) {
      var supportsSynthEvent = dispatchEvent.createKey('keydown', keys.enter);
      if (supportsSynthEvent.keyCode !== keys.enter.keyCode) {
        test.skip('Synthetic enter events not supported');
      }
    }

    function simulateKeyDown(key, element, data) {
      if (!element) {
        element = document.documentElement;
      }

      if (!data) {
        data = keys[key];
      } else if (!data.key) {
        data.key = keys[key].key;
        data.keyCode = keys[key].keyCode;
      }

      dispatchEvent.key(element, 'keydown', data);
    }

    bdd.before(function() {
      fixture = customFixture([
        /* eslint-disable indent */
        '<div id="outer">',
          '<div id="inner">',
            '<input type="text" id="target">',
          '</div>',
        '</div>',
        /*eslint-enable indent */
      ]);
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.describe('for invalid input', function() {
      var handle;

      bdd.afterEach(function() {
        handle && handle.disengage({ force: true });
      });

      bdd.it('should throw errors', function() {
        expect(function() {
          handle = whenKey();
          handle.disengage();
        }).to.throw(TypeError, 'when/key requires at least one option key');

        expect(function() {
          handle = whenKey({
            world: function() {},
          });
          handle.disengage();
        }).to.throw(TypeError, 'Unknown key "world"');

        expect(function() {
          handle = whenKey({
            enter: true,
          });
          handle.disengage();
        }).to.throw(TypeError, 'when/key requires option["enter"] to be a function');

        expect(function() {
          handle = whenKey({
            'enter+shift': function() {},
          });
          handle.disengage();
        }).to.throw(TypeError, 'Unknown modifier "enter"');

        expect(function() {
          handle = whenKey({
            'shaft+enter': function() {},
          });
          handle.disengage();
        }).to.throw(TypeError, 'Unknown modifier "shaft"');
      });
    });

    bdd.describe('key binding notation', function() {
      function trimDefinition(list) {
        list.forEach(function(item) {
          delete item.matchModifiers;
        });

        return list;
      }

      bdd.it('should parse token "enter"', function() {
        var events = keyBinding('enter');
        var expected = [
          {
            keyCodes: [13],
            modifiers: {
              altKey: false,
              ctrlKey: false,
              metaKey: false,
              shiftKey: false,
            },
          },
        ];

        expect(trimDefinition(events)).to.deep.equal(expected);
      });

      bdd.it('should parse token "shift+enter"', function() {
        var events = keyBinding('shift+enter');
        var expected = [
          {
            keyCodes: [13],
            modifiers: {
              altKey: false,
              ctrlKey: false,
              metaKey: false,
              shiftKey: true,
            },
          },
        ];

        expect(trimDefinition(events)).to.deep.equal(expected);
      });

      bdd.it('should parse token "*+enter"', function() {
        var events = keyBinding('*+enter');
        var expected = [
          {
            keyCodes: [13],
            modifiers: {
              altKey: null,
              ctrlKey: null,
              metaKey: null,
              shiftKey: null,
            },
          },
        ];

        expect(trimDefinition(events)).to.deep.equal(expected);
      });

      bdd.it('should parse token "shift+*+enter"', function() {
        var events = keyBinding('shift+*+enter');
        var expected = [
          {
            keyCodes: [13],
            modifiers: {
              altKey: null,
              ctrlKey: null,
              metaKey: null,
              shiftKey: true,
            },
          },
        ];

        expect(trimDefinition(events)).to.deep.equal(expected);
      });

      bdd.it('should parse token "!ctrl+shift+*+enter"', function() {
        var events = keyBinding('!ctrl+shift+*+enter');
        var expected = [
          {
            keyCodes: [13],
            modifiers: {
              altKey: null,
              ctrlKey: false,
              metaKey: null,
              shiftKey: true,
            },
          },
        ];

        expect(trimDefinition(events)).to.deep.equal(expected);
      });

      bdd.it('should parse token "?meta+enter"', function() {
        var events = keyBinding('?meta+enter');
        var expected = [
          {
            keyCodes: [13],
            modifiers: {
              altKey: false,
              ctrlKey: false,
              metaKey: null,
              shiftKey: false,
            },
          },
        ];

        expect(trimDefinition(events)).to.deep.equal(expected);
      });

      bdd.it('should parse token "?meta+enter shift+space"', function() {
        var events = keyBinding('?meta+enter shift+space');
        var expected = [
          {
            keyCodes: [13],
            modifiers: {
              altKey: false,
              ctrlKey: false,
              metaKey: null,
              shiftKey: false,
            },
          },
          {
            keyCodes: [32],
            modifiers: {
              altKey: false,
              ctrlKey: false,
              metaKey: false,
              shiftKey: true,
            },
          },
        ];

        expect(trimDefinition(events)).to.deep.equal(expected);
      });

      bdd.it('should parse token with aliased codes', function() {
        var events = keyBinding('0 meta');
        var expected = [
          {
            keyCodes: [48, 96],
            modifiers: {
              altKey: false,
              ctrlKey: false,
              metaKey: false,
              shiftKey: false,
            },
          },
          {
            keyCodes: [91, 92, 93, 224],
            modifiers: {
              altKey: false,
              ctrlKey: false,
              metaKey: false,
              shiftKey: false,
            },
          },
        ];

        expect(trimDefinition(events)).to.deep.equal(expected);
      });

      bdd.it('should not parse token "invalid"', function() {
        expect(function() {
          keyBinding('world');
        }).to.throw(TypeError, 'Unknown key "world"');

        expect(function() {
          keyBinding('enter+shift');
        }).to.throw(TypeError, 'Unknown modifier "enter"');

        expect(function() {
          keyBinding('shaft+enter');
        }).to.throw(TypeError, 'Unknown modifier "shaft"');
      });
    });

    bdd.describe('lifecycle', function() {
      var handle;
      var events = [];

      bdd.before(function() {
        skipSyntheticEnterFailure(this);

        handle = whenKey({
          enter: function() {
            events.push('enter');
          },
          escape: function() {
            events.push('escape');
          },
          'shift+enter': function() {
            events.push('shift enter');
          },
          'shift+ctrl+enter': function() {
            events.push('shift ctrl enter');
          },
          'ctrl+enter': function() {
            events.push('ctrl enter');
          },
        });
      });

      bdd.after(function() {
        handle && handle.disengage({ force: true });
      });

      bdd.beforeEach(function() {
        events = [];
      });

      bdd.it('should react to enter key', function() {
        simulateKeyDown('enter');
        expect(events).to.deep.equal(['enter']);
      });

      bdd.it('should react to escape key', function() {
        simulateKeyDown('escape');
        expect(events).to.deep.equal(['escape']);
      });

      bdd.it('should react to enter key again', function() {
        simulateKeyDown('enter');
        expect(events).to.deep.equal(['enter']);
      });

      bdd.it('should not react to space key', function() {
        simulateKeyDown('space');
        expect(events).to.deep.equal([]);
      });

      bdd.it('should react to enter with shift pressed', function() {
        simulateKeyDown('enter', document.documentElement, {
          shiftKey: true,
        });

        expect(events).to.deep.equal(['shift enter']);
      });

      bdd.it('should react to enter with control pressed', function() {
        simulateKeyDown('enter', document.documentElement, {
          ctrlKey: true,
        });

        expect(events).to.deep.equal(['ctrl enter']);
      });

      bdd.it('should react to enter with shift and control pressed', function() {
        simulateKeyDown('enter', document.documentElement, {
          ctrlKey: true,
          shiftKey: true,
        });

        expect(events).to.deep.equal(['shift ctrl enter']);
      });

      bdd.it('should not react to enter with shift and metaKey pressed', function() {
        simulateKeyDown('enter', document.documentElement, {
          metaKey: true,
          shiftKey: true,
        });

        expect(events).to.deep.equal([]);
      });

      bdd.it('should not react to any key after disengage', function() {
        handle.disengage();
        simulateKeyDown('enter');
        expect(events).to.deep.equal([]);
      });
    });

    bdd.describe('for disengaging handlers', function() {
      var handle;
      var events = [];

      bdd.before(function() {
        skipSyntheticEnterFailure(this);

        handle = whenKey({
          enter: function() {
            events.push('enter');
          },
          escape: function(event, disengage) {
            events.push('escape');
            disengage();
          },
        });
      });

      bdd.after(function() {
        handle && handle.disengage({ force: true });
      });

      bdd.beforeEach(function() {
        events = [];
      });

      bdd.it('should react to enter key', function() {
        simulateKeyDown('enter');
        expect(events).to.deep.equal(['enter']);
      });

      bdd.it('should react to escape key', function() {
        simulateKeyDown('escape');
        expect(events).to.deep.equal(['escape']);
      });

      bdd.it('should not react to escape key again', function() {
        simulateKeyDown('enter');
        expect(events).to.deep.equal([]);
      });

      bdd.it('should not react to escape key again', function() {
        simulateKeyDown('escape');
        expect(events).to.deep.equal([]);
      });
    });

    bdd.describe('for defaultPrevented events', function() {
      var handle;
      var events = [];

      function preventDefaultKeydown(event) {
        dispatchEvent.preventDefault(event);
      }

      bdd.before(function() {
        skipSyntheticEnterFailure(this);

        document.documentElement.addEventListener('keydown', preventDefaultKeydown, true);

        handle = whenKey({
          escape: function() {
            events.push('escape');
          },
        });
      });

      bdd.after(function() {
        handle && handle.disengage({ force: true });
        document.documentElement.removeEventListener('keydown', preventDefaultKeydown, true);
      });

      bdd.beforeEach(function() {
        events = [];
      });

      bdd.it('should not react to escape key', function() {
        simulateKeyDown('escape');
        expect(events).to.deep.equal([]);
      });
    });

    bdd.describe('for options.context', function() {
      var handle;
      var events = [];

      bdd.before(function() {
        skipSyntheticEnterFailure(this);

        handle = whenKey({
          context: '#outer',
          enter: function() {
            events.push('enter');
          },
        });
      });

      bdd.after(function() {
        handle && handle.disengage({ force: true });
      });

      bdd.beforeEach(function() {
        events = [];
      });

      bdd.it('should not react to enter key outside of context', function() {
        simulateKeyDown('enter', fixture.root);
        expect(events).to.deep.equal([]);
      });

      bdd.it('should react to enter key within context', function() {
        var target = document.getElementById('target');
        simulateKeyDown('enter', target);
        expect(events).to.deep.equal(['enter']);
      });
    });

    bdd.describe('for options.filter', function() {
      var handle;
      var events = [];

      bdd.before(function() {
        skipSyntheticEnterFailure(this);

        handle = whenKey({
          filter: '#inner',
          enter: function() {
            events.push('enter');
          },
        });
      });

      bdd.after(function() {
        handle && handle.disengage({ force: true });
      });

      bdd.beforeEach(function() {
        events = [];
      });

      bdd.it('should not react to enter key within filter', function() {
        var target = document.getElementById('target');
        simulateKeyDown('enter', target);
        expect(events).to.deep.equal([]);
      });

      bdd.it('should react to enter key outside of filter', function() {
        simulateKeyDown('enter', fixture.root);
        expect(events).to.deep.equal(['enter']);
      });
    });
  });
});
