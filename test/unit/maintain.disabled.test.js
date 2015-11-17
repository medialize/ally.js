define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/shadow-input.fixture',
  '../helper/supports',
  'ally/maintain/disabled',
], function(registerSuite, expect, shadowInputFixture, supports, maintainDisabled) {

  registerSuite(function() {
    var fixture;
    var handle;
    var handle2;

    return {
      name: 'maintain/disabled',

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
        expect(fixture.input.outer.disabled).to.equal(false, 'before engaged');

        handle = maintainDisabled();
        expect(handle.disengage).to.be.a('function');
        expect(fixture.input.outer.disabled).to.equal(true, 'after engaged');

        handle.disengage();
        expect(fixture.input.outer.disabled).to.equal(false, 'after disengaged');
      },
      'non-input elements': function() {
        var element = fixture.add('<div tabindex="0"></div>').firstElementChild;
        expect(fixture.input.outer.disabled).to.equal(false, 'input before engaged');
        expect(element.hasAttribute('data-ally-disabled')).to.equal(false, 'div before engaged');

        handle = maintainDisabled();
        expect(handle.disengage).to.be.a('function');
        expect(fixture.input.outer.disabled).to.equal(true, 'after engaged');
        expect(element.hasAttribute('data-ally-disabled')).to.equal(true, 'div after engaged');

        handle.disengage();
        expect(fixture.input.outer.disabled).to.equal(false, 'after disengaged');
        expect(element.hasAttribute('data-ally-disabled')).to.equal(false, 'div after disengaged');
      },
      context: function() {
        handle = maintainDisabled({
          context: '#after-wrapper',
        });
        expect(handle.disengage).to.be.a('function');
        expect(fixture.input.outer.disabled).to.equal(false, 'out of context');
        expect(fixture.input.after.disabled).to.equal(true, 'in context');
      },
      filter: function() {
        handle = maintainDisabled({
          filter: '#after-wrapper',
        });
        expect(handle.disengage).to.be.a('function');
        expect(fixture.input.outer.disabled).to.equal(true, 'out of filter');
        expect(fixture.input.after.disabled).to.equal(false, 'in filter');
      },
      'context and filter': function() {
        var input = fixture.add('<input id="dyamic-input">').firstElementChild;

        handle = maintainDisabled({
          context: fixture.root,
          filter: '#after-wrapper, #outer-input',
        });
        expect(handle.disengage).to.be.a('function');
        expect(fixture.input.outer.disabled).to.equal(false, 'in filter');
        expect(fixture.input.after.disabled).to.equal(false, 'in filter');
        expect(input.disabled).to.equal(true, 'out of filter');
      },
      'dom mutation': function() {
        if (!window.MutationObserver) {
          this.skip('MutationObserver not supported');
        }

        var deferred = this.async(1000);

        handle = maintainDisabled({
          context: fixture.root,
          filter: '#after-wrapper, #outer-input',
        });

        expect(handle.disengage).to.be.a('function');
        expect(fixture.input.outer.disabled).to.equal(false, 'in filter');

        var input = fixture.add('<input id="dyamic-input">').firstElementChild;
        // dom mutation is observed asynchronously
        setTimeout(deferred.callback(function() {
          expect(input.disabled).to.equal(true, 'added after the fact');
        }), 50);
      },
      'dom mutation (single node)': function() {
        if (!window.MutationObserver) {
          this.skip('MutationObserver not supported');
        }

        var deferred = this.async(1000);

        var input = document.createElement('input');
        input.id = 'dynamic-input';

        handle = maintainDisabled({
          context: '#intern-dom-fixture',
          filter: '#after-wrapper, #outer-input',
        });

        expect(handle.disengage).to.be.a('function');
        expect(fixture.input.outer.disabled).to.equal(false, 'in filter');
        fixture.root.appendChild(input);

        // dom mutation is observed asynchronously
        setTimeout(deferred.callback(function() {
          expect(input.disabled).to.equal(true, 'added after the fact');
        }), 50);
      },
      'Shadow DOM': function() {
        if (!supports.cssShadowPiercingDeepCombinator) {
          this.skip('Shadow DOM "shadow-piercing descendant combinator" not supported');
        }

        handle = maintainDisabled({
          context: fixture.root,
          filter: '#after-wrapper',
        });
        expect(handle.disengage).to.be.a('function');
        expect(fixture.input.after.disabled).to.equal(false, 'in filter');
        expect(fixture.input.first.disabled).to.equal(true, 'out of filter');
      },
      'concurrent instances': function() {
        var container = fixture.add('<input type="text" id="dynamic-input">', 'dynamic-wrapper');
        var input = container.firstElementChild;

        handle = maintainDisabled({
          context: '#after-wrapper',
        });
        expect(fixture.input.outer.disabled).to.equal(false);
        expect(fixture.input.after.disabled).to.equal(true, 'alpha after first handle');
        expect(input.disabled).to.equal(false, 'bravo after first handle');

        handle2 = maintainDisabled({
          context: container,
        });
        expect(fixture.input.outer.disabled).to.equal(false);
        expect(fixture.input.after.disabled).to.equal(true, 'alpha after second handle');
        expect(input.disabled).to.equal(true, 'bravo after second handle');

        handle.disengage();
        expect(fixture.input.after.disabled).to.equal(false, 'alpha after disengaging first handle');
        expect(input.disabled).to.equal(true, 'bravo after disengaging first handle');
      },
    };
  });
});
