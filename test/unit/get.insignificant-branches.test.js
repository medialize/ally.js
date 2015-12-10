define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/get/insignificant-branches',
], function(registerSuite, expect, customFixture, getInsignificantBranches) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'get/insignificant-branches',

      beforeEach: function() {
        fixture = customFixture([
          /*eslint-disable indent */
          '<div id="uncle-1">',
            '<div id="cousin-1"></div>',
          '</div>',
          '<div id="parent">',
            '<div id="target"></div>',
            '<div id="sibling"></div>',
          '</div>',
          '<div id="uncle-2">',
            '<div id="cousin-2"></div>',
            '<div id="target-2"></div>',
          '</div>',
          /*eslint-disable indent */
        ]);
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      'invalid context': function() {
        expect(function() {
          getInsignificantBranches();
        }).to.throw(TypeError, 'get/insignificant-branches requires valid options.filter');
      },
      'single target': function() {
        var expected = '#uncle-1 #sibling #uncle-2'.split(' ');
        var target = getInsignificantBranches({
          context: fixture.root,
          filter: '#target',
        });
        var path = target.map(function(element) {
          return element.id && ('#' + element.id) || element.nodeName.toLowerCase();
        });
        expect(path).to.deep.equal(expected);
      },
      'multiple targets': function() {
        var expected = '#uncle-1 #sibling #cousin-2'.split(' ');
        var target = getInsignificantBranches({
          context: fixture.root,
          filter: '#target, #target-2',
        });
        var path = target.map(function(element) {
          return element.id && ('#' + element.id) || element.nodeName.toLowerCase();
        });
        expect(path).to.deep.equal(expected);
      },
    };
  });
});
