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
          '<div>',
            '<span id="target">target</span>',
          '</div>',
        ].join(''));
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
        var target = getParents({
          context: '#target',
        });
        var path = target.map(function(element) {
          return element.id && ('#' + element.id) || element.nodeName.toLowerCase();
        }).join(' > ');
        expect(path).to.equal('#target > div > #intern-dom-fixture > body > html');
      },
    };
  });
});
