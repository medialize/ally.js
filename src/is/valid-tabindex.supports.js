
import memorizeResult from '../supports/memorize-result';
import allowsInvalidValue from '../supports/focus-invalid-tabindex';
import allowsTrailingCharacters from '../supports/focus-tabindex-trailing-characters';

export default memorizeResult(function() {
  return {
    allowsInvalidValue: allowsInvalidValue(),
    allowsTrailingCharacters: allowsTrailingCharacters(),
  };
});
