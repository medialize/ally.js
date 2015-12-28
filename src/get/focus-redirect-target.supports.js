
import memorizeResult from '../supports/memorize-result';
import canFocusRedirectLabel from '../supports/focus-redirect-label';
import canFocusRedirectLegend from '../supports/focus-redirect-legend';
import canFocusRedirectImgUsemap from '../supports/focus-redirect-img-usemap';

export default memorizeResult(function() {
  return {
    canFocusRedirectLabel: canFocusRedirectLabel(),
    canFocusRedirectLegend: canFocusRedirectLegend(),
    canFocusRedirectImgUsemap: canFocusRedirectImgUsemap(),
  };
});
