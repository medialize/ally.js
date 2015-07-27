define([
  'intern!object',
  'intern/chai!expect',
  'ally/util/decorate-context',
], function(registerSuite, expect, decorateContext) {
  registerSuite({
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
      expect(engaged.join(' ')).to.equal('hello world', 'engaged elements after start');
      expect(disengaged.join(' ')).to.equal('', 'disengaged elements after start');
      expect(handle).to.be.a('object', 'type of handle');
      expect(handle.disengage).to.be.a('function');

      handle.disengage();
      expect(disengaged.join(' ')).to.equal('hello world', 'disengaged elements after stop');
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
      expect(engaged.join(' ')).to.equal('hello world', 'engaged elements after start');
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
      expect(disengaged.join(' ')).to.equal('', 'disengaged elements after start');
      expect(handle).to.be.a('object', 'type of handle');
      expect(handle.disengage).to.be.a('function');

      handle.disengage();
      expect(disengaged.join(' ')).to.equal('hello world', 'disengaged elements after stop');
    },

  });
});
