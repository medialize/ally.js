define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/shadow-input.fixture',
  'ally/get/shadow-host-parents',
], function(registerSuite, expect, shadowInputFixture, getShadowHostParents) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'get/shadow-host-parents',

      beforeEach: function() {
        fixture = shadowInputFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      'invalid context': function() {
        expect(function() {
          getShadowHostParents();
        }).to.throw(TypeError, 'get/shadow-host-parents requires valid options.context');
      },
      none: function() {
        var target = fixture.root;
        var shadowParents = getShadowHostParents({
          context: target,
        });

        expect(shadowParents.length).to.equal(0);
      },
      'from shadowHost': function() {
        if (!fixture.shadow.first) {
          this.skip('Shadow DOM not supported');
        }

        var shadowParents = getShadowHostParents({
          context: fixture.shadow.first,
        });

        expect(shadowParents.length).to.equal(0);
      },
      'from shadowRoot': function() {
        if (!fixture.shadow.first) {
          this.skip('Shadow DOM not supported');
        }

        var shadowParents = getShadowHostParents({
          context: fixture.shadow.first.shadowRoot,
        });

        expect(shadowParents.length).to.equal(1);
        expect(shadowParents[0]).to.equal(fixture.shadow.first);
      },
      'from shadowed element': function() {
        if (!fixture.shadow.first) {
          this.skip('Shadow DOM not supported');
        }

        var shadowParents = getShadowHostParents({
          context: fixture.input.second,
        });

        expect(shadowParents.length).to.equal(2);
        expect(shadowParents[0]).to.equal(fixture.shadow.second);
        expect(shadowParents[1]).to.equal(fixture.shadow.first);
      },
    };
  });
});
