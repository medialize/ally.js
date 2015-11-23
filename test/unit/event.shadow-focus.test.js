define([
  'intern!object',
  'intern/chai!expect',
  '../helper/fixtures/shadow-input.fixture',
  'ally/event/shadow-focus',
], function(registerSuite, expect, shadowInputFixture, eventShadowFocus) {

  registerSuite(function() {
    var fixture;
    var events;
    var handle;
    var handleEvent;
    var collectShadowFocusEvents = function(event) {
      events.push(events.detail);
      handleEvent && handleEvent(event);
    };
    var collectFocusEvents = function(event) {
      handleEvent && handleEvent(event);
    };

    return {
      name: 'event/shadow-focus',

      beforeEach: function() {
        fixture = shadowInputFixture();
        events = [];
        document.addEventListener('shadow-focus', collectShadowFocusEvents, true);
        document.addEventListener('focus', collectFocusEvents, true);
      },
      afterEach: function() {
        // make sure a failed test cannot leave listeners behind
        handle && handle.disengage({ force: true });
        document.removeEventListener('shadow-focus', collectShadowFocusEvents, true);
        document.removeEventListener('focus', collectFocusEvents, true);
        fixture.remove();
        fixture = null;
        events = null;
      },

      lifecycle: function() {
        if (!fixture.shadow.first) {
          this.skip('Shadow DOM not supported');
        }

        var deferred = this.async(10000);
        handle = eventShadowFocus();
        var waitForOuter;
        var waitForFirst;
        var waitForSecond;
        var waitForDone;

        expect(handle.disengage).to.be.a('function');
        expect(events.length).to.equal(0);

        // body -> #outer
        waitForOuter = function() {
          handleEvent = deferred.rejectOnError(function(event) {
            expect(event.type).to.equal('focus');
            expect(event.target).to.equal(fixture.input.outer);
            expect(events.length).to.equal(0);

            waitForFirst();
          });

          setTimeout(function() {
            fixture.input.outer.focus();
          });
        };

        // #outer -> #first
        waitForFirst = function() {
          handleEvent = deferred.rejectOnError(function(event) {
            if (event.type === 'focus') {
              return;
            }

            expect(event.type).to.equal('shadow-focus');
            expect(event.detail.active).to.equal(fixture.input.first);
            expect(event.detail.hosts.length).to.equal(1);
            expect(event.detail.hosts[0]).to.equal(fixture.shadow.first);
            expect(events.length).to.equal(1);

            waitForSecond();
          });

          setTimeout(function() {
            fixture.input.first.focus();
          });
        };

        // #first -> #second
        waitForSecond = function() {
          handleEvent = deferred.rejectOnError(function(event) {
            if (event.type === 'focus') {
              return;
            }

            expect(event.type).to.equal('shadow-focus');
            expect(event.detail.active).to.equal(fixture.input.second);
            expect(event.detail.hosts.length).to.equal(2);
            expect(event.detail.hosts[0]).to.equal(fixture.shadow.second);
            expect(event.detail.hosts[1]).to.equal(fixture.shadow.first);
            expect(events.length).to.equal(2);

            waitForDone();
          });

          setTimeout(function() {
            fixture.input.second.focus();
          });
        };

        // disengage -> body
        waitForDone = function() {
          // make sure no events are collected after disengaging the event emitter
          handleEvent = deferred.rejectOnError(function() {
            if (event.type === 'focus') {
              return;
            }

            throw new Error('event handler not disengaged');
          });

          handle.disengage();
          setTimeout(function() {
            document.activeElement.blur();
            setTimeout(deferred.rejectOnError(function() {
              expect(events.length).to.equal(2);
              deferred.resolve();
            }), 20);
          });
        };

        waitForOuter();
      },
    };
  });
});
