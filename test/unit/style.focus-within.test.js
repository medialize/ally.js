define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/shadow-input.fixture',
  'ally/supports/css-shadow-piercing-deep-combinator',
  'ally/style/focus-within',
], function(registerSuite, expect, shadowInputFixture, cssShadowPiercingDeepCombinator, styleFocusWithin) {

  registerSuite(function() {
    var fixture;
    var handle;

    function mapNames(elements, glue) {
      return [].map.call(elements, function(element) {
        return element.id && ('#' + element.id) || element.nodeName.toLowerCase();
      }).join(glue || ', ');
    }

    function focusWithinElements(context) {
      return mapNames((context || document).querySelectorAll('.ally-focus-within'));
    }

    return {
      name: 'style/focus-within',

      beforeEach: function() {
        fixture = shadowInputFixture();
      },
      afterEach: function() {
        // make sure a failed test cannot leave listeners behind
        handle && handle.disengage();
        // blur shadowed activeElements before removal
        // @browser-issue Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1117535#c5
        document.activeElement.blur();
        fixture.remove();
        fixture = null;
      },

      lifecycle: function() {
        expect(focusWithinElements()).to.equal('', 'before engage');

        handle = styleFocusWithin();
        expect(handle.disengage).to.be.a('function');

        expect(document.activeElement).to.equal(document.body, 'foobar');
        expect(focusWithinElements()).to.equal('html, body', 'after engage');

        handle.disengage();
        handle = null;
        expect(focusWithinElements()).to.equal('', 'after disengage');
      },
      'follow focus': function() {
        expect(focusWithinElements()).to.equal('', 'before engage');

        handle = styleFocusWithin();
        expect(focusWithinElements()).to.equal('html, body', 'after engage');

        fixture.input.outer.focus();
        expect(document.activeElement).to.equal(fixture.input.outer);
        expect(focusWithinElements()).to.equal('html, body, #intern-dom-fixture, #outer-input', 'outer sequence');

        fixture.input.after.focus();
        expect(document.activeElement).to.equal(fixture.input.after);
        expect(focusWithinElements()).to.equal('html, body, #intern-dom-fixture, div, #after-input', 'after sequence');
      },
      'follow focus into Shadow DOM': function() {
        if (!cssShadowPiercingDeepCombinator) {
          this.skip('Shadow DOM "shadow-piercing descendant combinator" not supported');
        }

        var deferred = this.async(500);
        expect(focusWithinElements()).to.equal('', 'before engage');

        handle = styleFocusWithin();
        expect(focusWithinElements()).to.equal('html, body', 'after engage');

        fixture.input.first.focus();
        // @browser-issue Gecko https://bugzilla.mozilla.org/show_bug.cgi?id=1117535
        if (document.activeElement === fixture.input.first) {
          expect(document.activeElement).to.equal(fixture.input.first);
          expect(focusWithinElements())
            .to.equal('html, body, #intern-dom-fixture, #first-shadow-host', 'first sequence');
          deferred.resolve();
          return;
        }

        expect(document.activeElement).to.equal(fixture.shadow.first);
        expect(focusWithinElements())
          .to.equal('html, body, #intern-dom-fixture, #first-shadow-host', 'first sequence');
        expect(focusWithinElements(fixture.shadow.first.shadowRoot))
          .to.equal('#first-input', 'first sequence in host');

        fixture.input.second.focus();
        // shadow dom updates are performed asynchronous
        // (async introduced by event/shadow-focus)
        setTimeout(deferred.callback(function() {
          expect(focusWithinElements())
            .to.equal('html, body, #intern-dom-fixture, #first-shadow-host', 'second sequence');
          expect(focusWithinElements(fixture.shadow.first.shadowRoot))
            .to.equal('#second-shadow-host', 'second sequence in first host');
          expect(focusWithinElements(fixture.shadow.second.shadowRoot))
            .to.equal('#second-input', 'second sequence in second host');

          // make sure classes are removed upon leaving the ShadowRoot
          fixture.input.after.focus();
          expect(focusWithinElements())
            .to.equal('html, body, #intern-dom-fixture, div, #after-input', 'after sequence');
          expect(focusWithinElements(fixture.shadow.first.shadowRoot))
            .to.equal('', 'after sequence in first host');
          expect(focusWithinElements(fixture.shadow.second.shadowRoot))
            .to.equal('', 'after sequence in second host');
        }), 100);
      },
    };
  });
});
