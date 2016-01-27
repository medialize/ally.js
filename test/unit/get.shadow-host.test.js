define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/shadow-input.fixture',
  'ally/get/shadow-host',
], function(registerSuite, expect, shadowInputFixture, getShadowHost) {

  registerSuite(function() {
    var fixture;

    return {
      name: 'get/shadow-host',

      beforeEach: function() {
        fixture = shadowInputFixture();
      },
      afterEach: function() {
        fixture.remove();
        fixture = null;
      },

      'invalid context': function() {
        expect(function() {
          getShadowHost();
        }).to.throw(TypeError, 'get/shadow-host requires valid options.context');
      },
      none: function() {
        var target = fixture.root;
        var shadowParents = getShadowHost({
          context: target,
        });

        expect(shadowParents).to.equal(null);
      },
      'from shadowHost': function() {
        if (!fixture.shadow.first) {
          this.skip('Shadow DOM not supported');
        }

        var shadowHost = getShadowHost({
          context: fixture.shadow.first,
        });

        expect(shadowHost).to.equal(null);
      },
      'from shadowRoot': function() {
        if (!fixture.shadow.first) {
          this.skip('Shadow DOM not supported');
        }

        var shadowHost = getShadowHost({
          context: fixture.shadow.first.shadowRoot,
        });

        expect(shadowHost).to.equal(fixture.shadow.first);
      },
      'from shadowed element': function() {
        if (!fixture.shadow.first) {
          this.skip('Shadow DOM not supported');
        }

        var shadowHost = getShadowHost({
          context: fixture.input.second,
        });

        expect(shadowHost).to.equal(fixture.shadow.second);
      },
    };
  });
});
