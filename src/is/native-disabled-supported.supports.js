
import memorizeResult from '../supports/memorize-result';
import canFocusDisabledFieldset from '../supports/focus-fieldset-disabled';
import canFocusDisabledForm from '../supports/focus-form-disabled';

export default memorizeResult(function() {
  return {
    canFocusDisabledFieldset: canFocusDisabledFieldset(),
    canFocusDisabledForm: canFocusDisabledForm(),
  };
});
