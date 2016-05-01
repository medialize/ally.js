define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var focusableFixture = require('../helper/fixtures/focusable.fixture');
  var platform = require('ally/util/platform');
  var queryFirstTabbable = require('ally/query/first-tabbable');

  bdd.describe('query/first-tabbable', function() {
    var fixture;

    bdd.beforeEach(function() {
      fixture = focusableFixture();
    });

    bdd.afterEach(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should default to using document as context', function() {
      var expected = !platform.is.IOS
        ? document.getElementById('tabindex-0')
        : document.getElementById('input');

      var result = queryFirstTabbable();
      expect(result).to.equal(expected);
    });

    bdd.it('should search within context', function() {
      var expected = !platform.is.IOS
        ? document.getElementById('link')
        : null;

      var result = queryFirstTabbable({
        context: '.context',
      });

      expect(result).to.equal(expected);
    });

    bdd.it('should return null as empty result', function() {
      var context = fixture.root.querySelector('.context');
      context.setAttribute('tabindex', '-1');
      [].forEach.call(context.children, function(element) {
        element.setAttribute('tabindex', '-1');
      });

      var expected = null;
      var result = queryFirstTabbable({
        context: '.context',
      });

      expect(result).to.equal(expected);
    });

    bdd.describe('with option.defaultToContext', function() {
      bdd.it('should return context if it contains no tabbable element', function() {
        var context = fixture.root.querySelector('.context');
        context.setAttribute('tabindex', '-1');
        [].forEach.call(context.children, function(element) {
          element.setAttribute('tabindex', '-1');
        });

        var expected = context;
        var result = queryFirstTabbable({
          context: '.context',
          defaultToContext: true,
        });

        expect(result).to.equal(expected);
      });
    });

    bdd.describe('for option.defaultToContext', function() {
      bdd.it('should return context if it contains no tabbable element', function() {
        var context = fixture.root.querySelector('.context');
        context.setAttribute('tabindex', '-1');
        [].forEach.call(context.children, function(element) {
          element.setAttribute('tabindex', '-1');
        });

        var expected = context;
        var result = queryFirstTabbable({
          context: '.context',
          defaultToContext: true,
        });

        expect(result).to.equal(expected);
      });
    });

    bdd.describe('for option.ignoreAutofocus', function() {
      bdd.it('should return [autofocus] element when flag not supplied', function() {
        var context = fixture.root.querySelector('.context');
        var input = document.createElement('input');
        // add element to DOM before setting autofocus attribute
        // to prevent the element getting focus in Trident and WebKit
        context.appendChild(input);
        input.setAttribute('autofocus', '');

        var expected = input;
        var result = queryFirstTabbable({
          context: '.context',
        });

        expect(result).to.equal(expected);
      });

      bdd.it('should not return [autofocus] element when flag is supplied', function() {
        var context = fixture.root.querySelector('.context');
        // otherwise iOS would simply show the autofocus input
        var _input = document.createElement('input');
        context.appendChild(_input);

        var input = document.createElement('input');
        // add before autofocus, to prevent the element getting
        // focus in Trident and WebKit
        context.appendChild(input);
        input.setAttribute('autofocus', '');

        var expected = !platform.is.IOS
          ? document.getElementById('link')
          : _input;

        var result = queryFirstTabbable({
          context: '.context',
          ignoreAutofocus: true,
        });

        expect(result).to.equal(expected);
      });
    });

  });
});
