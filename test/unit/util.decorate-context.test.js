define([
  'intern!object',
  'intern/chai!expect',
  'ally/util/decorate-context',
], function(registerSuite, expect, decorateContext) {

  registerSuite(function() {
    return {
      name: 'util/decorate-context',

      'default context': function() {
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
      },
      lifecycle: function() {
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
        expect(engaged).to.deep.equal('hello world'.split(' '), 'engaged elements after start');
        expect(disengaged).to.deep.equal([], 'disengaged elements after start');
        expect(handle).to.be.a('object', 'type of handle');
        expect(handle.disengage).to.be.a('function');

        handle.disengage();
        expect(disengaged).to.deep.equal('hello world'.split(' '), 'disengaged elements after stop');
      },
      'engage only': function() {
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
        expect(engaged).to.deep.equal('hello world'.split(' '), 'engaged elements after start');
        expect(handle).to.be.a('object', 'type of handle');
        expect(handle.disengage).to.be.a('function');

        handle.disengage();
      },
      'disengage only': function() {
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
        expect(disengaged).to.deep.equal('hello world'.split(' '), 'disengaged elements after stop');
      },
    };
  });
});
