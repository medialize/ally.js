define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var maintainHidden = require('ally/maintain/hidden');

  bdd.describe('maintain/hidden', function() {
    var fixture;
    var handle;

    function before() {
      fixture = customFixture([
        /* eslint-disable indent */
        '<div id="uncle-1">',
          '<div id="cousin-1"></div>',
        '</div>',
        '<div id="family">',
          '<div id="parent">',
            '<div id="target"></div>',
            '<div id="sibling"></div>',
          '</div>',
          '<div id="uncle-2">',
            '<div id="cousin-2"></div>',
            '<div id="target-2"></div>',
          '</div>',
        '</div>',
        /*eslint-disable indent */
      ]);
    }

    function after() {
      handle && handle.disengage({ force: true });
      fixture && fixture.remove();
      fixture = null;
    }

    bdd.describe('with filter', function() {
      var uncle;
      var target;

      bdd.before(function() {
        before();

        uncle = document.getElementById('uncle-1');
        target = document.getElementById('target');
      });
      bdd.after(after);

      bdd.it('should set aria-hidden upon engaging', function() {
        handle = maintainHidden({
          filter: '#target',
        });

        expect(handle.disengage).to.be.a('function');
        expect(fixture.root.getAttribute('aria-hidden')).to.equal(null, 'ancestry not hidden');
        expect(target.getAttribute('aria-hidden')).to.equal(null, 'filter not hidden');
        expect(uncle.getAttribute('aria-hidden')).to.equal('true', 'uncle hidden');
      });

      bdd.it('should unset aria-hidden upon disengaging', function() {
        handle.disengage();

        expect(uncle.getAttribute('aria-hidden')).to.equal(null, 'uncle not hidden');
      });
    });

    bdd.describe('with context and filter', function() {
      var sibling;
      var cousin;
      var target;
      var family;

      bdd.before(function() {
        before();

        sibling = document.getElementById('sibling');
        cousin = document.getElementById('cousin-2');
        target = document.getElementById('target');
        family = document.getElementById('family');
      });
      bdd.after(after);

      bdd.it('should set aria-hidden upon engaging', function() {
        handle = maintainHidden({
          context: '#family',
          filter: '#target, #target-2',
        });

        expect(handle.disengage).to.be.a('function');
        expect(fixture.root.getAttribute('aria-hidden')).to.equal(null, 'ancestry not hidden');
        expect(family.getAttribute('aria-hidden')).to.equal(null, 'context not hidden');
        expect(target.getAttribute('aria-hidden')).to.equal(null, 'target not hidden');
        expect(sibling.getAttribute('aria-hidden')).to.equal('true', 'sibling hidden');
        expect(cousin.getAttribute('aria-hidden')).to.equal('true', 'cousin hidden');
      });

      bdd.it('should unset aria-hidden upon disengaging', function() {
        handle.disengage();

        expect(sibling.getAttribute('aria-hidden')).to.equal(null, 'sibling not hidden');
        expect(cousin.getAttribute('aria-hidden')).to.equal(null, 'cousin not hidden');
      });
    });

    bdd.describe('for concurrent instances', function() {
      var handle2;
      var container;
      var dynamicSibling;
      var sibling;
      var target;
      var family;

      bdd.before(function() {
        before();

        container = fixture.add('<div id="dynamic-sibling"></div><div id="dynamic-target"></div>', 'dynamic-wrapper');
        dynamicSibling = document.getElementById('dynamic-sibling');
        sibling = document.getElementById('sibling');
        family = document.getElementById('family');
        target = document.getElementById('target');
      });
      bdd.after(function() {
        after();
        handle2 && handle.disengage();
      });

      bdd.it('should set aria-hidden upon engaging first context', function() {
        handle = maintainHidden({
          context: '#family',
          filter: '#target',
        });

        expect(family.getAttribute('aria-hidden')).to.equal(null, 'ancestry not hidden');
        expect(target.getAttribute('aria-hidden')).to.equal(null, 'target not hidden');
        expect(sibling.getAttribute('aria-hidden')).to.equal('true', 'sibling hidden');
        expect(dynamicSibling.getAttribute('aria-hidden')).to.equal(null, 'dynamic-sibling not hidden');
      });

      bdd.it('should set aria-hidden upon engaging second context', function() {
        handle2 = maintainHidden({
          context: container,
          filter: '#dynamic-target',
        });

        expect(family.getAttribute('aria-hidden')).to.equal(null, 'ancestry not hidden');
        expect(target.getAttribute('aria-hidden')).to.equal(null, 'target not hidden');
        expect(sibling.getAttribute('aria-hidden')).to.equal('true', 'sibling hidden');
        expect(dynamicSibling.getAttribute('aria-hidden')).to.equal('true', 'dynamic-sibling hidden');
      });

      bdd.it('should unset aria-hidden upon disengaging', function() {
        handle.disengage();

        expect(sibling.getAttribute('aria-hidden')).to.equal(null, 'sibling not hidden');
        expect(dynamicSibling.getAttribute('aria-hidden')).to.equal('true', 'dynamic-sibling still hidden');
      });
    });

    bdd.describe('for DOM Mutation', function() {
      var target;
      var uncle;
      var child;
      var cousin;

      bdd.before(function() {
        if (!window.MutationObserver) {
          this.skip('MutationObserver not supported');
        }

        before();
        target = document.getElementById('target');

        handle = maintainHidden({
          context: fixture.root,
          filter: '#target',
        });
      });
      bdd.after(after);

      bdd.it('should ingest added uncles', function() {
        var deferred = this.async(10000);

        uncle = fixture.add('<div></div>');

        setTimeout(deferred.callback(function() {
          expect(uncle.getAttribute('aria-hidden')).to.equal('true', 'uncled hidden');
        }), 50);
      });

      bdd.it('should not ingest elements added to filter', function() {
        var deferred = this.async(10000);

        child = document.createElement('div');
        target.appendChild(child);

        setTimeout(deferred.callback(function() {
          expect(child.getAttribute('aria-hidden')).to.equal(null, 'child not hidden');
        }), 50);
      });

      bdd.it('should not ingest elements added to hidden elements', function() {
        var deferred = this.async(10000);

        cousin = document.createElement('div');
        uncle.appendChild(cousin);

        setTimeout(deferred.callback(function() {
          expect(cousin.getAttribute('aria-hidden')).to.equal(null, 'cousin not hidden');
        }), 50);
      });

      bdd.it('should unset aria-hidden upon disengage', function() {
        handle.disengage();

        expect(uncle.getAttribute('aria-hidden')).to.equal(null, 'uncle not hidden');
        expect(child.getAttribute('aria-hidden')).to.equal(null, 'child not hidden');
        expect(cousin.getAttribute('aria-hidden')).to.equal(null, 'cousin not hidden');
      });
    });
  });
});
