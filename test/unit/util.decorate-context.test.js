define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var decorateContext = require('ally/util/decorate-context');

  bdd.describe('util/decorate-context', function() {
    bdd.it('should engage and disengage the service', function() {
      var engaged = [];
      var disengaged = [];

      var decorated = decorateContext({
        engage: function(element) {
          engaged.push(element);
        },
        disengage: function(element) {
          disengaged.push(element);
        },
      });

      expect(decorated).to.be.a('function');

      var handle = decorated({
        context: ['hello', 'world'],
      });

      expect(engaged).to.deep.equal(['hello', 'world'], 'engaged elements after start');
      expect(disengaged).to.deep.equal([], 'disengaged elements after start');
      expect(handle).to.be.a('object', 'type of handle');
      expect(handle.disengage).to.be.a('function');

      handle.disengage();
      expect(disengaged).to.deep.equal('hello world'.split(' '), 'disengaged elements after stop');
    });

    bdd.it('should provide the document as default context for the service', function() {
      var engaged = [];
      var decorated = decorateContext({
        engage: function(element) {
          engaged.push(element);
        },
        disengage: function() {},
      });

      expect(decorated).to.be.a('function');

      decorated();
      expect(engaged.length).to.equal(1);
      expect(engaged[0]).to.equal(document);
    });

    bdd.it('should accept only a callback to engage the service', function() {
      var engaged = [];
      var decorated = decorateContext({
        engage: function(element) {
          engaged.push(element);
        },
      });

      expect(decorated).to.be.a('function');

      var handle = decorated({
        context: ['hello', 'world'],
      });

      expect(engaged).to.deep.equal(['hello', 'world'], 'engaged elements after start');
      expect(handle).to.be.a('object', 'type of handle');
      expect(handle.disengage).to.be.a('function');

      handle.disengage();
    });

    bdd.it('should accept only a callback to disengage the service', function() {
      var disengaged = [];
      var decorated = decorateContext({
        disengage: function(element) {
          disengaged.push(element);
        },
      });

      expect(decorated).to.be.a('function');

      var handle = decorated({
        context: ['hello', 'world'],
      });
      expect(disengaged).to.deep.equal([], 'disengaged elements after start');
      expect(handle).to.be.a('object', 'type of handle');
      expect(handle.disengage).to.be.a('function');

      handle.disengage();
      expect(disengaged).to.deep.equal(['hello', 'world'], 'disengaged elements after stop');
    });
  });
});
