define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  'ally/util/platform',
  '../helper/supports',
  'ally/query/tabbable',
], function(registerSuite, expect, focusableFixture, platform, supports, queryTabbable) {

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
          '#tabindex-0',
          '#tabindex-1',
          '#link',
          '#image-map-area',
          platform.is.GECKO && '#object-svg',
          supports.svgFocusMethod && '#svg-link',
          '#audio-controls',
          '#input',
          '#span-contenteditable',
          '#img-ismap-link',
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
          '#tabindex-0',
          '#tabindex-1',
          '#link',
          '#image-map-area',
          platform.is.GECKO && '#object-svg',
          '#svg-link',
          '#audio-controls',
          '#input',
          '#span-contenteditable',
          '#img-ismap-link',
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
        var expected = ['#link'];
        var result = queryTabbable({
          context: '.context',
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      },

      'context and self': function() {
        fixture.root.querySelector('.context').setAttribute('tabindex', '-1');

        var expected = ['#link'];
        var result = queryTabbable({
          context: '.context',
          includeContext: true,
        }).map(fixture.nodeToString);

        expect(result).to.deep.equal(expected);
      },
    };
  });
});
