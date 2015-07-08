/*
    Facility to cache test results in localStorage.

    USAGE:
      cache.get('key');
      cache.set('key', 'value');
 */

function readLocalStorage(key) {
  if (!document.hasFocus()) {
    // if the document does not have focus when tests are executed, focus() may
    // not be handled properly and eventy may not be dispatched immediately.
    // This can happen when a document is reloaded while Developer Tools have focus.
    window.console && window.console.warn && console.warn('document requires focus for a11y support tests');
    return {};
  }

  var data;
  try {
    data = window.localStorage && window.localStorage.getItem(key);
    data = data ? JSON.parse(data) : {};
  } catch (e) {
    data = {};
  }

  return data;
}

function writeLocalStorage(key, value) {
  if (!document.hasFocus()) {
    // if the document does not have focus when tests are executed, focus() may
    // not be handled properly and eventy may not be dispatched immediately.
    // This can happen when a document is reloaded while Developer Tools have focus.
    try {
      window.localStorage && window.localStorage.removeItem(key);
    } catch(e) {}

    return;
  }

  try {
    window.localStorage && window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {}
}

var userAgent = window.navigator.userAgent;
var cacheKey = 'ally-supports-cache';
var cache = readLocalStorage(cacheKey);

// update the cache if the user agent changes (newer version, etc)
if (cache.userAgent !== userAgent) {
  cache = {};
}

cache.userAgent = userAgent;

export default {
  get: function getCacheValue(key) {
    return cache[key];
  },
  set: function setCacheValue(key, value) {
    cache[key] = value;
    writeLocalStorage(cacheKey, cache);
  }
};
