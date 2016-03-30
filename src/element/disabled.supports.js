
import memorizeResult from '../supports/memorize-result';
import canFocusSvgFocusableAttribute from '../supports/focus-svg-focusable-attribute';
import canFocusSvgTabindexAttribute from '../supports/focus-svg-tabindex-attribute';

export default memorizeResult(function() {
  return {
    canFocusSvgFocusableAttribute: canFocusSvgFocusableAttribute(),
    canFocusSvgTabindexAttribute: canFocusSvgTabindexAttribute(),
  };
});
