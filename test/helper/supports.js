define(function(require) {

  return {
    allowsInvalidTabindexValue: require('ally/supports/focus-invalid-tabindex'),
    allowsTrailingCharacters: require('ally/supports/focus-tabindex-trailing-characters'),
    canFocusBrokenImageMap: require('ally/supports/focus-broken-image-map'),
    canFocusChildrenOfFocusableFlexbox: require('ally/supports/focus-children-of-focusable-flexbox'),
    canFocusDisabledFieldset: require('ally/supports/focus-fieldset-disabled'),
    canFocusEmbed: require('ally/supports/focus-embed'),
    canFocusEmbedTabindex: require('ally/supports/focus-embed-tabindex'),
    canFocusImgIsmap: require('ally/supports/focus-img-ismap'),
    canFocusImgUsemapTabindex: require('ally/supports/focus-img-usemap-tabindex'),
    canFocusInvalidTabindex: require('ally/supports/focus-invalid-tabindex'),
    canFocusLabelTabindex: require('ally/supports/focus-label-tabindex'),
    canFocusScrollBody: require('ally/supports/focus-scroll-body'),
    canFocusScrollContainer: require('ally/supports/focus-scroll-container'),
    canFocusScrollContainerWithoutOverflow: require('ally/supports/focus-scroll-container-without-overflow'),
    canFocusoutEvent: require('ally/supports/focusout-event'),
    cssShadowPiercingDeepCombinator: require('ally/supports/css-shadow-piercing-deep-combinator'),
  };

});
