require.config({
  paths: {
    a11y: '../../src'
  }
});

require(['a11y/focus/fix-pointer-focus'], function (fixPointerFocus) {
  fixPointerFocus(document);
});
