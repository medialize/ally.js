define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var shadowInputFixture = require('../helper/fixtures/shadow-input.fixture');
  var supports = require('../helper/supports');
  var getParents = require('ally/get/parents');
  var elementDisabled = require('ally/element/disabled');
  var maintainDisabled = require('ally/maintain/disabled');

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

        var disabledAncestors = getParents({
          context: '#after-wrapper',
        }).filter(function(element) {
          return elementDisabled(element);
        }).map(fixture.nodeToString);

        expect(disabledAncestors).to.deep.equal([], 'disabled ancestory');
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
      'mutation: adding tree': function() {
        if (!window.MutationObserver) {
          this.skip('MutationObserver not supported');
        }

        var deferred = this.async(10000);

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
      'mutation: adding single node': function() {
        if (!window.MutationObserver) {
          this.skip('MutationObserver not supported');
        }

        var deferred = this.async(10000);

        var input = document.createElement('input');
        input.id = 'dynamic-input';

        handle = maintainDisabled({
          context: fixture.root,
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
      'mutation: changing tabindex attribute': function() {
        if (!window.MutationObserver) {
          this.skip('MutationObserver not supported');
        }

        var deferred = this.async(10000);
        var div = document.getElementById('after-wrapper');

        handle = maintainDisabled({
          context: fixture.root,
          filter: '#outer-input',
        });

        expect(div.getAttribute('tabindex')).to.equal(null, 'div is inert');
        div.setAttribute('tabindex', '-1');

        // dom mutation is observed asynchronously
        setTimeout(deferred.callback(function() {
          expect(div.getAttribute('data-ally-disabled')).to.equal('true', 'div is disabled');
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

        handle.disengage();
        expect(fixture.input.first.disabled).to.equal(false, 'after disengage');
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
      'initially disabled elements': function() {
        fixture.input.after.disabled = true;
        var div = fixture.add('<div tabindex="0">yup</div>').firstElementChild;
        elementDisabled(div, true);

        handle = maintainDisabled({
          context: fixture.root,
        });

        expect(fixture.input.outer.disabled).to.equal(true, 'maintaining element disabled');
        expect(fixture.input.after.disabled).to.equal(true, 'input remains disabled');
        expect(elementDisabled(div)).to.equal(true, 'div remains disabled');

        handle.disengage();

        expect(fixture.input.outer.disabled).to.equal(false, 'disengaged element re-enabled');
        expect(fixture.input.after.disabled).to.equal(true, 'disengaged input remains disabled');
        expect(elementDisabled(div)).to.equal(true, 'disengaged div remains disabled');
      },
      'mutation: initially disabled elements': function() {
        if (!window.MutationObserver) {
          this.skip('MutationObserver not supported');
        }

        var deferred = this.async(10000);

        fixture.input.after.disabled = true;
        var div = fixture.add('<div tabindex="0">yup</div>').firstElementChild;
        elementDisabled(div, true);

        handle = maintainDisabled({
          context: fixture.root,
        });

        expect(fixture.input.after.disabled).to.equal(true, 'input initially disabled');
        expect(elementDisabled(div)).to.equal(true, 'div initially disabled');

        fixture.input.after.disabled = false;
        elementDisabled(div, false);

        expect(fixture.input.after.disabled).to.equal(false, 'input enabled');
        expect(elementDisabled(div)).to.equal(false, 'div enabled');

        // dom mutation is observed asynchronously
        setTimeout(deferred.callback(function() {
          expect(fixture.input.after.disabled).to.equal(true, 'input maintained disabled');
          expect(elementDisabled(div)).to.equal(true, 'div maintained disabled');
        }), 50);
      },
    };
  });
});
