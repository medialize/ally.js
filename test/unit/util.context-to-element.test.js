define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var contextToElement = require('ally/util/context-to-element');

  bdd.describe('util/context-to-element', function() {
    bdd.describe('for array input', function() {
      bdd.it('should return the first element', function() {
        var first = document.createElement('div');
        var second = document.createElement('div');
        var element = contextToElement({
          context: [first, second],
        });

        expect(element).to.equal(first);
      });

      bdd.it('should return the only element', function() {
        var first = document.createElement('div');
        var element = contextToElement({
          context: [first],
        });

        expect(element).to.equal(first);
      });
    });

    bdd.describe('for invalid input', function() {
      bdd.it('should throw error on null', function() {
        expect(function() {
          contextToElement({
            context: null,
          });
        }).to.throw(TypeError, 'context-to-element requires valid options.context');
      });

      bdd.it('should throw error on unknown objects', function() {
        expect(function() {
          contextToElement({
            context: new Date(),
          });
        }).to.throw(TypeError, /^unexpected input/);
      });
    });

    bdd.describe('for invalid input with option.message', function() {
      bdd.it('should throw error on null', function() {
        expect(function() {
          contextToElement({
            context: null,
            label: 'gustav',
          });
        }).to.throw(TypeError, 'gustav requires valid options.context');
      });

      bdd.it('should throw error on boolean', function() {
        expect(function() {
          contextToElement({
            context: [true],
            label: 'gustav',
          });
        }).to.throw(TypeError, 'gustav requires options.context to be an Element');
      });
    });

    bdd.describe('with option.resolveDocument', function() {
      bdd.it('should convert document to document.documentElement', function() {
        var element = contextToElement({
          context: document,
          resolveDocument: true,
        });
        expect(element).to.equal(document.documentElement);
      });
    });

    bdd.describe('with option.defaultToDocument', function() {
      bdd.it('should convert null to document.documentElement', function() {
        var element = contextToElement({
          context: null,
          defaultToDocument: true,
        });
        expect(element).to.equal(document.documentElement);
      });
    });
  });
});
