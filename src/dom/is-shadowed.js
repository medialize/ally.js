
import getShadowHost from '../get/shadow-host';

function isShadowed(element) {
  return Boolean(getShadowHost({context: element}));
}

export default isShadowed;
