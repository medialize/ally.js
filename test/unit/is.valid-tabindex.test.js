define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var supports = require('../helper/supports');
  var isValidTabindex = require('ally/is/valid-tabindex');

  bdd.describe('is/valid-tabindex', function() {
    var fixture;

    bdd.before(function() {
      fixture = customFixture([
        '<div id="non-tabindex"></div>',
        '<div id="tabindex--1" tabindex="-1"></div>',
        '<div id="tabindex-0" tabindex="0"></div>',
        '<div id="tabindex-1" tabindex="1"></div>',
        '<div id="tabindex-0-space" tabindex="0 "></div>',
        '<div id="tabindex-0-char" tabindex="0char"></div>',
        '<div id="tabindex-bad" tabindex="bad"></div>',
        '<div id="tabindex-empty" tabindex=""></div>',
      ]);
    });

    bdd.after(function() {
      fixture.remove();
      fixture = null;
    });

    bdd.it('should handle invalid input', function() {
      expect(function() {
        isValidTabindex(null);
      }).to.throw(TypeError, 'is/valid-tabindex requires valid options.context');
    });

    bdd.describe('for document structure', function() {
      bdd.it('should return false for document', function() {
        expect(isValidTabindex(document)).to.equal(false);
      });

      bdd.it('should return false for <html>', function() {
        expect(isValidTabindex(document.documentElement)).to.equal(false);
      });

      bdd.it('should return false for <body>', function() {
        expect(isValidTabindex(document.body)).to.equal(false);
      });

      bdd.it('should return false for <head>', function() {
        expect(isValidTabindex(document.head)).to.equal(false);
      });
    });

    bdd.describe('for elements without tabindex attribute', function() {
      bdd.it('should return false', function() {
        var element = document.getElementById('non-tabindex');
        // .tabIndex IE: 0, rest: -1
        expect(isValidTabindex(element)).to.equal(false);
      });
    });

    bdd.describe('for elements with tabindex attribute', function() {
      bdd.it('should return true for tabindex="-1"', function() {
        var element = document.getElementById('tabindex--1');
        expect(element.tabIndex).to.equal(-1, 'tabIndex property');
        expect(isValidTabindex(element)).to.equal(true, 'isValidTabindex()');
      });

      bdd.it('should return true for tabindex="0"', function() {
        var element = document.getElementById('tabindex-0');
        expect(element.tabIndex).to.equal(0, 'tabIndex property');
        expect(isValidTabindex(element)).to.equal(true, 'isValidTabindex()');
      });

      bdd.it('should return true for tabindex="1"', function() {
        var element = document.getElementById('tabindex-1');
        expect(element.tabIndex).to.equal(1, 'tabIndex property');
        expect(isValidTabindex(element)).to.equal(true, 'isValidTabindex()');
      });

      bdd.it('should return true for tabindex="0 " (trailing space)', function() {
        var element = document.getElementById('tabindex-0-space');
        expect(element.tabIndex).to.equal(0, 'tabIndex property');
        expect(isValidTabindex(element)).to.equal(true, 'isValidTabindex()');
      });

      bdd.it('should return {browser-specific} for tabindex="0char" (trailing characters)', function() {
        var element = document.getElementById('tabindex-0-char');
        expect(element.tabIndex).to.equal(0, 'tabIndex property');
        expect(isValidTabindex(element)).to.equal(supports.focusTabindexTrailingCharacters, 'isValidTabindex()');
      });

      bdd.it('should return {browser-specific} for tabindex="bad"', function() {
        var element = document.getElementById('tabindex-bad');
        // .tabIndex IE: 0, rest: -1
        expect(isValidTabindex(element)).to.equal(supports.focusInvalidTabindex);
      });

      bdd.it('should return {browser-specific} for tabindex="" (empty)', function() {
        var element = document.getElementById('tabindex-empty');
        // .tabIndex IE: 0, rest: -1
        expect(isValidTabindex(element)).to.equal(supports.focusInvalidTabindex);
      });
    });

  });
});
