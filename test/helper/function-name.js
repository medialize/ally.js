define([], function() {

  return function getFunctionName(func) {
    var s = String(func).match(/function\s+([^\(]+)\(/);
    return s && s[1] || null;
  };

});
