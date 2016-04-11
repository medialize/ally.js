define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var focusableFixture = require('../helper/fixtures/focusable.fixture');
  var platform = require('ally/util/platform');
  var queryFirstTabbable = require('ally/query/first-tabbable');

  registerSuite(function() {
    var fixture;

    return {
      name: 'query/first-tabbable',

      beforeEach: function() {
        fixture = focusableFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      none: function() {
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
      },

      document: function() {
        var expected = !platform.is.IOS
          ? document.getElementById('tabindex-0')
          : document.getElementById('input');

        var result = queryFirstTabbable();
        expect(result).to.equal(expected);
      },

      context: function() {
        var expected = !platform.is.IOS
          ? document.getElementById('link')
          : null;

        var result = queryFirstTabbable({
          context: '.context',
        });

        expect(result).to.equal(expected);
      },

      'default to context': function() {
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
      },
      'find [autofocus]': function() {
        var context = fixture.root.querySelector('.context');
        var input = document.createElement('input');
        // add before autofocus, to prevent the element getting
        // focus in Trident and WebKit
        context.appendChild(input);
        input.setAttribute('autofocus', '');

        var expected = input;
        var result = queryFirstTabbable({
          context: '.context',
        });

        expect(result).to.equal(expected);
      },
      'ignore [autofocus]': function() {
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
      },
    };
  });
});
