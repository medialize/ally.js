define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var focusableFixture = require('../helper/fixtures/focusable.fixture');
  var supports = require('../helper/supports');
  var platform = require('ally/util/platform');
  var queryTabbable = require('ally/query/tabbable');
  var sortArea = require('ally/query/tabsequence.sort-area');

  bdd.describe('query/tabsequence.sort-area', function() {
    var fixture;

    var mutateFixtureForImageMaps = function() {
      // create known end-point
      var last = fixture.add('<input type="text" id="end-of-line">').firstElementChild;
      // move image map before #end-of-line to separate <img> from <map>
      var img = document.getElementById('img-usemap');
      last.parentNode.insertBefore(img, last);
      // add second area to test order within map
      var area = document.getElementById('image-map-area');
      var newArea = area.cloneNode(true);
      newArea.id = 'image-map-area-2';
      area.parentNode.appendChild(newArea);
    };

    bdd.beforeEach(function() {
      var deferred = this.async(10000);
      fixture = focusableFixture();
      mutateFixtureForImageMaps();
      // NOTE: Firefox decodes DataURIs asynchronously
      setTimeout(deferred.resolve, 200);
    });

    bdd.afterEach(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.describe('for properly referenced ImageMaps', function() {
      bdd.it('should sort `<area>`s to their referencing image at the beginning', function() {
        // move the img to the first spot
        var img = document.getElementById('img-usemap');
        fixture.root.insertBefore(img, fixture.root.firstChild);

        var expected = [
          !platform.is.IOS && '#image-map-area',
          !platform.is.IOS && '#image-map-area-2',
          !platform.is.IOS && '#tabindex-0',
          !platform.is.IOS && '#tabindex-1',
          !platform.is.IOS && '#link',
          !platform.is.IOS && supports.svgFocusMethod && '#svg-link',
          !platform.is.IOS && platform.is.GECKO && '#object-svg',
          !platform.is.IOS && '#audio-controls',
          '#input',
          '#span-contenteditable',
          !platform.is.IOS && '#img-ismap-link',
          '#end-of-line',
        ].filter(Boolean);

        var tabbable = queryTabbable({context: fixture.root});
        var result = sortArea(tabbable, fixture.root).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      });

      bdd.it('should sort `<area>`s to their referencing image in the middle', function() {
        // move the img to the middle
        var img = document.getElementById('img-usemap');
        var pivot = document.getElementById('img-ismap-link');
        pivot.parentNode.insertBefore(img, pivot);

        var expected = [
          !platform.is.IOS && '#tabindex-0',
          !platform.is.IOS && '#tabindex-1',
          !platform.is.IOS && '#link',
          !platform.is.IOS && supports.svgFocusMethod && '#svg-link',
          !platform.is.IOS && platform.is.GECKO && '#object-svg',
          !platform.is.IOS && '#audio-controls',
          '#input',
          '#span-contenteditable',
          !platform.is.IOS && '#image-map-area',
          !platform.is.IOS && '#image-map-area-2',
          !platform.is.IOS && '#img-ismap-link',
          '#end-of-line',
        ].filter(Boolean);

        var tabbable = queryTabbable({context: fixture.root});
        var result = sortArea(tabbable, fixture.root).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      });

      bdd.it('should sort `<area>`s to their referencing image at the end', function() {
        // move the img to the last spot
        var img = document.getElementById('img-usemap');
        img.parentNode.appendChild(img);

        var expected = [
          !platform.is.IOS && '#tabindex-0',
          !platform.is.IOS && '#tabindex-1',
          !platform.is.IOS && '#link',
          !platform.is.IOS && supports.svgFocusMethod && '#svg-link',
          !platform.is.IOS && platform.is.GECKO && '#object-svg',
          !platform.is.IOS && '#audio-controls',
          '#input',
          '#span-contenteditable',
          !platform.is.IOS && '#img-ismap-link',
          '#end-of-line',
          !platform.is.IOS && '#image-map-area',
          !platform.is.IOS && '#image-map-area-2',
        ].filter(Boolean);

        var tabbable = queryTabbable({context: fixture.root});
        var result = sortArea(tabbable, fixture.root).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      });
    });

    bdd.describe('for ImageMaps outside of context', function() {
      bdd.it('should sort `<area>`s to their referencing image\'s position', function() {
        var img = document.getElementById('img-usemap');
        img.parentNode.id = 'img-container';

        var expected = [
          !platform.is.IOS && '#image-map-area',
          !platform.is.IOS && '#image-map-area-2',
          '#end-of-line',
        ].filter(Boolean);

        var context = document.getElementById('img-container');
        var tabbable = queryTabbable({context: context});
        var result = sortArea(tabbable, fixture.root).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      });

      bdd.it('should sort `<area>`s to their referencing image\'s position if the image is the only child of the container', function() {
        // move the img to the last spot
        var img = document.getElementById('img-usemap');
        img.parentNode.id = 'img-container';
        var eol = document.getElementById('end-of-line');
        eol.parentNode.removeChild(eol);

        var expected = [
          !platform.is.IOS && '#image-map-area',
          !platform.is.IOS && '#image-map-area-2',
        ].filter(Boolean);

        var context = document.getElementById('img-container');
        var tabbable = queryTabbable({context: context});
        var result = sortArea(tabbable, fixture.root).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      });
    });

    bdd.describe('for missing ImageMaps', function() {
      bdd.it('should ignore the image positions', function() {
        // move the img to the last spot and kill map reference
        var img = document.getElementById('img-usemap');
        img.parentNode.id = 'img-container';
        img.setAttribute('usemap', '#does-not-exist');

        var expected = ['#end-of-line'];

        var context = document.getElementById('img-container');
        var tabbable = queryTabbable({context: context});
        var result = sortArea(tabbable, context).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      });
    });

    bdd.describe('for ImageMaps referenced multiple times', function() {
      bdd.it('should sort `<area>`s to their respective referencing image\'s position', function() {
        // move the img to the last spot
        var img = document.getElementById('img-usemap');
        img.parentNode.appendChild(img);
        // clone the image so we have two references to the same map
        var img2 = img.cloneNode(true);
        img2.id = 'img-usemap-2';
        fixture.root.insertBefore(img2, fixture.root.firstChild);

        var expected = [
          !platform.is.IOS && '#image-map-area',
          !platform.is.IOS && '#image-map-area-2',
          !platform.is.IOS && '#tabindex-0',
          !platform.is.IOS && '#tabindex-1',
          !platform.is.IOS && '#link',
          !platform.is.IOS && supports.svgFocusMethod && '#svg-link',
          !platform.is.IOS && platform.is.GECKO && '#object-svg',
          !platform.is.IOS && '#audio-controls',
          '#input',
          '#span-contenteditable',
          !platform.is.IOS && '#img-ismap-link',
          '#end-of-line',
          !platform.is.IOS && '#image-map-area',
          !platform.is.IOS && '#image-map-area-2',
        ].filter(Boolean);

        var tabbable = queryTabbable({context: fixture.root});
        var result = sortArea(tabbable, fixture.root).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      });
    });

  });
});
