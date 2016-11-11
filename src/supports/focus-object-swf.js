
import platform from '../util/platform';

// Every Environment except IE9 considers SWF objects focusable
const result = !platform.is.IE9;

export default function() {
  return result;
}
