require.config({
  paths: {
    ally: '../../dist/amd'
  }
});

require(['ally/fix-browser/pointer-focus'], function (fixPointerFocus) {
  fixPointerFocus(document);
});
