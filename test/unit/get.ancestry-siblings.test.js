define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/get/ancestry-siblings',
], function(registerSuite, expect, customFixture, getAncestrySiblings) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'get/ancestry-siblings',

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
          '</div>',
          /*eslint-disable indent */
        ].join(''));
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      'invalid context': function() {
        expect(function() {
          getAncestrySiblings();
        }).to.throw(TypeError, 'get/ancestry-siblings requires valid options.context');
      },
      'ancestry-siblings': function() {
        var target = getAncestrySiblings({
          context: '#target',
        });
        var path = target.map(function(element) {
          return element.id && ('#' + element.id) || element.nodeName.toLowerCase();
        }).join(' ');
        expect(path).to.equal('#sibling #uncle-1 #uncle-2 head');
      },
    };
  });
});
