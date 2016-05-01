define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var focusableFixture = require('../helper/fixtures/focusable.fixture');
  var platform = require('ally/util/platform');
  var isActiveElement = require('ally/is/active-element');

  bdd.describe('is/active-element', function() {
    var fixture;

    bdd.before(function() {
      fixture = focusableFixture();
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        isActiveElement(null);
      }).to.throw(TypeError, 'is/active-element requires valid options.context');
    });

    bdd.describe('in DOM', function() {
      var link;
      var input;

      bdd.before(function() {
        // make sure we start on <body> - IE does not necessarily agree
        document.activeElement && document.activeElement.blur();
        document.body.focus();

        link = document.getElementById('link');
        input = document.getElementById('input');
      });

      bdd.it('should initially identify <body>', function() {
        expect(isActiveElement(link)).to.equal(false, 'link');
        expect(isActiveElement(input)).to.equal(false, 'input');
        expect(isActiveElement(document.body)).to.equal(true, 'body');
        expect(isActiveElement(document)).to.equal(false, 'document');
      });

      bdd.it('should identify <a>', function() {
        link.focus();
        expect(isActiveElement(link)).to.equal(true, 'link');
        expect(isActiveElement(input)).to.equal(false, 'input');
        expect(isActiveElement(document.body)).to.equal(false, 'body');
        expect(isActiveElement(document)).to.equal(false, 'document');
      });

      bdd.it('should identify <input>', function() {
        input.focus();
        expect(isActiveElement(link)).to.equal(false, 'link');
        expect(isActiveElement(input)).to.equal(true, 'input');
        expect(isActiveElement(document.body)).to.equal(false, 'body');
        expect(isActiveElement(document)).to.equal(false, 'document');
      });

      bdd.it('should identify <body> after blur()', function() {
        input.blur();
        expect(isActiveElement(link)).to.equal(false, 'link');
        expect(isActiveElement(input)).to.equal(false, 'input');
        expect(isActiveElement(document.body)).to.equal(true, 'body');
        expect(isActiveElement(document)).to.equal(false, 'document');
      });
    });

    bdd.describe('in ShadowDOM', function() {
      var host;
      var input;

      bdd.before(function() {
        if (document.body.createShadowRoot === undefined) {
          this.skip('ShadowDOM is not supported');
        }

        if (platform.is.GECKO) {
          this.skip('ShadowDOM is not properly supported');
        }

        host = fixture.add([
          /*eslint-disable indent */
          '<div></div>',
          /*eslint-enable indent */
        ]).firstElementChild;
        var root = host.createShadowRoot();
        root.innerHTML = '<input>';
        input = root.firstElementChild;
      });

      bdd.it('should initially identify <body>', function() {
        expect(isActiveElement(host)).to.equal(false, 'host');
        expect(isActiveElement(input)).to.equal(false, 'input');
        expect(isActiveElement(document.body)).to.equal(true, 'body');
      });

      bdd.it('should identify ShadowHost and focused <input>', function() {
        input.focus();
        expect(isActiveElement(host)).to.equal(true, 'host');
        expect(isActiveElement(input)).to.equal(true, 'input');
        expect(isActiveElement(document.body)).to.equal(false, 'body');
      });
    });

  });
});
