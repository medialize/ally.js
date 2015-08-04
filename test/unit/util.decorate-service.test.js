define([
  'intern!object',
  'intern/chai!expect',
  'ally/util/decorate-service',
], function(registerSuite, expect, decorateService) {

  registerSuite(function() {
    return {
      name: 'util/decorate-service',

      lifecycle: function() {
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
      },
      'engage only': function() {
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
      },
      'disengage only': function() {
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
      },
      'handle identity': function() {
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
      },
      'double disengage': function() {
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
      },
      'force disengage': function() {
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
      },
      'custom handle': function() {
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
      },
    };
  });
});
