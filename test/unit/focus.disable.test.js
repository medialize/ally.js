define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/shadow-input.fixture',
  'ally/supports/css-shadow-piercing-deep-combinator',
  'ally/focus/disable',
], function(registerSuite, expect, shadowInputFixture, cssShadowPiercingDeepCombinator, focusDisable) {

  registerSuite(function() {
    var fixture;
    var handle;
    var handle2;

    return {
      name: 'focus/disable',

      beforeEach: function() {
        fixture = shadowInputFixture();
      },
      afterEach: function() {
        // make sure a failed test cannot leave listeners behind
        handle && handle.disengage({ force: true });
        handle2 && handle2.disengage();
        fixture.remove();
        fixture = null;
      },

      lifecycle: function() {
        expect(fixture.input.outer.hasAttribute('data-inert-tabindex')).to.equal(false, 'before engaged');

        handle = focusDisable();
        expect(handle.disengage).to.be.a('function');
        expect(fixture.input.outer.hasAttribute('data-inert-tabindex')).to.equal(true, 'after engaged');

        handle.disengage();
        expect(fixture.input.outer.hasAttribute('data-inert-tabindex')).to.equal(false, 'after disengaged');
      },
      context: function() {
        handle = focusDisable({
          context: '#after-wrapper',
        });
        expect(handle.disengage).to.be.a('function');
        expect(fixture.input.outer.hasAttribute('data-inert-tabindex')).to.equal(false, 'out of context');
        expect(fixture.input.after.hasAttribute('data-inert-tabindex')).to.equal(true, 'in context');
      },
      filter: function() {
        handle = focusDisable({
          filter: '#after-wrapper',
        });
        expect(handle.disengage).to.be.a('function');
        expect(fixture.input.outer.hasAttribute('data-inert-tabindex')).to.equal(true, 'out of filter');
        expect(fixture.input.after.hasAttribute('data-inert-tabindex')).to.equal(false, 'in filter');
      },
      'context and filter': function() {
        var input = document.createElement('input');
        input.id = 'dynamic-input';
        fixture.root.appendChild(input);

        handle = focusDisable({
          context: '#intern-dom-fixture',
          filter: '#after-wrapper, #outer-input',
        });
        expect(handle.disengage).to.be.a('function');
        expect(fixture.input.outer.hasAttribute('data-inert-tabindex')).to.equal(false, 'in filter');
        expect(fixture.input.after.hasAttribute('data-inert-tabindex')).to.equal(false, 'in filter');
        expect(input.hasAttribute('data-inert-tabindex')).to.equal(true, 'out of filter');
      },
      'dom mutation': function() {
        if (!window.MutationObserver) {
          this.skip('MutationObserver not supported');
        }

        var deferred = this.async(500);

        var input = document.createElement('input');
        input.id = 'dynamic-input';

        handle = focusDisable({
          context: '#intern-dom-fixture',
          filter: '#after-wrapper, #outer-input',
        });

        expect(handle.disengage).to.be.a('function');
        expect(fixture.input.outer.hasAttribute('data-inert-tabindex')).to.equal(false, 'in filter');
        fixture.root.appendChild(input);

        // dom mutation is observed asynchronously
        setTimeout(deferred.callback(function() {
          expect(input.hasAttribute('data-inert-tabindex')).to.equal(true, 'added after the fact');
        }), 50);
      },
      'Shadow DOM': function() {
        if (!cssShadowPiercingDeepCombinator) {
          this.skip('Shadow DOM "shadow-piercing descendant combinator" not supported');
        }

        handle = focusDisable({
          context: '#intern-dom-fixture',
          filter: '#after-wrapper',
        });
        expect(handle.disengage).to.be.a('function');
        expect(fixture.input.after.hasAttribute('data-inert-tabindex')).to.equal(false, 'in filter');
        expect(fixture.input.first.hasAttribute('data-inert-tabindex')).to.equal(true, 'out of filter');
      },
      'concurrent instances': function() {
        var container = document.createElement('div');
        container.id = 'dynamic-wrapper';
        container.innerHTML = '<input type="text" id="dynamic-input">';
        fixture.root.appendChild(container);
        var input = document.getElementById('dynamic-input');

        handle = focusDisable({
          context: '#after-wrapper',
        });
        expect(fixture.input.outer.hasAttribute('data-inert-tabindex')).to.equal(false);
        expect(fixture.input.after.hasAttribute('data-inert-tabindex')).to.equal(true, 'alpha after first handle');
        expect(input.hasAttribute('data-inert-tabindex')).to.equal(false, 'bravo after first handle');

        handle2 = focusDisable({
          context: container,
        });
        expect(fixture.input.outer.hasAttribute('data-inert-tabindex')).to.equal(false);
        expect(fixture.input.after.hasAttribute('data-inert-tabindex')).to.equal(true, 'alpha after second handle');
        expect(input.hasAttribute('data-inert-tabindex')).to.equal(true, 'bravo after second handle');

        handle.disengage();
        expect(fixture.input.after.hasAttribute('data-inert-tabindex')).to.equal(false, 'alpha after disengaging first handle');
        expect(input.hasAttribute('data-inert-tabindex')).to.equal(true, 'bravo after disengaging first handle');
      },
    };
  });
});
