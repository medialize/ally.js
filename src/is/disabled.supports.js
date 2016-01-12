
import memorizeResult from '../supports/memorize-result';
import canFocusDisabledForm from '../supports/focus-form-disabled';

export default memorizeResult(function() {
  return {
    canFocusDisabledForm: canFocusDisabledForm(),
  };
});
