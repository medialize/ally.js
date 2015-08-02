define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/custom.fixture',
  'ally/when/visible',
], function(registerSuite, expect, customFixture, whenVisible) {

  registerSuite(function() {
    var fixture;
    var handle;

    return {
      name: 'when/visible',

      beforeEach: function() {
        fixture = customFixture([
          '<div id="outer">',
            '<div id="inner">',
              '<input type="text" id="target">',
            '</div>',
          '</div>',
        ].join(''));

        fixture.outer = document.getElementById('outer');
        fixture.inner = document.getElementById('inner');
        fixture.target = document.getElementById('target');

        // move target out of view by making the parent scrollable
        // #outer must be 1px larger than #target for area to reach 1 in Firefox
        var reset = 'box-sizing: border-box; margin:0; padding:0; border:0;';
        fixture.outer.setAttribute('style', reset + ' width: 201px; height: 50px; overflow: hidden;');
        fixture.inner.setAttribute('style', reset + ' width: 1000px; height: 50px; padding-left: 200px;');
        fixture.target.setAttribute('style', reset + ' width: 200px; height: 50px;');
        fixture.outer.scrollLeft = 0;
      },
      afterEach: function() {
        // make sure a failed test cannot leave listeners behind
        handle && handle.disengage();
        fixture.remove();
        fixture = null;
      },

      'invalid invocation': function() {
        expect(function() {
          handle = whenVisible();
        }).to.throw(TypeError, 'when/visible requires options.callback to be a function');

        expect(function() {
          handle = whenVisible({
            context: document.body,
          });
        }).to.throw(TypeError, 'when/visible requires options.callback to be a function');

        expect(function() {
          handle = whenVisible({
            callback: function() {},
          });
        }).to.throw(TypeError, 'when/visible requires valid options.context');
      },
      'visible initially': function() {
        var deferred = this.async(500);
        // scroll to 100% visibility
        fixture.outer.scrollLeft = 200;
        handle = whenVisible({
          context: '#target',
          callback: deferred.callback(function() {
            expect(fixture.outer.scrollLeft).to.equal(200);
          }),
        });
      },
      'scroll parent, area: 1': function() {
        var deferred = this.async(500);
        handle = whenVisible({
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
        var deferred = this.async(500);
        handle = whenVisible({
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
        var deferred = this.async(500);
        var counter = 3;
        handle = whenVisible({
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

        setTimeout(function() {
          // scroll to 100% visibility
          fixture.outer.scrollLeft = 200;
        }, 50);
      },
      'disengage observer': function() {
        var deferred = this.async(500);
        handle = whenVisible({
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
    };
  });
});
