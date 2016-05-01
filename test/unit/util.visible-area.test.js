define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var platform = require('ally/util/platform');
  var visibleArea = require('ally/util/visible-area');

  bdd.describe('util/visible-area', function() {
    var fixture;

    var reset = 'box-sizing: border-box; margin:0; padding:0; border:0;';

    function fixFloat(num) {
      // expected 0.2500000190734878 to equal 0.25
      return parseFloat(num.toFixed(5));
    }

    function transform(element, value) {
      element.style.transform = element.style.WebkitTransform = element.style.msTransform = value;
    }

    bdd.before(function() {
      if (platform.is.IOS) {
        // works fine when run manually in iOS simulator on BrowserStack,
        // but fails via WebDriver on BrowserStack. This modules is also
        // tested by when.visible-area.test, so just skip it.
        this.skip('Test does not run in iOS simulator');
      }
    })

    bdd.beforeEach(function() {
      fixture = customFixture([
        /*eslint-disable indent */
        '<div id="outer">',
          '<div id="inner">',
            '<input type="text" id="target">',
          '</div>',
        '</div>',
        /*eslint-enable indent */
      ]);

      fixture.outer = document.getElementById('outer');
      fixture.inner = document.getElementById('inner');
      fixture.target = document.getElementById('target');

      // move target out of view by making the parent scrollable
      fixture.outer.setAttribute('style', reset + ' width: 200px; height: 50px; overflow: hidden;');
      fixture.inner.setAttribute('style', reset + ' width: 1000px; height: 50px; padding-left: 200px;');
      fixture.target.setAttribute('style', reset + ' width: 200px; height: 50px;');
      fixture.outer.scrollLeft = 0;
    });

    bdd.afterEach(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.describe('for non-scrolled element', function() {
      bdd.it('should be visible 100%', function() {
        var dimensions = ' width: 300px; height: 50px;';

        fixture.add('<div id="natural">test</div>');
        var element = document.getElementById('natural');
        element.parentElement.setAttribute('style', reset + dimensions);
        element.setAttribute('style', reset + dimensions);
        element.scrollIntoView();

        expect(fixFloat(visibleArea(element))).to.equal(1);
      });
    });

    bdd.describe('for nested scrolled element', function() {
      bdd.it('should be visible 0%', function() {
        fixture.add([
          /*eslint-disable indent */
          '<div id="container" style="width: 20px; height: 20px; overflow: hidden">',
            '<div id="nested-container" style="width: 20px; height: 20px; margin-left: 30px; overflow: hidden;">',
              '<div id="nested-target">target</div>',
            '</div>',
          '</div>',
          /*eslint-enable indent */
        ]);

        var element = document.getElementById('nested-target');
        expect(fixFloat(visibleArea(element))).to.equal(0);
      });
    });

    bdd.describe('for scrolled element', function() {
      bdd.it('should be visible 0% when parent ist scrolled 0%', function() {
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0);
      });

      bdd.it('should be visible 25% when parent ist scrolled 25%', function() {
        fixture.outer.scrollLeft = 50;
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.25);
      });

      bdd.it('should be visible 50% when parent ist scrolled 50%', function() {
        fixture.outer.scrollLeft = 100;
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.5);
      });

      bdd.it('should be visible 75% when parent ist scrolled 75%', function() {
        fixture.outer.scrollLeft = 150;
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.75);
      });

      bdd.it('should be visible 100% when parent ist scrolled 100%', function() {
        fixture.outer.scrollLeft = 200;
        expect(fixFloat(visibleArea(fixture.target))).to.equal(1);
      });

      bdd.it('should be visible 75% when parent ist scrolled 125%', function() {
        if (document.body.getBoundingClientRect().top < 0) {
          // works fine when run manually in iOS simulator on BrowserStack,
          // but fails via WebDriver on BrowserStack. This modules is also
          // tested by when.visible-area.test, so just skip it.
          this.skip('scrolled body prevents this test from succeeding');
        }

        fixture.outer.scrollLeft = 250;
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.75);
      });
    });

    bdd.describe('for translated element', function() {
      bdd.it('should be visible 0% when element ist translated 0%', function() {
        fixture.outer.scrollLeft = 0;
        transform(fixture.inner, 'translate(0px, 0px)');
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0);
      });

      bdd.it('should be visible 25% when element ist translated 25%', function() {
        fixture.outer.scrollLeft = 0;
        transform(fixture.inner, 'translate(-50px, 0px)');
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.25);
      });

      bdd.it('should be visible 50% when element ist translated 50%', function() {
        fixture.outer.scrollLeft = 0;
        transform(fixture.inner, 'translate(-100px, 0px)');
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.5);
      });

      bdd.it('should be visible 75% when element ist translated 75%', function() {
        fixture.outer.scrollLeft = 0;
        transform(fixture.inner, 'translate(-150px, 0px)');
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.75);
      });

      bdd.it('should be visible 100% when element ist translated 100%', function() {
        fixture.outer.scrollLeft = 0;
        transform(fixture.inner, 'translate(-200px, 0px)');
        expect(fixFloat(visibleArea(fixture.target))).to.equal(1);
      });

      bdd.it('should be visible 75% when element ist translated 125%', function() {
        fixture.outer.scrollLeft = 0;
        transform(fixture.inner, 'translate(-250px, 0px)');
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.75);
      });
    });

  });
});
