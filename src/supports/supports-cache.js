/*
    Facility to cache test results in localStorage.

    USAGE:
      cache.get('key');
      cache.set('key', 'value');
 */

import version from '../version';

function readLocalStorage(key) {
  // allow reading from storage to retrieve previous support results
  // even while the document does not have focus
  let data;

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
    // not be handled properly and events may not be dispatched immediately.
    // This can happen when a document is reloaded while Developer Tools have focus.
    try {
      window.localStorage && window.localStorage.removeItem(key);
    } catch (e) {
      // ignore
    }

    return;
  }

  try {
    window.localStorage && window.localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    // ignore
  }
}

const userAgent = typeof window !== 'undefined' && window.navigator.userAgent || '';
const cacheKey = 'ally-supports-cache';
let cache = readLocalStorage(cacheKey);

// update the cache if ally or the user agent changed (newer version, etc)
if (cache.userAgent !== userAgent || cache.version !== version) {
  cache = {};
}

cache.userAgent = userAgent;
cache.version = version;

export default {
  get: function() {
    return cache;
  },
  set: function(values) {
    Object.keys(values).forEach(function(key) {
      cache[key] = values[key];
    });

    cache.time = new Date().toISOString();
    writeLocalStorage(cacheKey, cache);
  },
};
