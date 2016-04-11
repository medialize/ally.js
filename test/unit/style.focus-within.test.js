define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var shadowInputFixture = require('../helper/fixtures/shadow-input.fixture');
  var supports = require('../helper/supports');
  var styleFocusWithin = require('ally/style/focus-within');

  registerSuite(function() {
    var fixture;
    var handle;

    function focusWithinElements(context) {
      return [].slice.call((context || document).querySelectorAll('.ally-focus-within'), 0);
    }

    function _expect(message, expected, context) {
      var result = focusWithinElements(context).map(fixture.nodeToString);
      expect(result).to.deep.equal(expected, message);
    }

    return {
      name: 'style/focus-within',

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
        _expect('before engage', []);

        handle = styleFocusWithin();
        expect(handle.disengage).to.be.a('function');

        if (document.activeElement === document.documentElement) {
          // Internet Explorer 10 initially focuses <html>
          // NOTE: blur() on document does nothing, you actually need to focus() the body
          // document.activeElement.blur();
          document.body.focus();
        }

        expect(document.activeElement).to.equal(document.body, 'initial focus');
        _expect('after engage', 'html body'.split(' '));

        handle.disengage();
        handle = null;
        _expect('after disengage', []);
      },
      'follow focus': function() {
        var deferred = this.async(10000);
        _expect('before engage', []);

        if (document.activeElement === document.documentElement) {
          // Internet Explorer 10 initially focuses <html>
          // NOTE: blur() on document does nothing, you actually need to focus() the body
          // document.activeElement.blur();
          document.body.focus();
        }

        handle = styleFocusWithin();
        _expect('after engage', 'html body'.split(' '));

        fixture.input.outer.focus();
        expect(document.activeElement).to.equal(fixture.input.outer);
        _expect('outer sequence', 'html body #intern-dom-fixture #outer-input'.split(' '));

        fixture.input.after.focus();
        expect(document.activeElement).to.equal(fixture.input.after);
        _expect('after sequence', 'html body #intern-dom-fixture #after-wrapper #after-input'.split(' '));

        document.activeElement.blur();
        setTimeout(deferred.callback(function() {
          expect(document.activeElement).to.equal(document.body);
          _expect('blurred', 'html body'.split(' '));
        }), 200);
      },
      'follow focus into Shadow DOM': function() {
        if (!supports.cssShadowPiercingDeepCombinator) {
          this.skip('Shadow DOM "shadow-piercing descendant combinator" not supported');
        }

        var deferred = this.async(10000);
        _expect('before engage', []);

        handle = styleFocusWithin();
        _expect('after engage', 'html body'.split(' '));

        fixture.input.first.focus();
        // @browser-issue Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1117535
        if (document.activeElement === fixture.input.first) {
          expect(document.activeElement).to.equal(fixture.input.first);
          _expect('first sequence', 'html body #intern-dom-fixture #first-shadow-host'.split(' '));
          deferred.resolve();
          return;
        }

        expect(document.activeElement).to.equal(fixture.shadow.first);
        _expect('first sequence', 'html body #intern-dom-fixture #first-shadow-host'.split(' '));
        _expect('first sequence in host', ['#first-input'], fixture.shadow.first.shadowRoot);

        fixture.input.second.focus();
        // shadow dom updates are performed asynchronous
        // (async introduced by event/shadow-focus)
        setTimeout(deferred.callback(function() {
          _expect('second sequence', 'html body #intern-dom-fixture #first-shadow-host'.split(' '));
          _expect('second sequence in first host', ['#second-shadow-host'], fixture.shadow.first.shadowRoot);
          _expect('second sequence in second host', ['#second-input'], fixture.shadow.second.shadowRoot);

          // make sure classes are removed upon leaving the ShadowRoot
          fixture.input.after.focus();
          _expect('after sequence', 'html body #intern-dom-fixture #after-wrapper #after-input'.split(' '));
          _expect('after sequence in first host', [], fixture.shadow.first.shadowRoot);
          _expect('after sequence in second host', [], fixture.shadow.second.shadowRoot);
        }), 100);
      },
    };
  });
});
