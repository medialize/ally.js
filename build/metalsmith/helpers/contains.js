
module.exports = function(key, haystack, context) {
  var contained = (haystack || '').indexOf(key) > -1;
  if (contained) {
    return context.fn(this);
  } else {
    return context.inverse(this);
  }
};
