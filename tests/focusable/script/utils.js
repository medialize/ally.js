define([], function() {

  return {
    elementName: function(element) {
      return element ? element.getAttribute('data-label') || element.nodeName : '-null-';
    },

    filterFocusMethod: function(element) {
      return Boolean(element.focus);
    },
    filterShadowRoot: function(element) {
      return Boolean(element.shadowRoot);
    },
    filterLabeledElements: function(element) {
      return element.hasAttribute('data-label');
    },
    removeIgnoredName: function(value) {
      return value !== 'ignore';
    },
    removeIgnoredAttribute: function(element) {
      return element.getAttribute('data-label') !== 'ignore';
    },

    sortMapByKey: function(map) {
      var res = {};
      Object.keys(map).sort().forEach(function(key) {
        res[key] = map[key];
      });

      return res;
    },

    getRootNode: function(element) {
      var parent = element;

      while (parent.parentNode) {
        parent = parent.parentNode;
      }

      return parent;
    },

    asyncMap: function(list, callback, context) {
      var promise = list.reduce(function(_promise, value) {
        var executeIteration = function(res) {
          return callback.call(context, value).then(function(result) {
            res.push(result);
            return res;
          });
        };

        return _promise.then(executeIteration);
      }, window.Promise.resolve([]));

      return promise;
    },

    // promise waterfall
    // https://remysharp.com/2015/12/18/promise-waterfall
  };

});
