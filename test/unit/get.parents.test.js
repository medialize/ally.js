define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/get/parents',
], function(registerSuite, expect, customFixture, getParents) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'get/parents',

      beforeEach: function() {
        fixture = customFixture([
          /*eslint-disable indent */
          '<div>',
            '<span id="target">target</span>',
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
          getParents();
        }).to.throw(TypeError, 'get/parents requires valid options.context');
      },
      parents: function() {
        var expected = '#target div #intern-dom-fixture body html'.split(' ');
        var target = getParents({
          context: '#target',
        });
        var path = target.map(function(element) {
          return element.id && ('#' + element.id) || element.nodeName.toLowerCase();
        });
        expect(path).to.deep.equal(expected);
      },
    };
  });
});
