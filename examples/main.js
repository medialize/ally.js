require.config({
  urlArgs: "bust=" +  (new Date()).getTime(),
  paths: {
    a11y: '../src',
    // shims required by a11y.js
    'array.prototype.findindex': '../bower_components/array.prototype.findindex/index',
    'CSS.escape': '../bower_components/CSS.escape/css.escape',
  }
});
