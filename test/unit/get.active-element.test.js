define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var focusableFixture = require('../helper/fixtures/focusable.fixture');
  var TestFrame = require('../helper/test-frame');
  var getActiveElement = require('ally/get/active-element');

  bdd.describe('get/active-element', function() {
    var fixture;
    var frame;

    bdd.before(function() {
      fixture = focusableFixture();

      frame = new TestFrame([
        /*eslint-disable indent */
        '<!DOCTYPE html>',
        '<html lang="en">',
          '<head>',
            '<meta charset="utf-8" />',
            '<title>Framed Content</title>',
          '</head>',
          '<body>',
            '<p id="target" tabindex="0">Hello World</p>',
          '</body>',
        '</html>',
        /*eslint-enable indent */
      ].join(''));

      return frame.initialize(document.body);
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
      frame.terminate();
      frame = null;
    });

    bdd.it('should return the active element of the current document', function() {
      var target = document.getElementById('tabindex-1');
      target.focus();

      var result = getActiveElement();
      expect(result).to.equal(target);
    });

    bdd.it('should return the active element of the given document', function() {
      var target = document.getElementById('tabindex-0');
      target.focus();

      var result = getActiveElement({
        context: document,
      });
      expect(result).to.equal(target);
    });

    bdd.describe('for iframe', function() {
      var target;

      bdd.before(function() {
        target = frame.document.getElementById('target');
        target.focus();
      });

      bdd.it('should return the iframe as the active element in document', function() {
        var result = getActiveElement({
          context: document,
        });

        expect(result).to.equal(frame.element);
      });

      bdd.it('should return the active element within iframe', function() {
        var result = getActiveElement({
          context: frame.document,
        });

        expect(result).to.equal(target);
      });
    });

  });
});
