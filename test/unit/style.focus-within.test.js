define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var shadowInputFixture = require('../helper/fixtures/shadow-input.fixture');
  var delay = require('../helper/delay');
  var supports = require('../helper/supports');
  var styleFocusWithin = require('ally/style/focus-within');

  bdd.describe('style/focus-within', function() {
    var fixture;
    var handle;

    function focusWithinElements(context) {
      return [].slice.call((context || document).querySelectorAll('.ally-focus-within'), 0);
    }

    function _expect(message, expected, context) {
      var result = focusWithinElements(context).map(fixture.nodeToString);
      expect(result).to.deep.equal(expected, message);
    }

    bdd.before(function() {
      fixture = shadowInputFixture();
    });

    bdd.after(function() {
      handle && handle.disengage({ force: true });
      fixture.remove();
      fixture = null;
    });

    bdd.describe('lifecycle', function() {
      bdd.before(function() {
        if (document.activeElement === document.documentElement) {
          // Internet Explorer 10 initially focuses <html>
          // NOTE: blur() on document does nothing, you actually need to focus() the body
          // document.activeElement.blur();
          document.body.focus();
        }

        // allow IE10 and IE11 to run their async focus event
        return delay(20);
      });

      bdd.it('should engage a service', function() {
        handle = styleFocusWithin();
        expect(handle.disengage).to.be.a('function', 'handle');
      });

      bdd.it('should start in initial state', function() {
        expect(document.activeElement).to.equal(document.body, 'activeElement');
        _expect('ancestry', 'html body'.split(' '));
      });

      bdd.it('should follow focus to #outer-input', function() {
        fixture.input.outer.focus();

        expect(document.activeElement).to.equal(fixture.input.outer, 'activeElement');
        _expect('ancestry', 'html body #intern-dom-fixture #outer-input'.split(' '));
      });

      bdd.it('should follow focus to #after-input', function() {
        fixture.input.after.focus();

        expect(document.activeElement).to.equal(fixture.input.after, 'activeElement');
        _expect('ancestry', 'html body #intern-dom-fixture #after-wrapper #after-input'.split(' '));
      });

      bdd.it('should follow focus to document.body', function() {
        // blur events are handled asynchronously
        var deferred = this.async(10000);

        document.activeElement.blur();

        setTimeout(deferred.callback(function() {
          expect(document.activeElement).to.equal(document.body, 'activeElement');
          _expect('ancestry', 'html body'.split(' '));
        }), 200)
      });

      bdd.describe('for ShadowDOM', function() {
        bdd.before(function() {
          if (document.body.createShadowRoot === undefined) {
            this.skip('ShadowDOM is not supported');
          }

          if (!supports.cssShadowPiercingDeepCombinator) {
            this.skip('ShadowDOM "shadow-piercing descendant combinator" not supported');
          }
        });

        bdd.it('should follow focus into ShadowHost', function() {
          fixture.input.first.focus();

          // @browser-issue Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1117535
          if (document.activeElement === fixture.input.first) {
            expect(document.activeElement).to.equal(fixture.input.first);
            _expect('first sequence', 'html body #intern-dom-fixture #first-shadow-host'.split(' '));
            return;
          }

          expect(document.activeElement).to.equal(fixture.shadow.first, 'activeElement');
          _expect('ancestry', 'html body #intern-dom-fixture #first-shadow-host'.split(' '));
          _expect('ancestry in host', ['#first-input'], fixture.shadow.first.shadowRoot);
        });

        bdd.it('should asdasd', function() {
          // shadow dom updates are performed asynchronous
          // (async introduced by event/shadow-focus)
          var deferred = this.async(10000);

          fixture.input.second.focus();

          setTimeout(deferred.callback(function() {
            _expect('ancestry', 'html body #intern-dom-fixture #first-shadow-host'.split(' '));
            _expect('ancestry in first host', ['#second-shadow-host'], fixture.shadow.first.shadowRoot);
            _expect('ancestry in second host', ['#second-input'], fixture.shadow.second.shadowRoot);
          }), 100);
        });

        bdd.it('should clean up after leaving ShadowHost', function() {
          // make sure classes are removed upon leaving the ShadowRoot
          fixture.input.after.focus();
          _expect('ancestry', 'html body #intern-dom-fixture #after-wrapper #after-input'.split(' '));
          _expect('ancestry in first host', [], fixture.shadow.first.shadowRoot);
          _expect('ancestry in second host', [], fixture.shadow.second.shadowRoot);
        });
      });

      bdd.it('should cleanup after disengage', function() {
        handle.disengage();
        handle = null;
        _expect('after disengage', []);
      });
    });

  });
});
