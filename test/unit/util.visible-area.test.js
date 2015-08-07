define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/util/visible-area',
], function(registerSuite, expect, customFixture, visibleArea) {

  registerSuite(function() {
    var fixture;

    function fixFloat(num) {
      // expected 0.2500000190734878 to equal 0.25
      return parseFloat(num.toFixed(5));
    }

    return {
      name: 'util/visible-area',

      beforeEach: function() {
        fixture = customFixture([
          /*eslint-disable indent */
          '<div id="outer">',
            '<div id="inner">',
              '<input type="text" id="target">',
            '</div>',
          '</div>',
          /*eslint-enable indent */
        ].join(''));

        fixture.outer = document.getElementById('outer');
        fixture.inner = document.getElementById('inner');
        fixture.target = document.getElementById('target');

        // move target out of view by making the parent scrollable
        var reset = 'box-sizing: border-box; margin:0; padding:0; border:0;';
        fixture.outer.setAttribute('style', reset + ' width: 200px; height: 50px; overflow: hidden;');
        fixture.inner.setAttribute('style', reset + ' width: 1000px; height: 50px; padding-left: 200px;');
        fixture.target.setAttribute('style', reset + ' width: 200px; height: 50px;');
        fixture.outer.scrollLeft = 0;
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      'scrolled 0%': function() {
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0);
      },
      'scrolled 25%': function() {
        fixture.outer.scrollLeft = 50;
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.25);
      },
      'scrolled 50%': function() {
        fixture.outer.scrollLeft = 100;
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.5);
      },
      'scrolled 75%': function() {
        fixture.outer.scrollLeft = 150;
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.75);
      },
      'scrolled 100%': function() {
        fixture.outer.scrollLeft = 200;
        expect(fixFloat(visibleArea(fixture.target))).to.equal(1);
      },
      'scrolled 125%': function() {
        fixture.outer.scrollLeft = 250;
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.75);
      },
      'translated 25%': function() {
        fixture.outer.scrollLeft = 0;
        fixture.inner.style.transform = 'translate3d(-50px, 0px, 0px)';
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.25);
      },
      'translated 50%': function() {
        fixture.outer.scrollLeft = 0;
        fixture.inner.style.transform = 'translate3d(-100px, 0px, 0px)';
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.5);
      },
      'translated 75%': function() {
        fixture.outer.scrollLeft = 0;
        fixture.inner.style.transform = 'translate3d(-150px, 0px, 0px)';
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.75);
      },
      'translated 100%': function() {
        fixture.outer.scrollLeft = 0;
        fixture.inner.style.transform = 'translate3d(-200px, 0px, 0px)';
        expect(fixFloat(visibleArea(fixture.target))).to.equal(1);
      },
      'translated 125%': function() {
        fixture.outer.scrollLeft = 0;
        fixture.inner.style.transform = 'translate3d(-250px, 0px, 0px)';
        expect(fixFloat(visibleArea(fixture.target))).to.equal(.75);
      },
    };
  });
});
