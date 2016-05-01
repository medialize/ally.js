define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var supports = require('../helper/supports');
  var getFocusRedirectTarget = require('ally/get/focus-redirect-target');
  var gif = require('ally/supports/media/gif');

  bdd.describe('get/focus-redirect-target', function() {
    var fixture;

    bdd.before(function() {
      fixture = customFixture([
        /*eslint-disable indent */
        '<label id="label" for="label-target">label</label><input id="label-target">',
        '<label id="label-nested">label <input id="label-nested-target"></label>',
        '<label id="label-tabindex" for="label-tabindex-target" tabindex="-1">label</label><input id="label-tabindex-target">',

        '<fieldset>',
          '<legend id="legend">legend</legend>',
          '<input id="legend-target-focusable" tabindex="-1">',
          '<input id="legend-target-tabbable" tabindex="0">',
        '</fieldset>',
        '<fieldset>',
          '<legend id="legend-textarea">legend</legend>',
          '<textarea rows="5" cols="5" id="legend-textarea-target"></textarea>',
        '</fieldset>',
        '<fieldset>',
          '<legend id="legend-select">legend</legend>',
          '<select id="legend-select-target"><option>option</option></select>',
        '</fieldset>',
        '<fieldset>',
          '<legend id="legend-button">legend</legend>',
          '<button type="button" id="legend-button-target">button</button>',
        '</fieldset>',
        '<fieldset>',
          '<legend id="legend-a">legend</legend>',
          '<a href="#void" id="legend-a-target">link</a>',
        '</fieldset>',
        '<fieldset>',
          '<legend id="legend-empty">legend</legend>',
        '</fieldset>',
        '<a href="#void" id="legend-empty-target">link</a>',

        '<map name="image-map">',
          '<area id="img-target" href="#void" shape="rect" coords="63,19,144,45">',
        '</map>',
        '<img usemap="#image-map" src="' + gif + '" alt="" id="img">',
        '<img usemap="#image-map-unknown" src="' + gif + '" alt="" id="img-unknown">',

        '<div>',
          '<legend id="div-legend">invalid</legend>',
          '<a href="#void" id="div-legend-link">link</a>',
        '</div>',

        '<fieldset><legend id="legend-last">legend</legend></fieldset>',
        /*eslint-enable indent */
      ]);
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        getFocusRedirectTarget();
      }).to.throw(TypeError, 'get/focus-redirect-target requires valid options.context');
    });

    bdd.describe('for non-focusable elements', function() {
      bdd.it('should return null', function() {
        var target = getFocusRedirectTarget({
          context: fixture.root,
        });

        expect(target).to.equal(null);
      });
    });

    bdd.describe('for label elements', function() {
      bdd.it('should return the label\'s control element', function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('label'),
        });

        expect(target.id).to.equal('label-target');
      });

      bdd.it('should return the label\'s nested control element', function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('label-nested'),
        });

        expect(target.id).to.equal('label-nested-target');
      });

      bdd.it('should return the label if tabindex attribute is defined', function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('label-tabindex'),
        });

        if (supports.focusLabelTabindex) {
          expect(target).to.equal(null);
        } else {
          expect(target.id).to.equal('label-tabindex-target');
        }
      });
    });

    bdd.describe('for legend elements', function() {
      bdd.it('should return first focusable or tabbable element', function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('legend'),
        });

        if (supports.focusRedirectLegend === 'focusable') {
          expect(target.id).to.equal('legend-target-focusable');
        } else if (supports.focusRedirectLegend === 'tabbable') {
          expect(target.id).to.equal('legend-target-tabbable');
        } else {
          expect(target).to.equal(null);
        }
      });

      bdd.it('should return <textarea>', function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('legend-textarea'),
        });

        if (supports.focusRedirectLegend) {
          expect(target.id).to.equal('legend-textarea-target');
        } else {
          expect(target).to.equal(null);
        }
      });

      bdd.it('should return <select>', function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('legend-select'),
        });

        if (supports.focusRedirectLegend) {
          expect(target.id).to.equal('legend-select-target');
        } else {
          expect(target).to.equal(null);
        }
      });

      bdd.it('should return <button>', function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('legend-button'),
        });

        if (supports.focusRedirectLegend) {
          expect(target.id).to.equal('legend-button-target');
        } else {
          expect(target).to.equal(null);
        }
      });

      bdd.it('should return <a> if forwarding-target is first tabbable element', function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('legend-a'),
        });

        if (supports.focusRedirectLegend === 'tabbable') {
          expect(target.id).to.equal('legend-a-target');
        } else {
          expect(target).to.equal(null);
        }
      });

      bdd.it('should return first tabbable element after the <fieldset>', function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('legend-empty'),
        });

        if (supports.focusRedirectLegend === 'tabbable') {
          expect(target.id).to.equal('legend-empty-target');
        } else {
          expect(target).to.equal(null);
        }
      });

      bdd.it('should return nothing if there is no content to redirect to', function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('legend-last'),
        });

        expect(target).to.equal(null);
      });

      bdd.it('should return nothing <legend> is not a child of <fieldset>', function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('div-legend'),
        });

        expect(target).to.equal(null);
      });
    });

    bdd.describe('for img elements', function() {
      bdd.it('should return the image map\'s first <area>', function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('img'),
        });

        if (supports.focusRedirectImgUsemap) {
          expect(target.id).to.equal('img-target');
        } else {
          expect(target).to.equal(null);
        }
      });

      bdd.it('should return null if there is no image map', function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('img-unknown'),
        });

        expect(target).to.equal(null);
      });
    });

  });
});
