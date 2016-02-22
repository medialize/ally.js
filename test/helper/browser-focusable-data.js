define([
  'intern/dojo/text!../../tests/focusable/data/chrome-nightly.json',
  'intern/dojo/text!../../tests/focusable/data/chrome-stable.json',
  'intern/dojo/text!../../tests/focusable/data/firefox-nightly.json',
  'intern/dojo/text!../../tests/focusable/data/firefox-stable.json',
  'intern/dojo/text!../../tests/focusable/data/ie-13.json',
  'intern/dojo/text!../../tests/focusable/data/ie-12.json',
  'intern/dojo/text!../../tests/focusable/data/ie-11.json',
  'intern/dojo/text!../../tests/focusable/data/ie-10.json',
  'intern/dojo/text!../../tests/focusable/data/ie-9.json',
  'intern/dojo/text!../../tests/focusable/data/safari-9.json',
  'intern/dojo/text!../../tests/focusable/data/safari-8.json',
  'intern/dojo/text!../../tests/focusable/data/safari-6.json',

  // currently not tested automatically
  'intern/dojo/text!../../tests/focusable/data/webkit-nightly.json',
  'intern/dojo/text!../../tests/focusable/data/chrome-mobile.json',
  'intern/dojo/text!../../tests/focusable/data/ios-9.json',
], function() {

  var data = [].map.call(arguments, JSON.parse);

  function findPlatform(product, name, version) {
    var results = data.filter(function(browser) {
      return browser.platform && (browser.platform.name === name)
        && (!product || product === browser.platform.product);
    });

    if (!version) {
      // we were not able to find a suitable lower-version set, so
      // let's go with the lowest we have (still higher than requests)
      return results[results.length - 1];
    }

    var _version = parseFloat(version);
    var distances = results.map(function(browser) {
      return _version - parseFloat(browser.platform.version);
    });
    // find the version distances to data that is older than
    // the current browser, effectively excluding browsers
    // that are older than what we've tested manually
    var olderDistances = distances.filter(function(distance) {
      return distance >= 0;
    });

    var closest = Math.min.apply(Math, olderDistances);
    var offset = distances.indexOf(closest);
    return results[offset];
  }

  return function(platform) {
    var results = findPlatform(platform.product, platform.name, platform.version);
    if (!results) {
      results = findPlatform(platform.product, platform.name);
    }

    if (!results) {
      return null;
    }

    return results;
  };

});
