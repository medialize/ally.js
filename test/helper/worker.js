/*eslint-env worker*/
importScripts('../../node_modules/requirejs/require.js');

require.config({
  paths: {
    // map to AMD files
    'ally.js': '../../dist/amd',
    // provide paths to dependencies
    'array.prototype.findindex': '../../node_modules/array.prototype.findindex/index',
    'css.escape': '../../node_modules/css.escape/css.escape',
    platform: '../../node_modules/platform/platform',
  },
});

function stringToCallable(text) {
  var argumentNames;
  var functionBody = text.replace(/\(([^\)]+)\)/, function(match, args) {
    argumentNames = args.replace(/\s+/, '').split(',');
    return '';
  }).replace(/^function[^\{]+\{([\w\W]+)\}$/, '$1');
  return Function.apply(Function, argumentNames.concat([functionBody]));
}

onmessage = function(event) {
  var callback = stringToCallable(event.data.callback);
  require(event.data.modules, function() {
    var result;
    var error;

    try {
      result = callback.apply(null, arguments);
    } catch (e) {
      error = e;
    }

    postMessage({
      id: event.data.id,
      result: result,
      error: error && error.stack,
    });
  }, function(error) {
    postMessage({
      id: event.data.id,
      result: undefined,
      error: error.stack,
    });
  });
};
