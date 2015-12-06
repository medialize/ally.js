
import memorizeResult from '../supports/memorize-result';
import cssShadowPiercingDeepCombinator from '../supports/css-shadow-piercing-deep-combinator';

export default memorizeResult(function() {
  return {
    cssShadowPiercingDeepCombinator: cssShadowPiercingDeepCombinator(),
  };
});
