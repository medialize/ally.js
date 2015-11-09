
const appendPlatformFamily = new Set(['iOS', 'Android']);
// grouped browsers
const map = {};
// individual browsers
const browsers = {};
// flat list of browser keys
const columns = [];

function addPlatform(platform, key) {
  // only to be used for grouping desktop and mobile browsers separately
  let mobile = false;
  // "Windows" needs some aliasing, possibly required for other platforms, too
  let platformFamily = (platform.os.family === 'Windows NT' && 'Windows')
    || (platform.os.family.slice(0, 14) === 'Windows Server' && 'Windows')
    || platform.os.family;

  // id-attribute safe string for table references
  let group = (platformFamily + '-' + platform.name).replace(/[^a-z0-9]+/ig, '-').toLowerCase();
  // name of the platform (not browser)
  let name = platform.name;
  // reduce version to "<major>.<minor>" for better display
  let version = platform.version.split('.').slice(0, 2).join('.');

  // differentiate mobile platforms
  if (appendPlatformFamily.has(platform.os.family)) {
    name += ' (' + platform.os.family + ')';
    mobile = true;
  }

  // extend original platform object
  platform.ally = {
    key,
    group,
    name,
    version,
  };

  // remember browser details
  browsers[key] = platform;

  if (key === 'expected') {
    return;
  }

  if (!map[group]) {
    map[group] = {
      group,
      name,
      mobile,
      browsers: [],
    };
  }

  map[group].browsers.push(key);
}

function sortBrowserVersions(a, b) {
  // show versions per platform in ascending order
  return browsers[a].version > browsers[b].version ? 1 : -1;
}

function sortPlatforms() {
  // move mobile browsers to the end
  Object.keys(map).forEach(function(group) {
    if (!map[group].mobile) {
      return;
    }

    let tmp = map[group];
    delete map[group];
    map[group] = tmp;
  });
  // sort versions and create flat columns list
  Object.keys(map).forEach(function(group) {
    map[group].browsers
      .sort(sortBrowserVersions)
      .forEach(browser => columns.push(browser));
  });
}

module.exports = {
  add: addPlatform,
  sort: sortPlatforms,
  map: map,
  columns,
  browsers,
};
