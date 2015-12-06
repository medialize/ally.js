
import memorizeResult from '../supports/memorize-result';
import canFocusAreaImgTabindex from '../supports/focus-area-img-tabindex';
import canFocusAreaTabindex from '../supports/focus-area-tabindex';
import canFocusAreaWithoutHref from '../supports/focus-area-without-href';
import canFocusBrokenImageMaps from '../supports/focus-broken-image-map';

export default memorizeResult(function() {
  return {
    canFocusAreaImgTabindex: canFocusAreaImgTabindex(),
    canFocusAreaTabindex: canFocusAreaTabindex(),
    canFocusAreaWithoutHref: canFocusAreaWithoutHref(),
    canFocusBrokenImageMaps: canFocusBrokenImageMaps(),
  };
});
