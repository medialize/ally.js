define(function(require) {
  'use strict';

  var Command = require('intern/dojo/node!leadfoot/Command');
  var expect = require('intern/chai!expect');
  var keys = require('intern/dojo/node!leadfoot/keys');
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

  Command.prototype.focusForward = function() {
    return new this.constructor(this, function () {
      var _keys = this.session.capabilities.shiftFocusOnAltTabToLink
        ? [keys.ALT, keys.TAB]
        : [keys.TAB];

      return this.parent
        .pressKeys(_keys)
        .pressKeys(keys.NULL);
    });
  };

  Command.prototype.focusBackward = function() {
    return new this.constructor(this, function () {
      var _keys = this.session.capabilities.shiftFocusOnAltTabToLink
        ? [keys.ALT, keys.SHIFT, keys.TAB]
        : [keys.SHIFT, keys.TAB];

      return this.parent
        .pressKeys(_keys)
        .pressKeys(keys.NULL);
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

  Command.prototype.skipUnlessCapability = function(test, capabilities, message) {
    return new this.constructor(this, function () {
      if (!Array.isArray(capabilities)) {
        capabilities = [capabilities];
      }

      var supported = capabilities.some(function(capability) {
        return Boolean(this.session.capabilities[capability]);
      }, this);

      if (supported) {
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
