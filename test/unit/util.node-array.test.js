define([
  'intern!object',
  'intern/chai!expect',
  'ally/util/node-array',
], function(registerSuite, expect, nodeArray) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'util/node-array',

      beforeEach: function() {
        fixture = document.createElement('div');
        fixture.id = 'intern-dom-fixture';
        fixture.innerHTML = [
          '<div class="test-foo"></div>',
          '<div class="test-foo"></div>',
          '<div id="test-bar"></div>',
        ].join('');
        document.body.appendChild(fixture);
      },
      afterEach: function() {
        fixture.parentNode.removeChild(fixture);
        fixture = null;
      },

      undefined: function() {
        var res = nodeArray(undefined);
        expect(res).to.be.a('array');
        expect(res.length).to.equal(0);
      },
      array: function() {
        var res = nodeArray([123]);
        expect(res).to.be.a('array');
        expect(res.length).to.equal(1);
      },
      node: function() {
        var node = document.getElementById('test-bar');
        var res = nodeArray(node);
        expect(res).to.be.a('array');
        expect(res[0]).to.equal(node);
      },
      string: function() {
        var node = document.querySelectorAll('.test-foo');
        var res = nodeArray('.test-foo');
        expect(res).to.be.a('array');
        expect(res[0]).to.equal(node[0]);
        expect(res[1]).to.equal(node[1]);
      },
      iterable: function() {
        var node = document.querySelectorAll('.test-foo');
        var res = nodeArray(node);
        expect(res).to.be.a('array');
        expect(res[0]).to.equal(node[0]);
        expect(res[1]).to.equal(node[1]);
      },
      invalid: function() {
        expect(function() {
          nodeArray(new Date());
        }).to.throw(TypeError);
      },
    };
  });
});
