define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var toggleClass = require('ally/util/toggle-class').toggleClass;
  var removeClass = require('ally/util/toggle-class').removeClass;
  var addClass = require('ally/util/toggle-class').addClass;

  bdd.describe('util/toggle-class', function() {
    bdd.describe('toggleClass()', function() {
      bdd.it('should add class', function() {
        var div = document.createElement('div');
        toggleClass(div, 'test');
        expect(div.className).to.equal('test');
      });

      bdd.it('should remove class', function() {
        var div = document.createElement('div');
        div.className = 'test';
        toggleClass(div, 'test');
        expect(div.className).to.equal('');
      });

      bdd.describe('with force=false', function() {
        bdd.it('should remove class', function() {
          var div = document.createElement('div');
          div.className = 'test';
          toggleClass(div, 'test', false);
          expect(div.className).to.equal('');
        });
      });

      bdd.describe('with force=true', function() {
        bdd.it('should add class', function() {
          var div = document.createElement('div');
          toggleClass(div, 'test', true);
          expect(div.className).to.equal('test');
        });

        bdd.it('should not duplicate existing class', function() {
          var div = document.createElement('div');
          div.className = 'test';
          toggleClass(div, 'test', true);
          expect(div.className).to.equal('test');
        });
      });
    });

    bdd.describe('addClass()', function() {
      bdd.it('should add a class', function() {
        var div = document.createElement('div');
        div.className = 'alpha';
        addClass(div, 'bravo');
        expect(div.className).to.equal('alpha bravo');
      });
    });

    bdd.describe('removeClass()', function() {
      bdd.it('should remove a class', function() {
        var div = document.createElement('div');
        div.className = 'alpha bravo';
        removeClass(div, 'alpha');
        expect(div.className).to.equal('bravo');
      });
    });
  });
});
