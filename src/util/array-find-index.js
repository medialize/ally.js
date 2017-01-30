export default function findIndex(array, callback) {
  // attempt to use native or polyfilled Array#findIndex first
  if (array.findIndex) {
    return array.findIndex(callback);
  }

  const length = array.length;

  // shortcut if the array is empty
  if (length === 0) {
    return -1;
  }

  // otherwise loop over array
  for (let i = 0; i < length; i++) {
    if (callback(array[i], i, array)) {
      return i;
    }
  }

  return -1;
}
