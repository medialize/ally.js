define(function(require) {
  'use strict';

  var Promise = require('intern/dojo/Promise');

  function WorkerProxy() {
    this.counter = 0;
    this.deferreds = {};
    this.worker = new Worker('../../test/helper/worker.js');
    this.worker.addEventListener('message', this._handleMessage.bind(this), false);
  }

  WorkerProxy.prototype = {
    _handleMessage: function(event) {
      var id = event.data.id;
      var dfd = this.deferreds[id];
      if (!dfd) {
        return;
      }

      if (event.data.error) {
        var _error = new Error(event.data.error.split('\n')[0]);
        _error.stack = event.data.error;
        dfd.reject(_error);
      } else {
        dfd.resolve(event.data.result);
      }

      delete this.deferreds[id];
    },

    _wrapTest: function(promise, deferred, callback) {
      promise.then(
        deferred.callback(callback),
        deferred.reject.bind(deferred)
      );
    },

    terminate: function() {
      this.worker && this.worker.terminate();
      this.worker = null;
    },

    run: function(modules, callback) {
      var id = this.counter++;
      this.worker.postMessage({
        id: id,
        modules: (typeof modules === 'string' ? [modules] : modules) || [],
        callback: String(callback),
      });
      var dfd = new Promise.Deferred();
      this.deferreds[id] = dfd;
      dfd.promise.test = this._wrapTest.bind(this, dfd.promise);
      return dfd.promise;
    },
  };

  if (typeof window === undefined || !window.Worker) {
    return null;
  }

  return WorkerProxy;
});
