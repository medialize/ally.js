require.config({
  urlArgs: "bust=" +  (new Date()).getTime(),
  paths: {
    ally: '../dist/amd',
    // shims required by ally.js
    'array.prototype.findindex': '../bower_components/array.prototype.findindex/index',
    'CSS.escape': '../bower_components/CSS.escape/css.escape',
  }
});
