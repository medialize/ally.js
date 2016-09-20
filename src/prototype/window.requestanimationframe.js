
// Polyfill requestAnimationFrame for oldIE
// adapted from https://gist.github.com/paulirish/1579671
// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel
// original source was published under the MIT license
// https://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

typeof window !== 'undefined' && (function() {
  let lastTime = 0;
  const vendors = ['ms', 'moz', 'webkit', 'o'];
  let requestAnimationFrameName = '';
  let cancelAnimationFrameName = '';

  for (let x = 0, length = vendors.length; x < length; ++x) {
    requestAnimationFrameName = window[vendors[x] + 'RequestAnimationFrame'];
    cancelAnimationFrameName = window[vendors[x] + 'CancelAnimationFrame']
      || window[vendors[x] + 'CancelRequestAnimationFrame'];
  }

  if (typeof window.requestAnimationFrame !== 'function') {
    window.requestAnimationFrame = window[requestAnimationFrameName] || function(callback) {
      const currTime = new Date().getTime();
      const timeToCall = Math.max(0, 16 - (currTime - lastTime));
      const id = window.setTimeout(function() {
        callback(currTime + timeToCall);
      }, timeToCall);

      lastTime = currTime + timeToCall;
      return id;
    };
  }

  if (typeof window.cancelAnimationFrame !== 'function') {
    window.cancelAnimationFrame = window[cancelAnimationFrameName] || function(id) {
      clearTimeout(id);
    };
  }
})();
