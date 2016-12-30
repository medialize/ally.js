define(function(require) {
  'use strict';

  var bdd = require('intern!bdd');
  var expect = require('intern/chai!expect');
  var customFixture = require('../helper/fixtures/custom.fixture');
  var eventActiveElement = require('ally/event/active-element');

  bdd.describe('event/active-element', function() {
    var fixture;
    var events;
    var handle;
    var handleEvent;

    function collectActiveEvents(event) {
      events.push(events.detail);
      handleEvent && handleEvent(event);
    }

    function before() {
      fixture = customFixture([
        '<input type="text" id="first">',
        '<input type="text" id="second">',
      ]);
      fixture.first = document.getElementById('first');
      fixture.second = document.getElementById('second');
      events = [];

      // IE may be stuck on <html> being the activeElement
      document.activeElement && document.activeElement.blur();
      document.body.focus();

      document.addEventListener('active-element', collectActiveEvents, true);
    }

    function after() {
      // make sure a failed test cannot leave listeners behind
      handle && handle.disengage({ force: true });
      document.removeEventListener('active-element', collectActiveEvents, true);
      fixture.remove();
      fixture = null;
      events = null;
    }

    bdd.describe('lifecycle', function() {
      bdd.before(before);
      bdd.after(after);

      bdd.it('should engage', function() {
        var deferred = this.async(10000);

        // initiate with delay because of IE10's async focus event from previous test
        setTimeout(deferred.callback(function() {
          // clean events that may have been caught by IE10 before we even got started
          events.length = 0;

          handle = eventActiveElement();

          expect(handle.disengage).to.be.a('function', 'initialized disengage');
          expect(events.length).to.equal(0, 'initialized event buffer');
        }), 20);
      });

      bdd.it('should detect focus shift from body to #first', function() {
        var deferred = this.async(10000);

        handleEvent = deferred.callback(function(event) {
          expect(event.detail.blur).to.equal(document.body, 'document lost focus');
          expect(event.detail.focus).to.equal(fixture.first, 'first got focus');
          expect(events.length).to.equal(1, 'first event buffer');
        });

        fixture.first.focus();
      });

      bdd.it('should detect focus shift from #first to #second', function() {
        var deferred = this.async(10000);

        handleEvent = deferred.callback(function(event) {
          expect(event.detail.blur).to.equal(fixture.first, 'first lost focus');
          expect(event.detail.focus).to.equal(fixture.second, 'second got focus');
          expect(events.length).to.equal(2, 'second event buffer');
        });

        fixture.second.focus();
      });

      bdd.it('should disengage', function() {
        var deferred = this.async(10000);

        handleEvent = deferred.rejectOnError(function() {
          throw new Error('event handler not disengaged');
        });

        handle.disengage();
        document.activeElement.blur();
        setTimeout(deferred.callback(function() {
          expect(events.length).to.equal(2);
        }), 20);
      });
    });

    bdd.describe('lifecycle when activeElement is removed', function() {
      bdd.before(before);
      bdd.after(after);

      bdd.it('should engage', function() {
        var deferred = this.async(10000);

        // initiate with delay because of IE10's async focus event from previous test
        setTimeout(deferred.callback(function() {
          // clean events that may have been caught by IE10 before we even got started
          events.length = 0;

          handle = eventActiveElement();

          expect(handle.disengage).to.be.a('function', 'initialized disengage');
          expect(events.length).to.equal(0, 'initialized event buffer');
        }), 20);
      });

      bdd.it('should detect focus shift from body to #first', function() {
        var deferred = this.async(10000);

        handleEvent = deferred.callback(function(event) {
          expect(event.detail.blur).to.equal(document.body, 'document lost focus');
          expect(event.detail.focus).to.equal(fixture.first, 'first got focus');
          expect(events.length).to.equal(1, 'first event buffer');
        });

        fixture.first.focus();
      });

      bdd.it('should detect focus shift from #first to #second', function() {
        var deferred = this.async(10000);

        handleEvent = deferred.callback(function(event) {
          expect(event.detail.blur).to.equal(fixture.first, 'first lost focus');
          expect(event.detail.focus).to.equal(fixture.second, 'second got focus');
          expect(events.length).to.equal(2, 'second event buffer');
        });

        fixture.first.parentNode.removeChild(fixture.first);
        fixture.second.focus();
      });

      bdd.it('should disengage', function() {
        var deferred = this.async(10000);

        handleEvent = deferred.rejectOnError(function() {
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
