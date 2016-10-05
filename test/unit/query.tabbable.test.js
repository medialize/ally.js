define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var focusableFixture = require('../helper/fixtures/focusable.fixture');
  var platform = require('ally/util/platform');
  var supports = require('../helper/supports');
  var queryTabbable = require('ally/query/tabbable');

  bdd.describe('query/tabbable', function() {
    var fixture;

    bdd.beforeEach(function() {
      var deferred = this.async(10000);
      fixture = focusableFixture();
      // NOTE: Firefox decodes DataURIs asynchronously
      setTimeout(deferred.resolve, 200);
    });

    bdd.afterEach(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        queryTabbable({
          context: true,
        });
      }).to.throw(TypeError, 'unexpected input true', 'non-element context');

      expect(function() {
        queryTabbable({
          strategy: 'random',
        });
      }).to.throw(TypeError, 'query/focusable requires option.strategy to be one of ["quick", "strict", "all"]', 'bad strategy');
    });

    bdd.describe('for option includeOnlyTabbable', function() {
      bdd.it('should find elements which are either focusable or onlyTabbable', function() {
        var result = queryTabbable({
          includeOnlyTabbable: true,
        }).map(fixture.nodeToString);

        var expected = [
          !platform.is.IOS && '#tabindex-0',
          !platform.is.IOS && '#tabindex-1',
          !platform.is.IOS && '#link',
          !platform.is.IOS && '#image-map-area',
          !platform.is.IOS && platform.is.GECKO && '#object-svg',
          !platform.is.IOS && '#svg-link',
          !platform.is.IOS && '#audio-controls',
          '#input',
          '#span-contenteditable',
          !platform.is.IOS && '#img-ismap-link',
        ].filter(Boolean);

        expect(result).to.deep.equal(expected);
      });
    });

    bdd.describe('for option includeContext', function() {
      bdd.it('should find elements within context and the context element itself', function() {
        fixture.root.querySelector('.context').setAttribute('tabindex', '-1');

        var expected = [
          !platform.is.IOS && '#link',
        ];

        var result = queryTabbable({
          context: '.context',
          includeContext: true,
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      });
    });

    bdd.it('should find all focusable elements', function() {
      var result = queryTabbable().map(fixture.nodeToString);

      var expected = [
        !platform.is.IOS && '#tabindex-0',
        !platform.is.IOS && '#tabindex-1',
        !platform.is.IOS && '#link',
        !platform.is.IOS && '#image-map-area',
        !platform.is.IOS && platform.is.GECKO && '#object-svg',
        !platform.is.IOS && supports.focusingSvgElements && '#svg-link',
        !platform.is.IOS && '#audio-controls',
        '#input',
        '#span-contenteditable',
        !platform.is.IOS && '#img-ismap-link',
      ].filter(Boolean);

      expect(result).to.deep.equal(expected);
    });

  });
});
