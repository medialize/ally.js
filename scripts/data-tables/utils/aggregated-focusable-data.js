
var path = require('path');
var glob = require('glob');

const platformGroups = {};
function fixPlatform(platform, key) {
  let mobile = false;
  let platformFamily = platform.os.family === 'Windows NT' && 'Windows'
    || platform.os.family;

  let group = (platformFamily + '-' + platform.name).replace(/[^a-z0-9]+/ig, '-').toLowerCase();
  let name = platform.name;
  let version = platform.version.split('.').slice(0, 2).join('.');

  // differentiate mobile platforms
  var appendPlatformFamily = new Set(['iOS', 'Android']);
  if (appendPlatformFamily.has(platform.os.family)) {
    name += ' (' + platform.os.family + ')';
    mobile = true;
  }

  platform.ally = {
    key,
    group,
    name,
    version,
  };

  if (!platformGroups[group]) {
    platformGroups[group] = {
      group,
      name,
      mobile,
      browsers: [],
    };
  }

  platformGroups[group].browsers.push(key);
}

// import data from tests/focusable
const source = {};
let notes;
let groups;
glob.sync('*.json', {
  cwd: path.resolve(__dirname, '../../../tests/focusable/data/'),
  realpath: true,
}).sort().forEach(function(file) {
  const name = path.basename(file, '.json');
  const content = require(file);
  if (name === 'meta.notes') {
    notes = content;
  } else if (name === 'meta.groups') {
    groups = content;
  } else {
    fixPlatform(content.platform, name);
    source[name] = content;
  }
});

// source data converted to Maps/Sets for improved lookups
const mapped = new Map();
// map of browsers (platform objects)
const browsers = {};
// hold all the keys we know
const idents = new Set();
const groupedIdents = new Set();
groups.forEach(function(group) {
  // add a key to be used for referencing the group in a data-table
  group.id = group.label.replace(/[^a-z0-9]+/ig, '-').toLowerCase();
  // flattened list of idents known to groups
  Object.keys(group.idents).forEach(function(ident) {
    idents.add(ident);
    groupedIdents.add(ident);
  });
});

// prepare the data for lookups
Object.keys(source).forEach(function(browser) {
  /*
    source[browser] = {
      "chrome-stable": {
        "platform": {},

        "focusable": [],
        "focusEvents": [],
        "focusRedirection": [],
        "noFocusMethod": [],
        "tabOrder": [],
        "tabIndex": {},
        "ally": {
          "focusable": [],
          "focusableStrict": [],
          "tabbable": [],
          "tabbableStrict": [],
          "onlyTabbable": [],
          "tabOrder": [],
        },
        "jquery": {
          "focusable": [],
          "tabOrder": [],
        },
      }
    }
  */
  const sourceData = source[browser];
  const mappedData = {};
  mapped.set(browser, mappedData);
  browsers[browser] = sourceData.platform;

  // focusable, focusableEvents, noFocusMethod, tabOrder are simple arrays
  ['focusable', 'focusableEvents', 'noFocusMethod', 'tabOrder'].forEach(function(key) {
    // we're going to do a few lookups, so casting to set first to avoid indexOf() calls
    mappedData[key] = new Set(sourceData[key]);
    // build a list of all the test idents we have
    mappedData[key].forEach(ident => idents.add(ident));
  });

  // focusRedirection is a list of maps
  // 'from --- to'
  mappedData.redirections = new Map();
  (sourceData.focusRedirection || []).forEach(function(key) {
    const _key = key.split(' --- ');
    mappedData.redirections.set(_key[0], _key[1]);
    idents.add(_key[0]);
    idents.add(_key[1]);
  });

  mappedData.tabIndex = new Map();
  Object.keys(sourceData.tabIndex || {}).forEach(key => mappedData.tabIndex.set(key, sourceData.tabIndex[key]));

  mappedData.ally = {};
  ['focusable', 'tabbable', 'focusableStrict', 'tabbableStrict', 'onlyTabbable', 'tabOrder'].forEach(function(key) {
    mappedData.ally[key] = new Set(sourceData.ally[key]);
    mappedData.ally[key].forEach(ident => idents.add(ident));
  });

  mappedData.jquery = {};
  ['focusable', 'tabOrder'].forEach(function(key) {
    mappedData.jquery[key] = new Set(sourceData.jquery[key]);
    mappedData.jquery[key].forEach(ident => idents.add(ident));
  });
});

function readableLabel(focusable, tabbable, onlyTabbable) {
  return (focusable && tabbable && 'tabbable')
    || (focusable && !tabbable && 'focusable')
    || (!focusable && tabbable && 'only tabbable')
    || (onlyTabbable && 'only tabbable')
    || 'inert';
}

// aggregate source data
const aggregated = {};
Array.from(idents).sort().forEach(function(ident) {
  const result = {};

  aggregated[ident] = result;
  mapped.forEach(function(browserData, browser) {
    result[browser] = {
      browser: {
        focusable: browserData.focusable.has(ident),
        tabbable: browserData.tabOrder.has(ident),
        focusEvent: browserData.focusableEvents.has(ident),
        focusMethod: !browserData.noFocusMethod.has(ident),
        tabIndex: browserData.tabIndex.get(ident),
        label: null,
      },
      ally: {
        focusableQuick: browserData.ally.focusable.has(ident),
        tabbableQuick: browserData.ally.tabbable.has(ident),
        labelQuick: null,
        focusableStrict: browserData.ally.focusableStrict.has(ident),
        tabbableStrict: browserData.ally.tabbableStrict.has(ident),
        labelStrict: null,
        onlyTabbable: browserData.ally.onlyTabbable.has(ident),
      },
      jquery: {
        focusable: browserData.jquery.focusable.has(ident),
        tabbable: browserData.jquery.tabOrder.has(ident),
        label: null,
      },
    };

    let src = result[browser];
    src.browser.label = readableLabel(
      src.browser.focusable,
      src.browser.tabbable
    );
    src.jquery.label = readableLabel(
      src.jquery.focusable,
      src.jquery.tabbable
    );
    src.ally.labelQuick = readableLabel(
      src.ally.focusableQuick,
      src.ally.tabbableQuick,
      src.ally.onlyTabbable
    );
    src.ally.labelStrict = readableLabel(
      src.ally.focusableStrict,
      src.ally.tabbableStrict,
      src.ally.onlyTabbable
    );
  });
});

// create missing group
const ungroupedIdents = Array.from(idents).filter(ident => !groupedIdents.has(ident));
if (ungroupedIdents.length) {
  groups.unshift({
    label: 'Elements Without Group',
    idents: ungroupedIdents,
    id: 'elements-without-group',
  });
}

// flat list of browser keys
const columns = [];
// show versions per platform in ascending order
function sortBrowserVersions(a, b) {
  return browsers[a].version > browsers[b].version ? 1 : -1;
}
// the expected column is not a real browser
delete platformGroups['expected-expected'];
// move mobile browsers to the end
Object.keys(platformGroups).forEach(function(group) {
  if (!platformGroups[group].mobile) {
    return;
  }

  let tmp = platformGroups[group];
  delete platformGroups[group];
  platformGroups[group] = tmp;
});
// sort versions and create flat columns list
Object.keys(platformGroups).forEach(function(group) {
  platformGroups[group].browsers.sort(sortBrowserVersions).forEach(browser => columns.push(browser));
});

module.exports = {
  platforms: platformGroups,
  columns,
  browsers,
  data: aggregated,
  notes,
  groups,
};
