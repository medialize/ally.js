define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var decorateService = require('ally/util/decorate-service');

  bdd.describe('util/decorate-service', function() {
    bdd.it('should engage and disengage the service', function() {
      var engaged = false;
      var decorated = decorateService({
        engage: function() {
          engaged = true;
        },
        disengage: function() {
          engaged = false;
        },
      });

      expect(decorated).to.be.a('function');
      var handle = decorated();
      expect(engaged).to.equal(true, 'started after engage');
      expect(handle).to.be.a('object');
      expect(handle.disengage).to.be.a('function');

      handle.disengage();
      expect(engaged).to.equal(false, 'stopped after disengage');
    });

    bdd.it('should accept only a callback to engage the service', function() {
      var engaged = false;
      var decorated = decorateService({
        engage: function() {
          engaged = true;
        },
      });

      expect(decorated).to.be.a('function');

      var handle = decorated();
      expect(engaged).to.equal(true);
      expect(handle).to.be.a('object');
      expect(handle.disengage).to.be.a('function');

      handle.disengage();
      expect(engaged).to.equal(true);
    });

    bdd.it('should accept only a callback to disengage the service', function() {
      var engaged = true;
      var decorated = decorateService({
        disengage: function() {
          engaged = false;
        },
      });

      expect(decorated).to.be.a('function');

      var handle = decorated();
      expect(engaged).to.equal(true);
      expect(handle).to.be.a('object');
      expect(handle.disengage).to.be.a('function');

      handle.disengage();
      expect(engaged).to.equal(false);
    });

    bdd.it('should keep track of the number of engage() calls', function() {
      var engaged = false;
      var decorated = decorateService({
        engage: function() {
          engaged = true;
        },
        disengage: function() {
          engaged = false;
        },
      });

      var one = decorated();
      var two = decorated();
      expect(one).to.be.equal(two);
      expect(engaged).to.equal(true);

      one.disengage();
      expect(engaged).to.equal(true);

      two.disengage();
      expect(engaged).to.equal(false);
    });

    bdd.it('should allow more disengage() than engage() calls', function() {
      var engaged = false;
      var decorated = decorateService({
        engage: function() {
          engaged = true;
        },
        disengage: function() {
          engaged = false;
        },
      });

      var handle = decorated();
      expect(engaged).to.equal(true);

      handle.disengage();
      expect(engaged).to.equal(false);

      handle.disengage();
      expect(engaged).to.equal(false);
    });

    bdd.it('should allow to force disengage()', function() {
      var engaged = false;
      var decorated = decorateService({
        engage: function() {
          engaged = true;
        },
        disengage: function() {
          engaged = false;
        },
      });

      var one = decorated();
      decorated();
      expect(engaged).to.equal(true);

      one.disengage({force: true});
      expect(engaged).to.equal(false);
    });

    bdd.it('should accept custom service handles', function() {
      var engaged = false;
      var decorated = decorateService({
        engage: function() {
          engaged = true;
          return {
            world: 123,
          };
        },
        disengage: function() {
          engaged = false;
        },
      });

      var handle = decorated();
      decorated();
      expect(engaged).to.equal(true);
      expect(handle.world).to.equal(123);

      handle.disengage({force: true});
      expect(engaged).to.equal(false);
    });
  });
});
