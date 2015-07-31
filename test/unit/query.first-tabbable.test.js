define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/focusable.fixture',
  'ally/query/first-tabbable',
], function(registerSuite, expect, focusableFixture, queryFirstTabbable) {

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
        var expected = document.getElementById('tabindex-0');
        var result = queryFirstTabbable();
        expect(result).to.equal(expected);
      },

      context: function() {
        var expected = document.getElementById('link');
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
        var input = document.createElement('input');
        // add before autofocus, to prevent the element getting
        // focus in Trident and WebKit
        context.appendChild(input);
        input.setAttribute('autofocus', '');

        var expected = document.getElementById('link');
        var result = queryFirstTabbable({
          context: '.context',
          ignoreAutofocus: true,
        });

        expect(result).to.equal(expected);
      },
    };
  });
});
