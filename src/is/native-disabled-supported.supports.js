
import memorizeResult from '../supports/memorize-result';
import canFocusDisabledFieldset from '../supports/focus-fieldset-disabled';

export default memorizeResult(function() {
  return {
    canFocusDisabledFieldset: canFocusDisabledFieldset(),
  };
});
