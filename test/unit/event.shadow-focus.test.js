define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var shadowInputFixture = require('../helper/fixtures/shadow-input.fixture');
  var eventShadowFocus = require('ally/event/shadow-focus');

  bdd.describe('event/shadow-focus', function() {
    var fixture;
    var events;
    var handle;
    var handleEvent;

    function collectShadowFocusEvents(event) {
      events.push(events.detail);
      handleEvent && handleEvent(event);
    }

    function collectFocusEvents(event) {
      handleEvent && handleEvent(event);
    }

    function before() {
      fixture = shadowInputFixture();
      events = [];
      document.addEventListener('shadow-focus', collectShadowFocusEvents, true);
      document.addEventListener('focus', collectFocusEvents, true);

      if (!fixture.shadow.first) {
        this.skip('ShadowDOM is not supported');
      }
    }

    function after() {
      // make sure a failed test cannot leave listeners behind
      handle && handle.disengage({ force: true });
      document.removeEventListener('shadow-focus', collectShadowFocusEvents, true);
      document.removeEventListener('focus', collectFocusEvents, true);
      fixture.remove();
      fixture = null;
      events = null;
    }

    bdd.describe('lifecycle', function() {
      bdd.before(before);
      bdd.after(after);

      bdd.it('should engage', function() {
        handle = eventShadowFocus();

        expect(handle.disengage).to.be.a('function');
        expect(events.length).to.equal(0);
      });

      bdd.it('should detect focus shift from body to #outer', function() {
        var deferred = this.async(10000);

        // body -> #outer
        handleEvent = deferred.callback(function(event) {
          expect(event.type).to.equal('focus');
          expect(event.target).to.equal(fixture.input.outer);
          expect(events.length).to.equal(0);
        });

        fixture.input.outer.focus();
      });

      bdd.it('should detect focus shift from #outer to #first', function() {
        var deferred = this.async(10000);

        // body -> #outer
        handleEvent = deferred.callback(function(event) {
          if (event.type === 'focus') {
            return;
          }

          expect(event.type).to.equal('shadow-focus');
          expect(event.detail.active).to.equal(fixture.input.first);
          expect(event.detail.hosts.length).to.equal(1);
          expect(event.detail.hosts[0]).to.equal(fixture.shadow.first);
          expect(events.length).to.equal(1);
        });

        fixture.input.first.focus();
      });

      bdd.it('should detect focus shift from #first to #second', function() {
        var deferred = this.async(10000);

        // body -> #outer
        handleEvent = deferred.callback(function(event) {
          if (event.type === 'focus') {
            return;
          }

          expect(event.type).to.equal('shadow-focus');
          expect(event.detail.active).to.equal(fixture.input.second);
          expect(event.detail.hosts.length).to.equal(2);
          expect(event.detail.hosts[0]).to.equal(fixture.shadow.second);
          expect(event.detail.hosts[1]).to.equal(fixture.shadow.first);
          expect(events.length).to.equal(2);
        });

        fixture.input.second.focus();
      });

      bdd.it('should disengage', function() {
        var deferred = this.async(10000);

        handleEvent = deferred.rejectOnError(function() {
          if (event.type === 'focus') {
            return;
          }

          throw new Error('event handler not disengaged');
        });

        handle.disengage();
        document.activeElement.blur();
        setTimeout(deferred.callback(function() {
          expect(events.length).to.equal(2);
        }), 20);
      });
    });
  });
});
