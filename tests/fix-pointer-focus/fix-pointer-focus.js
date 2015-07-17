require.config({
  paths: {
    ally: '../../dist/amd'
  }
});

require(['ally/fix/pointer-focus'], function (fixPointerFocus) {
  fixPointerFocus(document);
});
