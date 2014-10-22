require.config({
  paths: {
    a11y: '../../src'
  }
});

require(['a11y/focus/prevent-pointer'], function (preventPointerFocus) {
  preventPointerFocus(document);
});
