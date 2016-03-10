
import memorizeResult from '../supports/memorize-result';
import canFocusRedirectImgUsemap from '../supports/focus-redirect-img-usemap';
import canFocusRedirectLegend from '../supports/focus-redirect-legend';

export default memorizeResult(function() {
  return {
    canFocusRedirectImgUsemap: canFocusRedirectImgUsemap(),
    canFocusRedirectLegend: canFocusRedirectLegend(),
  };
});
