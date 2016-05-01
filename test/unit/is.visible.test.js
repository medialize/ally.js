define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var supports = require('../helper/supports');
  var TestFrame = require('../helper/test-frame');
  var isVisible = require('ally/is/visible');
  var mp3 = require('ally/supports/media/mp3');

  bdd.describe('is/visible', function() {
    var fixture;
    var frame;

    bdd.before(function() {
      fixture = customFixture([
        /*eslint-disable indent */
        '<div id="visible-div">asd</div>',
        // empty content
        '<div id="empty-div"></div>',
        '<span id="empty-span"></span>',
        // HTML5 hidden attribute
        '<div hidden id="hidden-div">asd</div>',
        // CSS display property
        '<div style="display:none;" id="display-none-div">asd</div>',
        // CSS visibility property
        '<div style="visibility: hidden;" id="visibility-hidden-div">asd</div>',
        '<div style="visibility: hidden;">',
          '<div id="visibility-hidden-child-div">asd</div>',
          '<div style="visibility: visible;">',
            '<div id="visibility-hidden-visible-div">asd</div>',
          '</div>',
        '</div>',
        '<table>',
          '<tr style="visibility:collapse">',
            '<td colspan="2">',
              '<div id="visibility-collapse-div">asd</div>',
            '</td>',
          '</tr>',
          '<tr style="visibility:collapse">',
            '<td colspan="2" style="visibility:visible">',
              '<div id="visibility-collapse-visible-div">asd</div>',
            '</td>',
          '</tr>',
        '</table>',
        // no dimensions
        '<div style="width:0; height:0;" id="zero-dimension-div">asd</div>',
        // contenteditable in Firefox
        '<div contenteditable id="contenteditable-div">asd</div>',
        '<div contenteditable id="contenteditable-empty-div"></div>',
        // not rendered elements
        '<map name="disconnected-map">',
          '<area id="disconnected-area" href="#void" shape="rect" coords="63,19,144,45">',
        '</map>',
        // unknown dimension elements
        (!supports.AVOID_MEDIA && '<audio id="unknown-dimension-audio" controls src="' + mp3 + '"></audio>') || '',
        // details/summary
        '<details id="details-closed"><summary id="summary"></summary> <a href="#void" id="details-closed-link">link</a></details>',
        '<details id="details-open" open><summary id="summary"></summary> <a href="#void" id="details-open-link">link</a></details>',
        /*eslint-enable indent */
      ]);

      frame = new TestFrame([
        /*eslint-disable indent */
        '<!DOCTYPE html>',
        '<html lang="en">',
          '<head>',
            '<meta charset="utf-8" />',
            '<title>Framed Content</title>',
          '</head>',
          '<body>',
            '<p id="target">Hello World</p>',
          '</body>',
        '</html>',
        /*eslint-enable indent */
      ].join(''));

      return frame.initialize(document.body);
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;

      frame.terminate();
      frame = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        isVisible(null);
      }).to.throw(TypeError, 'is/visible requires valid options.context');

      expect(function() {
        isVisible([true]);
      }).to.throw(TypeError, 'is/visible requires options.context to be an Element');
    });

    bdd.it('should provide .rules() and .except()', function() {
      var element = document.getElementById('visible-div');
      expect(isVisible.rules({
        context: element,
      })).to.equal(true, '.rules()');

      expect(isVisible.rules.except({})(element)).to.equal(true, '.rules.except()');
    });

    bdd.describe('for regular elements', function() {
      bdd.it('should return true for <div>', function() {
        var element = document.getElementById('visible-div');
        expect(isVisible(element)).to.equal(true);
      });

      bdd.it('should return true for empty <div>', function() {
        var element = document.getElementById('empty-div');
        expect(isVisible(element)).to.equal(true);
      });

      bdd.it('should return true for empty <span>', function() {
        var element = document.getElementById('empty-span');
        expect(isVisible(element)).to.equal(true);
      });

      bdd.it('should return true for <div> without dimensions', function() {
        var element = document.getElementById('zero-dimension-div');
        expect(isVisible(element)).to.equal(true);
      });

      bdd.it('should return true for <div contenteditable>', function() {
        var element = document.getElementById('contenteditable-div');
        expect(isVisible(element)).to.equal(true);
      });

      bdd.it('should return true for empty <div contenteditable>', function() {
        var element = document.getElementById('contenteditable-empty-div');
        expect(isVisible(element)).to.equal(true);
      });
    });

    bdd.describe('for HTML5 hidden attribute', function() {
      bdd.before(function() {
        var element = document.getElementById('hidden-div');
        if (element.hidden === undefined) {
          this.skip('HTML5 hidden attribute not supported');
        }
      });

      bdd.it('should return false', function() {
        var element = document.getElementById('hidden-div');
        expect(isVisible(element)).to.equal(false);
      });
    });

    bdd.describe('for content of <details> element', function() {
      bdd.before(function() {
        var container = document.getElementById('details-closed');
        if (container.open === undefined) {
          this.skip('HTML5 details element not supported');
        }
      });

      bdd.it('should return false if <details> is collapsed', function() {
        var element = document.getElementById('details-closed-link');
        expect(isVisible(element)).to.equal(false);
      });

      bdd.it('should return true if <details> is expanded', function() {
        var element = document.getElementById('details-open-link');
        expect(isVisible(element)).to.equal(true);
      });
    });

    bdd.describe('for CSS properties', function() {
      bdd.it('should return false for display:none', function() {
        var element = document.getElementById('display-none-div');
        expect(isVisible(element)).to.equal(false);
      });

      bdd.it('should return false for visibility:hidden', function() {
        var element = document.getElementById('visibility-hidden-div');
        expect(isVisible(element)).to.equal(false);
      });

      bdd.it('should return false for child of visibility:hidden', function() {
        var element = document.getElementById('visibility-hidden-child-div');
        expect(isVisible(element)).to.equal(false);
      });

      bdd.it('should return false for child of visibility:visible nested in visibility:hidden', function() {
        var element = document.getElementById('visibility-hidden-visible-div');
        expect(isVisible(element)).to.equal(true);
      });

      bdd.it('should return false for visibility:collapse', function() {
        var element = document.getElementById('visibility-collapse-div');
        expect(isVisible(element)).to.equal(false);
      });

      bdd.it('should return true for child of visiblity:visible nested in visibility:collapse', function() {
        var element = document.getElementById('visibility-collapse-visible-div');
        expect(isVisible(element)).to.equal(true);
      });
    });

    bdd.describe('for non-rendered elements', function() {
      bdd.it('should return true for <area>', function() {
        var element = document.getElementById('disconnected-area');
        expect(isVisible(element)).to.equal(true);
      });

      bdd.it('should return true for <audio>', function() {
        var element = document.getElementById('unknown-dimension-audio');
        expect(isVisible(element)).to.equal(true);
      });
    });

    bdd.describe('for content in <iframe>', function() {
      bdd.it('should return true if the iframe is visible', function() {
        var element = frame.document.getElementById('target');
        frame.element.style.display = '';
        expect(isVisible(element)).to.equal(true);
      });

      bdd.it('should return false if the iframe is not visible', function() {
        var element = frame.document.getElementById('target');
        frame.element.style.display = 'none';
        expect(isVisible(element)).to.equal(false);
      });
    });

  });
});
