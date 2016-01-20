define(function(require) {

  var platform = require('ally/util/platform');

  // https://github.com/videojs/video.js/issues/290
  var CANNOT_DEAL_WITH_MEDIA = (function() {
    try {
      var mp3 = require('ally/supports/media/mp3');
      var div = document.createElement('div');
      div.innerHTML = '<audio id="unknown-dimension-audio" controls src="' + mp3 + '"></audio>';
      return false;
    } catch (e) {
      return true;
    }
  })();

  return {
    // IE9 may not have "Windows Media Feature Pack" available,
    // causing "Error: Not implemented" being thrown all over the place
    AVOID_MEDIA: CANNOT_DEAL_WITH_MEDIA,
    // Test VMs may have an older Quicktime installed,
    // causing modal update dialogs to crash the tests
    AVOID_QUICKTIME: platform.is.WEBKIT,

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
    canFocusSvg: require('ally/supports/focus-svg')(),
    canFocusSvgFocusableAttribute: require('ally/supports/focus-svg-focusable-attribute')(),
    canFocusoutEvent: require('ally/supports/focusout-event')(),
    cssShadowPiercingDeepCombinator: require('ally/supports/css-shadow-piercing-deep-combinator')(),
    svgFocusMethod: require('ally/supports/svg-focus-method')(),
    tabsequenceSortsAreaAtImagePosition: require('ally/supports/tabsequence-area-at-img-position')(),
  };

});
