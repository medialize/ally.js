define(function(require) {

  return {
    allowsInvalidTabindexValue: require('ally/supports/focus-invalid-tabindex')(),
    allowsTrailingCharacters: require('ally/supports/focus-tabindex-trailing-characters')(),
    canFocusAreaImgTabindex: require('ally/supports/focus-area-img-tabindex')(),
    canFocusAreaTabindex: require('ally/supports/focus-area-tabindex')(),
    canFocusAreaWithoutHref: require('ally/supports/focus-area-without-href')(),
    canFocusAudioWithoutControls: require('ally/supports/focus-audio-without-controls')(),
    canFocusBrokenImageMap: require('ally/supports/focus-broken-image-map')(),
    canFocusChildrenOfFocusableFlexbox: require('ally/supports/focus-children-of-focusable-flexbox')(),
    canFocusDisabledFieldset: require('ally/supports/focus-fieldset-disabled')(),
    canFocusFieldset: require('ally/supports/focus-fieldset')(),
    canFocusFlexboxContainer: require('ally/supports/focus-flexbox-container')(),
    canFocusDisabledForm: require('ally/supports/focus-form-disabled')(),
    canFocusImgIsmap: require('ally/supports/focus-img-ismap')(),
    canFocusImgUsemapTabindex: require('ally/supports/focus-img-usemap-tabindex')(),
    canFocusInvalidTabindex: require('ally/supports/focus-invalid-tabindex')(),
    canFocusLabelTabindex: require('ally/supports/focus-label-tabindex')(),
    canFocusObjectSvg: require('ally/supports/focus-object-svg')(),
    canFocusObjectSwf: require('ally/supports/focus-object-swf')(),
    canFocusRedirectLegend: require('ally/supports/focus-redirect-legend')(),
    canFocusRedirectImgUsemap: require('ally/supports/focus-redirect-img-usemap')(),
    canFocusScrollBody: require('ally/supports/focus-scroll-body')(),
    canFocusScrollContainer: require('ally/supports/focus-scroll-container')(),
    canFocusScrollContainerWithoutOverflow: require('ally/supports/focus-scroll-container-without-overflow')(),
    canFocusSvgMethod: require('ally/supports/svg-focus-method')(),
    canFocusoutEvent: require('ally/supports/focusout-event')(),
    cssShadowPiercingDeepCombinator: require('ally/supports/css-shadow-piercing-deep-combinator')(),
    tabsequenceSortsAreaAtImagePosition: require('ally/supports/tabsequence-area-at-img-position')(),
  };

});
