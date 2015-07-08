
import shadowHost from './shadow-host';

function isShadowed(element) {
  return Boolean(shadowHost(element));
}

export default isShadowed;
