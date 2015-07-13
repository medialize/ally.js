require.config({
  urlArgs: "bust=" +  (new Date()).getTime(),
  paths: {
    ally: '../dist/amd',
    // shims required by ally.js
    'array.prototype.findindex': '../node_modules/array.prototype.findindex/index',
    'css.escape': '../node_modules/css.escape/css.escape',
  }
});
