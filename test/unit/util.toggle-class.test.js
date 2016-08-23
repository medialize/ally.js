define(function(require) {
  'use strict';

  var registerSuite = require('intern!object');
  var expect = require('intern/chai!expect');
  var toggleClass = require('ally/util/toggle-class').toggleClass;
  var removeClass = require('ally/util/toggle-class').removeClass;
  var addClass = require('ally/util/toggle-class').addClass;

  registerSuite(function() {
    return {
      name: 'util/toggle-class',

      'toggle (add)': function() {
        var div = document.createElement('div');
        toggleClass(div, 'test');
        expect(div.className).to.equal('test');
      },
      'toggle (twice)': function() {
        var div = document.createElement('div');
        toggleClass(div, 'test');
        toggleClass(div, 'test');
        expect(div.className).to.equal('');
      },
      'toggle - force remove': function() {
        var div = document.createElement('div');
        div.className = 'test';
        toggleClass(div, 'test', false);
        expect(div.className).to.equal('');
      },
      'toggle - force add': function() {
        var div = document.createElement('div');
        toggleClass(div, 'test', true);
        expect(div.className).to.equal('test');
      },
      'toggle - force add twice': function() {
        var div = document.createElement('div');
        toggleClass(div, 'test', true);
        toggleClass(div, 'test', true);
        expect(div.className).to.equal('test');
      },
      'add': function() {
        var div = document.createElement('div');
        addClass(div, 'test');
        expect(div.className).to.equal('test');
      },
      'remove': function() {
        var div = document.createElement('div');
        div.className = 'test';
        removeClass(div, 'test');
        expect(div.className).to.equal('');
      },
    };
  });
});
