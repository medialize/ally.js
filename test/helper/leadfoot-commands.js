define(function(require) {
  'use strict';

  var Command = require('intern/dojo/node!leadfoot/Command');
  var expect = require('intern/chai!expect');
  var pollUntil = require('intern/dojo/node!leadfoot/helpers/pollUntil');

  Command.prototype.setTimeouts = function(timeout) {
    return new this.constructor(this, function () {
      return this.parent
        .setPageLoadTimeout(timeout)
        .setFindTimeout(timeout)
        .setExecuteAsyncTimeout(timeout);
    });
  };

  Command.prototype.withActiveElement = function(callback) {
    return new this.constructor(this, function () {
      return this.parent
        .execute('return document.activeElement.id || document.activeElement.nodeName.toUpperCase()')
        .then(callback);
    });
  };

  Command.prototype.expectActiveElement = function(expectedElementId, message) {
    return this.withActiveElement(function(activeElementId) {
      expect(activeElementId).to.equal(expectedElementId, message);
    });
  };

  Command.prototype.focusBody = function() {
    return new this.constructor(this, function () {
      return this.parent
        .findByCssSelector('body')
          .click()
          .end();
    });
  };

  Command.prototype.focusById = function(id) {
    return new this.constructor(this, function () {
      return this.parent
        .findById(id)
          .click()
          .end();
    });
  };

  Command.prototype.skipUnlessCapability = function(test, capability, message) {
    return new this.constructor(this, function () {
      if (this.session.capabilities[capability]) {
        return;
      }

      test.skip(message);
    });
  };

  Command.prototype.skipPlatform = function(test, callback, message) {
    return new this.constructor(this, function () {
      return this.parent
        .then(pollUntil('return window.platform'))
        .then(function(platform) {
          if (callback(platform)) {
            test.skip(message);
          }
        });
    });
  };

  Command.prototype.useCommand = function(CustomCommand) {
    return new CustomCommand(this, function () {});
  };

  return function(prototype) {
    function CustomCommand() {
      Command.apply(this, arguments);
    }

    CustomCommand.prototype = Object.create(Command.prototype);
    CustomCommand.prototype.constructor = CustomCommand;

    Object.keys(prototype).forEach(function(name) {
      CustomCommand.prototype[name] = function() {
        var args = arguments;
        return new this.constructor(this, function () {
          prototype[name].apply(this, args);
        });
      }
    });

    return CustomCommand;
  };

});
