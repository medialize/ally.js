define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/util/sort-elements-by-tabindex',
], function(registerSuite, expect, customFixture, sortElementsByTabindex) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'util/sort-elements-by-tabindex',

      beforeEach: function() {
        fixture = customFixture([
          '<input type="text" data-label="5">',
          '<div tabindex="2" data-label="2"></div>',
          '<div tabindex="-1" data-label="6"></div>',
          '<div tabindex="0" data-label="7"></div>',
          '<div tabindex="3" data-label="3"></div>',
          '<div tabindex="3" data-label="4"></div>',
          '<div tabindex="1" data-label="1"></div>',
        ].join(''));
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      sort: function() {
        var nodes = [].slice.call(fixture.root.children, 0);
        var res = sortElementsByTabindex(nodes);
        var sequence = res.map(function(element) {
          return element.getAttribute('data-label');
        }).join(',');
        expect(sequence).to.equal('1,2,3,4,5,6,7');
      },
    };
  });
});
