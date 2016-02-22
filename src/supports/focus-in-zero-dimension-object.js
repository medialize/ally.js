
import platform from '../util/platform';

const result = !platform.is.WEBKIT;

export default function() {
  return result;
}
