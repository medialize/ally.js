
import platform from 'platform';

// https://jsbin.com/vafaba/3/edit?html,js,console,output
const result = platform.name === 'Firefox' || platform.name === 'IE';

export default function() {
  return result;
}
