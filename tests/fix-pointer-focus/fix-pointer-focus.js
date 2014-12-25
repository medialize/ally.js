require.config({
  paths: {
    ally: '../../src'
  }
});

require(['ally/fix-browser/pointer-focus'], function (fixPointerFocus) {
  fixPointerFocus(document);
});
