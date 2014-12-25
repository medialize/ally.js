require.config({
  paths: {
    a11y: '../../src'
  }
});

require(['a11y/fix-browser/pointer-focus'], function (fixPointerFocus) {
  fixPointerFocus(document);
});
