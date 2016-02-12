define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  '../helper/supports',
  'ally/util/platform',
  'ally/is/active-element',
], function(
  registerSuite,
  expect,
  focusableFixture,
  supports,
  platform,
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
        // make sure we start on <body> - IE does not necessarily agree
        document.activeElement && document.activeElement.blur();
        document.body.focus();

        var link = document.getElementById('link');
        var input = document.getElementById('input');
        expect(isActiveElement(link)).to.equal(false, 'link initial');
        expect(isActiveElement(input)).to.equal(false, 'input initial');
        expect(isActiveElement(document.body)).to.equal(true, 'body initial');
        expect(isActiveElement(document)).to.equal(false, 'document initial');

        link.focus();
        expect(isActiveElement(link)).to.equal(true, 'link active');
        expect(isActiveElement(input)).to.equal(false, 'input inactive');
        expect(isActiveElement(document.body)).to.equal(false, 'body after focus');
        expect(isActiveElement(document)).to.equal(false, 'document after focus');

        input.focus();
        expect(isActiveElement(link)).to.equal(false, 'link inactive');
        expect(isActiveElement(input)).to.equal(true, 'input active');

        input.blur();
        expect(isActiveElement(link)).to.equal(false, 'link blurred');
        expect(isActiveElement(input)).to.equal(false, 'input blurred');
        expect(isActiveElement(document.body)).to.equal(true, 'body blurred');
        expect(isActiveElement(document)).to.equal(false, 'document blurred');
      },

      ShadowDOM: function() {
        if (document.body.createShadowRoot === undefined) {
          this.skip('Shadow DOM not supported');
        }

        if (platform.is.GECKO) {
          this.skip('Shadow DOM not properly supported');
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
