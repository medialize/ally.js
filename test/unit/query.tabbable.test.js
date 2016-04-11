define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var focusableFixture = require('../helper/fixtures/focusable.fixture');
  var platform = require('ally/util/platform');
  var supports = require('../helper/supports');
  var queryTabbable = require('ally/query/tabbable');

  registerSuite(function() {
    var fixture;

    return {
      name: 'query/tabbable',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      document: function() {
        var deferred = this.async(10000);

        var expected = [
          !platform.is.IOS && '#tabindex-0',
          !platform.is.IOS && '#tabindex-1',
          !platform.is.IOS && '#link',
          !platform.is.IOS && '#image-map-area',
          !platform.is.IOS && platform.is.GECKO && '#object-svg',
          !platform.is.IOS && supports.svgFocusMethod && '#svg-link',
          !platform.is.IOS && '#audio-controls',
          '#input',
          '#span-contenteditable',
          !platform.is.IOS && '#img-ismap-link',
        ].filter(Boolean);

        // NOTE: Firefox decodes DataURIs asynchronously
        setTimeout(deferred.callback(function() {
          var result = queryTabbable().map(fixture.nodeToString);
          expect(result).to.deep.equal(expected);
        }), 200);
      },

      includeOnlyTabbable: function() {
        var deferred = this.async(10000);

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

        // NOTE: Firefox decodes DataURIs asynchronously
        setTimeout(deferred.callback(function() {
          var result = queryTabbable({
            includeOnlyTabbable: true,
          }).map(fixture.nodeToString);

          expect(result).to.deep.equal(expected);
        }), 200);
      },

      context: function() {
        var expected = [
          !platform.is.IOS && '#link',
        ].filter(Boolean);

        var result = queryTabbable({
          context: '.context',
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      },

      'context and self': function() {
        fixture.root.querySelector('.context').setAttribute('tabindex', '-1');

        var expected = [
          !platform.is.IOS && '#link',
        ].filter(Boolean);

        var result = queryTabbable({
          context: '.context',
          includeContext: true,
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      },
    };
  });
});
