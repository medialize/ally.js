
import memorizeResult from '../supports/memorize-result';
import canFocusRedirectLegend from '../supports/focus-redirect-legend';
import canFocusRedirectImgUsemap from '../supports/focus-redirect-img-usemap';

export default memorizeResult(function() {
  return {
    canFocusRedirectLegend: canFocusRedirectLegend(),
    canFocusRedirectImgUsemap: canFocusRedirectImgUsemap(),
  };
});
