
export default function(callback) {
  let result = callback;
  return function() {
    if (result !== callback) {
      return result;
    }

    result = callback();
    return result;
  };
}
