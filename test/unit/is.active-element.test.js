define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  '../helper/supports',
  'ally/is/active-element',
], function(
  registerSuite,
  expect,
  focusableFixture,
  supports,
  isActiveElement
) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'is/active-element',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      invalid: function() {
        expect(function() {
          isActiveElement(null);
        }).to.throw(TypeError, 'is/active-element requires an argument of type Element');
      },

      simple: function() {
        var link = document.getElementById('link');
        var input = document.getElementById('input');
        expect(isActiveElement(link)).to.equal(false, 'link initial');
        expect(isActiveElement(input)).to.equal(false, 'input initial');

        link.focus();
        expect(isActiveElement(link)).to.equal(true, 'link active');
        expect(isActiveElement(input)).to.equal(false, 'input inactive');

        input.focus();
        expect(isActiveElement(link)).to.equal(false, 'link inactive');
        expect(isActiveElement(input)).to.equal(true, 'input active');
      },

      ShadowDOM: function() {
        if (document.body.createShadowRoot === undefined) {
          this.skip('Shadow DOM not supported');
        }

        var host = fixture.add([
          /*eslint-disable indent */
          '<div></div>',
          /*eslint-enable indent */
        ]).firstElementChild;
        var root = host.createShadowRoot();
        root.innerHTML = '<input>';
        var input = root.firstElementChild;

        expect(isActiveElement(host)).to.equal(false, 'host initial');
        expect(isActiveElement(input)).to.equal(false, 'input initial');

        input.focus();
        expect(isActiveElement(host)).to.equal(true, 'host active');
        expect(isActiveElement(input)).to.equal(true, 'input active');
      },
    };
  });
});
