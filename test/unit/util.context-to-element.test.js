define([
  'intern!object',
  'intern/chai!expect',
  'ally/util/context-to-element',
], function(registerSuite, expect, contextToElement) {
  registerSuite({
    name: 'util/context-to-element',

    multiple: function() {
      var element = contextToElement({
        context: ['thing', 'thing2'],
      });
      expect(element).to.equal('thing');
    },
    single: function() {
      var element = contextToElement({
        context: ['thing'],
      });
      expect(element).to.equal('thing');
    },
    null: function() {
      expect(function() {
        contextToElement({
          context: null,
        });
      }).to.throw(TypeError, 'context-to-element requires valid options.context');
    },
    wrong: function() {
      expect(function() {
        contextToElement({
          context: new Date(),
        });
      }).to.throw(TypeError, /^unexpected input/);
    },
    message: function() {
      expect(function() {
        contextToElement({
          context: null,
          message: 'hello world',
        });
      }).to.throw(TypeError, 'hello world');
    },
  });
});
