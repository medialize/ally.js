
module.exports = function (value, test, context) {
  if (value === test) {
    return context.fn(this);
  } else {
    return context.inverse(this);
  }
}
