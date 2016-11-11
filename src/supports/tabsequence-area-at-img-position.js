
import platform from '../util/platform';

// https://jsbin.com/vafaba/3/edit?html,js,console,output
const result = platform.is.GECKO || platform.is.TRIDENT || platform.is.EDGE;

export default function() {
  return result;
}
