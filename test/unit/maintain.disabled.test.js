define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var shadowInputFixture = require('../helper/fixtures/shadow-input.fixture');
  var supports = require('../helper/supports');
  var getParents = require('ally/get/parents');
  var elementDisabled = require('ally/element/disabled');
  var maintainDisabled = require('ally/maintain/disabled');

  bdd.describe('maintain/disabled', function() {
    var fixture;
    var handle;

    function before() {
      fixture = shadowInputFixture();
    }

    function after() {
      // make sure a failed test cannot leave listeners behind
      handle && handle.disengage({ force: true });
      fixture && fixture.remove();
      fixture = null;
    }

    function getDisabledAncestors(context) {
      return getParents({
        context: context,
      }).filter(function(element) {
        return elementDisabled(element);
      }).map(fixture.nodeToString);
    }

    bdd.describe('without arguments', function() {
      var elements;

      bdd.before(function() {
        before();

        fixture.add([
          '<div id="div-enabled" tabindex="0"></div>',
          '<div id="div-disabled" tabindex="0"></div>',
        ]);

        elements = {
          divEnabled: document.getElementById('div-enabled'),
          divDisabled: document.getElementById('div-disabled'),
          inputEnabled: fixture.input.outer,
          inputDisabled: fixture.input.after,
        };

        elements.inputDisabled.disabled = true;
        elementDisabled(elements.divDisabled, true);
      });
      bdd.after(after);

      bdd.it('should disable elements upon engage', function() {
        handle = maintainDisabled();
        expect(handle.disengage).to.be.a('function', 'disengage is a function');

        expect(elements.inputEnabled.disabled).to.equal(true, 'input is disabled');
        expect(elements.inputDisabled.disabled).to.equal(true, 'disabled input is still disabled');
        expect(elements.divEnabled.hasAttribute('data-ally-disabled')).to.equal(true, 'div is disabled');
        expect(elements.divDisabled.hasAttribute('data-ally-disabled')).to.equal(true, 'disabled div is still disabled');
      });

      bdd.it('should re-enable elements upon disengage', function() {
        handle.disengage();

        expect(elements.inputEnabled.disabled).to.equal(false, 'input is not disabled');
        expect(elements.inputDisabled.disabled).to.equal(true, 'disabled input is still disabled');
        expect(elements.divEnabled.hasAttribute('data-ally-disabled')).to.equal(false, 'div is not disabled');
        expect(elements.divDisabled.hasAttribute('data-ally-disabled')).to.equal(true, 'disabled div is still disabled');
      });
    });

    bdd.describe('with context and filter', function() {
      bdd.before(before);
      bdd.after(after);
      bdd.afterEach(function() {
        handle && handle.disengage();
      });

      bdd.it('should not disable elements outside of context', function() {
        handle = maintainDisabled({
          context: '#after-wrapper',
        });

        expect(fixture.input.outer.disabled).to.equal(false, 'not disabled outside of context');
        expect(fixture.input.after.disabled).to.equal(true, 'disabled within context');
      });

      bdd.it('should not disable elements within filter', function() {
        handle = maintainDisabled({
          filter: '#after-wrapper',
        });

        expect(fixture.input.outer.disabled).to.equal(true, 'disabled outside of filter');
        expect(fixture.input.after.disabled).to.equal(false, 'not disabled within filter');
        expect(getDisabledAncestors('#after-wrapper')).to.deep.equal([], 'ancestory of filter not disabled');
      });

      bdd.it('should not disable elements within filter and context', function() {
        var input = fixture.add('<input id="dyamic-input">').firstElementChild;

        handle = maintainDisabled({
          context: fixture.root,
          filter: '#after-wrapper, #outer-input',
        });

        expect(fixture.input.outer.disabled).to.equal(false, 'not disabled filtered element');
        expect(fixture.input.after.disabled).to.equal(false, 'not disabled within filtered element');
        expect(input.disabled).to.equal(true, 'disabled within context');
      });
    });

    bdd.describe('for concurrent instances', function() {
      var handle2;
      var container;
      var input;

      bdd.before(function() {
        before();
        container = fixture.add('<input type="text" id="dynamic-input">', 'dynamic-wrapper');
        input = container.firstElementChild;
      });
      bdd.after(function() {
        after();
        handle2 && handle2.disengage();
      });

      bdd.it('should disable only first context', function() {
        handle = maintainDisabled({
          context: '#after-wrapper',
        });

        expect(fixture.input.outer.disabled).to.equal(false, 'non disabled outside of context');
        expect(fixture.input.after.disabled).to.equal(true, 'disabled in first context');
        expect(input.disabled).to.equal(false, 'not disabled in second context');
      });

      bdd.it('should disable only second context', function() {
        handle2 = maintainDisabled({
          context: container,
        });

        expect(fixture.input.outer.disabled).to.equal(false, 'non disabled outside of context');
        expect(fixture.input.after.disabled).to.equal(true, 'still disabled in first context');
        expect(input.disabled).to.equal(true, 'disabled in second context');
      });

      bdd.it('should re-enable only first context', function() {
        handle.disengage();

        expect(fixture.input.after.disabled).to.equal(false, 'not disabled in first context');
        expect(input.disabled).to.equal(true, 'still disabled in second context');
      });
    });

    bdd.describe('for ShadowDOM', function() {
      bdd.before(function() {
        if (document.body.createShadowRoot === undefined) {
          this.skip('ShadowDOM is not supported');
        }

        if (!supports.cssShadowPiercingDeepCombinator) {
          this.skip('ShadowDOM "shadow-piercing descendant combinator" not supported');
        }

        before();
      });
      bdd.after(after);

      bdd.it('should disable shadowed elements', function() {
        handle = maintainDisabled({
          context: fixture.root,
          filter: '#after-wrapper',
        });

        expect(fixture.input.after.disabled).to.equal(false, 'not disabled within filter');
        expect(fixture.input.first.disabled).to.equal(true, 'disabled within Shadow Root');
      });

      bdd.it('should re-enable shadowed elements', function() {
        handle.disengage();

        expect(fixture.input.after.disabled).to.equal(false, 'not disabled within filter');
        expect(fixture.input.first.disabled).to.equal(false, 'not disabled within Shadow Root');
      });
    });

    bdd.describe('for DOM Mutation', function() {
      bdd.before(function() {
        if (!window.MutationObserver) {
          this.skip('MutationObserver not supported');
        }

        before();
        fixture.add('<div id="inert-div"></div>');

        handle = maintainDisabled({
          context: fixture.root,
          filter: '#after-wrapper, #outer-input',
        });
      });
      bdd.after(after);

      bdd.it('should ingest added trees', function() {
        var deferred = this.async(10000);

        var input = fixture.add('<input>').firstElementChild;
        var filteredInput = document.createElement('input');
        var wrapper = document.createElement('div');
        wrapper.appendChild(filteredInput);
        document.getElementById('after-wrapper').appendChild(wrapper);

        setTimeout(deferred.callback(function() {
          expect(input.disabled).to.equal(true, 'element disabled upon mutation');
          expect(filteredInput.disabled).to.equal(false, 'filtered element not disabled');
        }), 50);
      });

      bdd.it('should ingest added nodes', function() {
        var deferred = this.async(10000);

        var input = document.createElement('input');
        var filteredInput = document.createElement('input');
        fixture.root.appendChild(input);
        document.getElementById('after-wrapper').appendChild(filteredInput);

        // dom mutation is observed asynchronously
        setTimeout(deferred.callback(function() {
          expect(input.disabled).to.equal(true, 'element disabled upon mutation');
          expect(filteredInput.disabled).to.equal(false, 'filtered element not disabled');
        }), 50);
      });

      bdd.it('should ingest changed tabindex', function() {
        var deferred = this.async(10000);

        var element = document.getElementById('inert-div');
        element.setAttribute('tabindex', '-1');

        // dom mutation is observed asynchronously
        setTimeout(deferred.callback(function() {
          expect(element.hasAttribute('data-ally-disabled')).to.equal(true, 'element disabled upon mutation');
        }), 50);
      });

      bdd.it('should maintain disabled elements upon disengage', function() {
        var deferred = this.async(10000);

        var input = document.createElement('input');
        input.disabled = true;
        fixture.root.appendChild(input);

        setTimeout(deferred.callback(function() {
          handle.disengage();
          expect(input.disabled).to.equal(true, 'element remains disabled');
        }), 50);
      });
    });
  });
});
