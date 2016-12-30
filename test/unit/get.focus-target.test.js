define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var getFocusTarget = require('ally/get/focus-target');

  bdd.describe('get/focus-target', function() {
    var fixture;

    bdd.before(function() {
      fixture = customFixture([
        /* eslint-disable indent */
        '<a id="self" href="#" data-label="self">',
          '<span data-label="self-wrap"><span data-label="self-inner">nested</span></span>',
        '</a>',
        '<a href="#" data-label="link">',
          '<span data-label="link-wrap"><span id="link" data-label="link-inner">nested</span></span>',
        '</a>',
        '<div tabindex="-1" data-label="nested-parent">',
          '<span tabindex="-1" id="nested" data-label="nested">nested</span>',
        '</div>',
        '<div data-label="none-outer">',
          '<span id="none" data-label="none-inner">nested</span>',
        '</div>',
        '<label id="label-nested">label <input id="label-nested-target"></label>',
        '<div id="flexbox-container" tabindex="-1" ',
          'style="display: -webkit-flexbox; display: -ms-flexbox; display: flex; width: 300px;">',
          '<div id="flexbox-child">flexed</span>',
        '</div>',
        /*eslint-enable indent */
      ]);
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        getFocusTarget();
      }).to.throw(TypeError, 'get/focus-target requires valid options.context');
    });

    bdd.it('should return focusable elements directly', function() {
      var target = getFocusTarget({
        context: '#self',
      });

      expect(target.getAttribute('data-label')).to.equal('self');
    });

    bdd.it('should return focusable parent of non-focusable elements', function() {
      var target = getFocusTarget({
        context: '#link',
      });

      expect(target.getAttribute('data-label')).to.equal('link');
    });

    bdd.it('should return nested focusable elements', function() {
      var target = getFocusTarget({
        context: '#nested',
      });

      expect(target.getAttribute('data-label')).to.equal('nested');
    });

    bdd.it('should return null for non-focusable elements', function() {
      var target = getFocusTarget({
        context: '#none',
      });

      expect(target).to.equal(null);
    });

    bdd.it('should resolve focus redirections', function() {
      var target = getFocusTarget({
        context: '#label-nested',
      });

      expect(target.id).to.equal('label-nested-target');
    });

    bdd.it('should allow ignoring flexbox-focusable and scroll-focusable elements', function() {
      var target = getFocusTarget({
        context: '#flexbox-child',
        except: {
          flexbox: true,
          scrollable: true,
        },
      });

      expect(target.id).to.equal('flexbox-container');
    });
  });
});
