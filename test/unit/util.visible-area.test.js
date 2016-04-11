define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var platform = require('ally/util/platform');
  var visibleArea = require('ally/util/visible-area');

  registerSuite(function() {
    var fixture;

    var reset = 'box-sizing: border-box; margin:0; padding:0; border:0;';

    function fixFloat(num) {
      // expected 0.2500000190734878 to equal 0.25
      return parseFloat(num.toFixed(5));
    }

    function transform(element, value) {
      element.style.transform = element.style.WebkitTransform = element.style.msTransform = value;
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
        ]);

        fixture.outer = document.getElementById('outer');
        fixture.inner = document.getElementById('inner');
        fixture.target = document.getElementById('target');

        // move target out of view by making the parent scrollable
        fixture.outer.setAttribute('style', reset + ' width: 200px; height: 50px; overflow: hidden;');
        fixture.inner.setAttribute('style', reset + ' width: 1000px; height: 50px; padding-left: 200px;');
        fixture.target.setAttribute('style', reset + ' width: 200px; height: 50px;');
        fixture.outer.scrollLeft = 0;
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      'non-scrollable': function() {
        if (platform.is.IOS) {
          // works fine when run manually in iOS simulator on BrowserStack,
          // but fails via WebDriver on BrowserStack. This modules is also
          // tested by when.visible-area.test, so just skip it.
          this.skip('Test does not run in iOS simulator');
        }

        var dimensions = ' width: 300px; height: 50px;';

        fixture.add('<div id="natural">test</div>');
        var element = document.getElementById('natural');
        element.parentElement.setAttribute('style', reset + dimensions);
        element.setAttribute('style', reset + dimensions);
        element.scrollIntoView();
        expect(fixFloat(visibleArea(element))).to.equal(1);
      },

      'nested scrollable': function() {
        if (platform.is.IOS) {
          // works fine when run manually in iOS simulator on BrowserStack,
          // but fails via WebDriver on BrowserStack. This modules is also
          // tested by when.visible-area.test, so just skip it.
          this.skip('Test does not run in iOS simulator');
        }

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
      },

      'scrolled 0%': function() {
        if (platform.is.IOS) {
          // works fine when run manually in iOS simulator on BrowserStack,
          // but fails via WebDriver on BrowserStack. This modules is also
          // tested by when.visible-area.test, so just skip it.
          this.skip('Test does not run in iOS simulator');
        }

        expect(fixFloat(visibleArea(fixture.target))).to.equal(0);
      },
      'scrolled 25%': function() {
        if (platform.is.IOS) {
          // works fine when run manually in iOS simulator on BrowserStack,
          // but fails via WebDriver on BrowserStack. This modules is also
          // tested by when.visible-area.test, so just skip it.
          this.skip('Test does not run in iOS simulator');
        }

        fixture.outer.scrollLeft = 50;
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.25);
      },
      'scrolled 50%': function() {
        if (platform.is.IOS) {
          // works fine when run manually in iOS simulator on BrowserStack,
          // but fails via WebDriver on BrowserStack. This modules is also
          // tested by when.visible-area.test, so just skip it.
          this.skip('Test does not run in iOS simulator');
        }

        fixture.outer.scrollLeft = 100;
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.5);
      },
      'scrolled 75%': function() {
        if (platform.is.IOS) {
          // works fine when run manually in iOS simulator on BrowserStack,
          // but fails via WebDriver on BrowserStack. This modules is also
          // tested by when.visible-area.test, so just skip it.
          this.skip('Test does not run in iOS simulator');
        }

        fixture.outer.scrollLeft = 150;
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.75);
      },
      'scrolled 100%': function() {
        if (platform.is.IOS) {
          // works fine when run manually in iOS simulator on BrowserStack,
          // but fails via WebDriver on BrowserStack. This modules is also
          // tested by when.visible-area.test, so just skip it.
          this.skip('Test does not run in iOS simulator');
        }

        fixture.outer.scrollLeft = 200;
        expect(fixFloat(visibleArea(fixture.target))).to.equal(1);
      },
      'scrolled 125%': function() {
        if (document.body.getBoundingClientRect().top < 0) {
          // works fine when run manually in iOS simulator on BrowserStack,
          // but fails via WebDriver on BrowserStack. This modules is also
          // tested by when.visible-area.test, so just skip it.
          this.skip('scrolled body prevents this test from succeeding');
        }

        fixture.outer.scrollLeft = 250;
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.75);
      },
      'translated 25%': function() {
        if (platform.is.IOS) {
          // works fine when run manually in iOS simulator on BrowserStack,
          // but fails via WebDriver on BrowserStack. This modules is also
          // tested by when.visible-area.test, so just skip it.
          this.skip('Test does not run in iOS simulator');
        }

        fixture.outer.scrollLeft = 0;
        transform(fixture.inner, 'translate(-50px, 0px)');
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.25);
      },
      'translated 50%': function() {
        if (platform.is.IOS) {
          // works fine when run manually in iOS simulator on BrowserStack,
          // but fails via WebDriver on BrowserStack. This modules is also
          // tested by when.visible-area.test, so just skip it.
          this.skip('Test does not run in iOS simulator');
        }

        fixture.outer.scrollLeft = 0;
        transform(fixture.inner, 'translate(-100px, 0px)');
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.5);
      },
      'translated 75%': function() {
        if (platform.is.IOS) {
          // works fine when run manually in iOS simulator on BrowserStack,
          // but fails via WebDriver on BrowserStack. This modules is also
          // tested by when.visible-area.test, so just skip it.
          this.skip('Test does not run in iOS simulator');
        }

        fixture.outer.scrollLeft = 0;
        transform(fixture.inner, 'translate(-150px, 0px)');
        expect(fixFloat(visibleArea(fixture.target))).to.equal(0.75);
      },
      'translated 100%': function() {
        if (platform.is.IOS) {
          // works fine when run manually in iOS simulator on BrowserStack,
          // but fails via WebDriver on BrowserStack. This modules is also
          // tested by when.visible-area.test, so just skip it.
          this.skip('Test does not run in iOS simulator');
        }

        fixture.outer.scrollLeft = 0;
        transform(fixture.inner, 'translate(-200px, 0px)');
        expect(fixFloat(visibleArea(fixture.target))).to.equal(1);
      },
      'translated 125%': function() {
        if (platform.is.IOS) {
          // works fine when run manually in iOS simulator on BrowserStack,
          // but fails via WebDriver on BrowserStack. This modules is also
          // tested by when.visible-area.test, so just skip it.
          this.skip('Test does not run in iOS simulator');
        }

        fixture.outer.scrollLeft = 0;
        transform(fixture.inner, 'translate(-250px, 0px)');
        expect(fixFloat(visibleArea(fixture.target))).to.equal(.75);
      },
    };
  });
});
