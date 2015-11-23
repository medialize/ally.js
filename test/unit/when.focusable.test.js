define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/when/focusable',
], function(registerSuite, expect, customFixture, whenFocusable) {

  registerSuite(function() {
    var fixture;
    var handle;

    return {
      name: 'when/focusable',

      beforeEach: function() {
        fixture = customFixture([
          /*eslint-disable indent */
          '<div id="outer">',
            '<div id="inner">',
              '<input type="text" id="target">',
            '</div>',
          '</div>',
          /*eslint-enable indent */
        ].join(''));

        fixture.outer = document.getElementById('outer');
        fixture.inner = document.getElementById('inner');
        fixture.target = document.getElementById('target');

        // move target out of view by making the parent scrollable
        var reset = 'box-sizing: border-box; margin:0; padding:0; border:0;';
        fixture.outer.setAttribute('style', reset + ' width: 200px; height: 50px; overflow: hidden;');
        fixture.inner.setAttribute('style', reset + ' width: 1000px; height: 50px; padding-left: 200px;');
        fixture.target.setAttribute('style', reset + ' width: 200px; height: 50px;');
        fixture.outer.scrollLeft = 0;
      },
      afterEach: function() {
        // make sure a failed test cannot leave listeners behind
        handle && handle.disengage({ force: true });
        fixture.remove();
        fixture = null;
      },

      'invalid invocation': function() {
        expect(function() {
          handle = whenFocusable();
        }).to.throw(TypeError, 'when/focusable requires options.callback to be a function');

        expect(function() {
          handle = whenFocusable({
            context: document.body,
          });
        }).to.throw(TypeError, 'when/focusable requires options.callback to be a function');

        expect(function() {
          handle = whenFocusable({
            callback: function() {},
          });
        }).to.throw(TypeError, 'when/visible-area requires valid options.context');
      },
      'visible initially': function() {
        var deferred = this.async(10000);
        // scroll to 100% visibility
        fixture.outer.scrollLeft = 200;
        handle = whenFocusable({
          context: '#target',
          callback: deferred.callback(function() {
            expect(fixture.outer.scrollLeft).to.equal(200);
          }),
        });
      },
      'scroll parent, area: 1': function() {
        var deferred = this.async(10000);
        handle = whenFocusable({
          context: '#target',
          callback: deferred.callback(function() {
            expect(fixture.outer.scrollLeft).to.equal(200);
          }),
        });

        // scroll to 75% visibility
        fixture.outer.scrollLeft = 150;

        setTimeout(function() {
          // scroll to 100% visibility
          fixture.outer.scrollLeft = 200;
        }, 50);
      },
      'scroll parent, area: 0.5': function() {
        var deferred = this.async(10000);
        handle = whenFocusable({
          context: '#target',
          area: 0.5,
          callback: deferred.callback(function() {
            expect(fixture.outer.scrollLeft).to.equal(100);
          }),
        });

        // scroll to 25% visibility
        fixture.outer.scrollLeft = 50;

        setTimeout(function() {
          // scroll to 50% visibility
          fixture.outer.scrollLeft = 100;
        }, 50);
      },
      'repeat callback': function() {
        var deferred = this.async(10000);
        var counter = 3;
        handle = whenFocusable({
          context: '#target',
          callback: deferred.rejectOnError(function() {
            expect(fixture.outer.scrollLeft).to.equal(200);
            counter--;
            if (counter) {
              return false;
            }

            deferred.resolve();
          }),
        });

        expect(fixture.outer.scrollLeft).to.equal(0);

        setTimeout(function() {
          // scroll to 100% visibility
          fixture.outer.scrollLeft = 200;
        }, 50);
      },
      'disengage observer': function() {
        var deferred = this.async(10000);
        handle = whenFocusable({
          context: '#target',
          callback: deferred.rejectOnError(function() {
            throw new Error('should have been aborted');
          }),
        });

        handle.disengage();
        // scroll to 100% visibility
        fixture.outer.scrollLeft = 200;

        setTimeout(function() {
          deferred.resolve();
        }, 50);
      },
      'waiting for focus': function() {
        var deferred = this.async(10000);
        // scroll to 100% visibility
        fixture.outer.scrollLeft = 200;
        fixture.target.disabled = true;
        handle = whenFocusable({
          context: '#target',
          callback: deferred.callback(function() {
            expect(fixture.target.disabled).to.equal(false);
            expect(fixture.outer.scrollLeft).to.equal(200);
          }),
        });

        setTimeout(function() {
          fixture.target.disabled = false;
        }, 50);
      },
    };
  });
});
