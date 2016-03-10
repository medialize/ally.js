define([
  'intern!object',
  'intern/chai!expect',
  'ally/util/context-to-element',
], function(registerSuite, expect, contextToElement) {

  registerSuite(function() {
    return {
      name: 'util/context-to-element',

      multiple: function() {
        var first = document.createElement('div');
        var second = document.createElement('div');
        var element = contextToElement({
          context: [first, second],
        });
        expect(element).to.equal(first);
      },
      single: function() {
        var first = document.createElement('div');
        var element = contextToElement({
          context: [first],
        });
        expect(element).to.equal(first);
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
            label: 'gustav',
          });
        }).to.throw(TypeError, 'gustav requires valid options.context');
        expect(function() {
          contextToElement({
            context: [true],
            label: 'gustav',
          });
        }).to.throw(TypeError, 'gustav requires options.context to be an Element');
      },
      resolveDocument: function() {
        var element = contextToElement({
          context: document,
          resolveDocument: true,
        });
        expect(element).to.equal(document.documentElement);
      },
      defaultToDocument: function() {
        var element = contextToElement({
          context: null,
          defaultToDocument: true,
        });
        expect(element).to.equal(document.documentElement);
      },
    };
  });
});
