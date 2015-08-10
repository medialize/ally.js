define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/is/visible',
], function(registerSuite, expect, customFixture, isVisible) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'is/visible',

      beforeEach: function() {
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
          '<audio id="unknown-dimension-audio" controls src="data:audio/mp3;base64,audio"></audio>',
          // details/summary
          '<details id="details-closed"><summary id="summary"></summary> <a href="#void" id="details-closed-link">link</a></details>',
          '<details id="details-open" open><summary id="summary"></summary> <a href="#void" id="details-open-link">link</a></details>',
          /*eslint-enable indent */
        ].join(''));
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      invalid: function() {
        expect(function() {
          isVisible(null);
        }).to.throw(TypeError, 'is/visible requires an argument of type Element');
      },
      div: function() {
        var element = document.getElementById('visible-div');
        expect(isVisible(element)).to.equal(true);
      },
      'empty div': function() {
        var element = document.getElementById('empty-div');
        expect(isVisible(element)).to.equal(true);
      },
      'empty span': function() {
        var element = document.getElementById('empty-span');
        expect(isVisible(element)).to.equal(true);
      },
      'HTML5 hidden attribute': function() {
        var element = document.getElementById('hidden-div');
        if (element.hidden === undefined) {
          this.skip('HTML5 hidden attribute not supported');
        }

        expect(isVisible(element)).to.equal(false);
      },
      'HTML5 closed details element children': function() {
        var container = document.getElementById('details-closed');
        var element = document.getElementById('details-closed-link');
        var supports = container.open === undefined;
        expect(isVisible(element)).to.equal(supports);
      },
      'HTML5 open details element children': function() {
        var container = document.getElementById('details-open');
        var element = document.getElementById('details-open-link');
        if (container.open === undefined) {
          this.skip('HTML5 details element not supported');
        }

        expect(isVisible(element)).to.equal(true);
      },
      'CSS display:none': function() {
        var element = document.getElementById('display-none-div');
        expect(isVisible(element)).to.equal(false);
      },
      'CSS visibility:hidden': function() {
        var element = document.getElementById('visibility-hidden-div');
        expect(isVisible(element)).to.equal(false);
      },
      'CSS visibility:hidden child': function() {
        var element = document.getElementById('visibility-hidden-child-div');
        expect(isVisible(element)).to.equal(false);
      },
      'CSS visibility:hidden and reverted visibility:visible': function() {
        var element = document.getElementById('visibility-hidden-visible-div');
        expect(isVisible(element)).to.equal(true);
      },
      'CSS visibility:collapse': function() {
        var element = document.getElementById('visibility-collapse-div');
        expect(isVisible(element)).to.equal(false);
      },
      'CSS visibility:collapse and reverted visibility:visible': function() {
        var element = document.getElementById('visibility-collapse-visible-div');
        expect(isVisible(element)).to.equal(true);
      },
      'zero dimension div': function() {
        var element = document.getElementById('zero-dimension-div');
        expect(isVisible(element)).to.equal(true);
      },
      'contenteditable attribute': function() {
        var element = document.getElementById('contenteditable-div');
        expect(isVisible(element)).to.equal(true);
      },
      'contenteditable attribute (but empty)': function() {
        var element = document.getElementById('contenteditable-empty-div');
        expect(isVisible(element)).to.equal(true);
      },
      'not rendered: area element': function() {
        var element = document.getElementById('disconnected-area');
        expect(isVisible(element)).to.equal(true);
      },
      'unknown dimension: audio element': function() {
        var element = document.getElementById('unknown-dimension-audio');
        expect(isVisible(element)).to.equal(true);
      },
    };
  });
});
