
// sugar for https://github.com/bestiejs/platform.js
// make sure to ALWAYS reference the layout engine,
// even if it is not necessary for the condition,
// as this makes grepping for this stuff simpler

import _platform from 'platform';

// deep clone of original platform
const platform = JSON.parse(JSON.stringify(_platform));

// operating system
const ANDROID = platform.os.family === 'Android';
const WINDOWS = platform.os.family.slice(0, 7) === 'Windows';
const OSX = platform.os.family === 'OS X';
const IOS = platform.os.family === 'iOS';

// layout
const BLINK = platform.layout === 'Blink';
const GECKO = platform.layout === 'Gecko';
const TRIDENT = platform.layout === 'Trident';
const WEBKIT = platform.layout === 'WebKit';

// browser version (not layout engine version!)
const version = parseFloat(platform.version);
const majorVersion = Math.floor(version);
platform.majorVersion = majorVersion;

platform.is = {
  // operating system
  ANDROID,
  WINDOWS,
  OSX,
  IOS,
  // layout
  BLINK, // "Chrome", "Chrome Mobile", "Opera"
  GECKO, // "Firefox"
  TRIDENT, // "Internet Explorer", ("Edge")
  WEBKIT, // "Safari"
  // INTERNET EXPLORERS
  IE9: TRIDENT && majorVersion === 9,
  IE10: TRIDENT && majorVersion === 10,
  IE11: TRIDENT && majorVersion === 11,
};

export default platform;
