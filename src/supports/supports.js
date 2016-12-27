
import detectFocus from './detect-focus';
import cache from './supports-cache';

import cssShadowPiercingDeepCombinator from './css-shadow-piercing-deep-combinator';
import focusAreaImgTabindex from './focus-area-img-tabindex';
import focusAreaTabindex from './focus-area-tabindex';
import focusAreaWithoutHref from './focus-area-without-href';
import focusAudioWithoutControls from './focus-audio-without-controls';
import focusBrokenImageMap from './focus-broken-image-map';
import focusChildrenOfFocusableFlexbox from './focus-children-of-focusable-flexbox';
import focusFieldsetDisabled from './focus-fieldset-disabled';
import focusFieldset from './focus-fieldset';
import focusFlexboxContainer from './focus-flexbox-container';
import focusFormDisabled from './focus-form-disabled';
import focusImgIsmap from './focus-img-ismap';
import focusImgUsemapTabindex from './focus-img-usemap-tabindex';
import focusInHiddenIframe from './focus-in-hidden-iframe';
import focusInZeroDimensionObject from './focus-in-zero-dimension-object';
import focusInvalidTabindex from './focus-invalid-tabindex';
import focusLabelTabindex from './focus-label-tabindex';
import focusObjectSvgHidden from './focus-object-svg-hidden';
import focusObjectSvg from './focus-object-svg';
import focusObjectSwf from './focus-object-swf';
import focusRedirectImgUsemap from './focus-redirect-img-usemap';
import focusRedirectLegend from './focus-redirect-legend';
import focusScrollBody from './focus-scroll-body';
import focusScrollContainerWithoutOverflow from './focus-scroll-container-without-overflow';
import focusScrollContainer from './focus-scroll-container';
import focusSummary from './focus-summary';
import focusSvgFocusableAttribute from './focus-svg-focusable-attribute';
import focusSvgTabindexAttribute from './focus-svg-tabindex-attribute';
import focusSvgNegativeTabindexAttribute from './focus-svg-negative-tabindex-attribute';
import focusSvgUseTabindex from './focus-svg-use-tabindex';
import focusSvgForeignobjectTabindex from './focus-svg-foreignobject-tabindex';
import focusSvgInIframe from './focus-svg-in-iframe';
import focusSvg from './focus-svg';
import focusTabindexTrailingCharacters from './focus-tabindex-trailing-characters';
import focusTable from './focus-table';
import focusVideoWithoutControls from './focus-video-without-controls';
import tabsequenceAreaAtImgPosition from './tabsequence-area-at-img-position';

const testCallbacks = {
  cssShadowPiercingDeepCombinator,
  focusInZeroDimensionObject,
  focusObjectSwf,
  focusSvgInIframe,
  tabsequenceAreaAtImgPosition,
};

const testDescriptions = {
  focusAreaImgTabindex,
  focusAreaTabindex,
  focusAreaWithoutHref,
  focusAudioWithoutControls,
  focusBrokenImageMap,
  focusChildrenOfFocusableFlexbox,
  focusFieldsetDisabled,
  focusFieldset,
  focusFlexboxContainer,
  focusFormDisabled,
  focusImgIsmap,
  focusImgUsemapTabindex,
  focusInHiddenIframe,
  focusInvalidTabindex,
  focusLabelTabindex,
  focusObjectSvg,
  focusObjectSvgHidden,
  focusRedirectImgUsemap,
  focusRedirectLegend,
  focusScrollBody,
  focusScrollContainerWithoutOverflow,
  focusScrollContainer,
  focusSummary,
  focusSvgFocusableAttribute,
  focusSvgTabindexAttribute,
  focusSvgNegativeTabindexAttribute,
  focusSvgUseTabindex,
  focusSvgForeignobjectTabindex,
  focusSvg,
  focusTabindexTrailingCharacters,
  focusTable,
  focusVideoWithoutControls,
};

function executeTests() {
  const results = detectFocus(testDescriptions);
  Object.keys(testCallbacks).forEach(function(key) {
    results[key] = testCallbacks[key]();
  });

  return results;
}

let supportsCache = null;

export default function() {
  if (supportsCache) {
    return supportsCache;
  }

  supportsCache = cache.get();
  if (!supportsCache.time) {
    cache.set(executeTests());
    supportsCache = cache.get();
  }

  return supportsCache;
}
