define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  '../helper/supports',
  'ally/get/focus-redirect-target',
  'ally/supports/media/gif',
], function(registerSuite, expect, customFixture, supports, getFocusRedirectTarget, gif) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'get/focus-redirect-target',

      beforeEach: function() {
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
          /*eslint-enable indent */
        ]);
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      'invalid context': function() {
        expect(function() {
          getFocusRedirectTarget();
        }).to.throw(TypeError, 'get/focus-redirect-target requires valid options.context');
      },
      'not forwarding': function() {
        var target = getFocusRedirectTarget({
          context: fixture.root,
        });

        expect(target).to.equal(null);
      },

      'label element': function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('label'),
        });

        expect(target.id).to.equal('label-target');
      },
      'label element with nested input': function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('label-nested'),
        });

        expect(target.id).to.equal('label-nested-target');
      },
      'label element with tabindex': function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('label-tabindex'),
        });

        if (supports.canFocusLabelTabindex) {
          expect(target).to.equal(null);
        } else {
          expect(target.id).to.equal('label-tabindex-target');
        }
      },

      'legend element': function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('legend'),
        });

        if (supports.canFocusRedirectLegend === 'focusable') {
          expect(target.id).to.equal('legend-target-focusable');
        } else if (supports.canFocusRedirectLegend === 'tabbable') {
          expect(target.id).to.equal('legend-target-tabbable');
        } else {
          expect(target).to.equal(null);
        }
      },
      'legend element with textarea': function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('legend-textarea'),
        });

        if (supports.canFocusRedirectLegend) {
          expect(target.id).to.equal('legend-textarea-target');
        } else {
          expect(target).to.equal(null);
        }
      },
      'legend element with select': function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('legend-select'),
        });

        if (supports.canFocusRedirectLegend) {
          expect(target.id).to.equal('legend-select-target');
        } else {
          expect(target).to.equal(null);
        }
      },
      'legend element with button': function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('legend-button'),
        });

        if (supports.canFocusRedirectLegend) {
          expect(target.id).to.equal('legend-button-target');
        } else {
          expect(target).to.equal(null);
        }
      },
      'legend element with a': function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('legend-a'),
        });

        if (supports.canFocusRedirectLegend === 'tabbable') {
          expect(target.id).to.equal('legend-a-target');
        } else {
          expect(target).to.equal(null);
        }
      },
      'legend element without target': function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('legend-empty'),
        });

        if (supports.canFocusRedirectLegend === 'tabbable') {
          expect(target.id).to.equal('legend-empty-target');
        } else {
          expect(target).to.equal(null);
        }
      },
      'legend element not within fieldset': function() {
        fixture.add('<div><legend id="div-legend">invalid</legend><a href="#void" id="div-legend-link">link</a></div>');
        var target = getFocusRedirectTarget({
          context: document.getElementById('div-legend'),
        });

        expect(target).to.equal(null);
      },
      'legend element without tabbable elements': function() {
        fixture.remove();
        fixture = customFixture([
          '<fieldset><legend id="legend-target">legend</legend></fieldset>',
        ]);

        var target = getFocusRedirectTarget({
          context: document.getElementById('legend-target'),
        });

        expect(target).to.equal(null);
      },
      'legend element without following tabbable elements': function() {
        fixture.remove();
        fixture = customFixture([
          '<a href="#void">link</a>',
          '<fieldset><legend id="legend-target">legend</legend></fieldset>',
        ]);

        var target = getFocusRedirectTarget({
          context: document.getElementById('legend-target'),
        });

        expect(target).to.equal(null);
      },

      'img element with usemap attribute': function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('img'),
        });

        if (supports.canFocusRedirectImgUsemap) {
          expect(target.id).to.equal('img-target');
        } else {
          expect(target).to.equal(null);
        }
      },
      'img element with usemap attribute but no map': function() {
        var target = getFocusRedirectTarget({
          context: document.getElementById('img-unknown'),
        });

        expect(target).to.equal(null);
      },
    };
  });
});
