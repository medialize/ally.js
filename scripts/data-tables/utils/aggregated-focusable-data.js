
const path = require('path');
const glob = require('glob');

const notes = require('./focusable.notes');
const groups = require('./focusable.groups');
const platforms = require('./platforms');

// import data from tests/focusable
const source = {};
glob.sync('*.json', {
  cwd: path.resolve(__dirname, '../../../tests/focusable/data/'),
  realpath: true,
}).sort().forEach(function(file) {
  const name = path.basename(file, '.json');
  const content = require(file);

  if (name.slice(0, 5) === 'meta.') {
    return;
  }

  platforms.add(content.platform, name);
  source[name] = content;
});

// source data converted to Maps/Sets for improved lookups
const mapped = new Map();
// hold all the keys we know
const idents = new Set(groups.idents);

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

  // focusable, focusableEvents, noFocusMethod, tabOrder are simple arrays
  ['focusable', 'focusEvents', 'noFocusMethod', 'tabOrder'].forEach(function(key) {
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
    var tabindex = browserData.tabIndex.get(ident);
    result[browser] = {
      browser: {
        focusable: browserData.focusable.has(ident),
        tabbable: browserData.tabOrder.has(ident),
        focusEvent: browserData.focusEvents.has(ident),
        focusMethod: !browserData.noFocusMethod.has(ident),
        tabIndex: tabindex !== undefined ? tabindex : 'null',
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

// make sense of that randomly imported mess
platforms.sort();
// we may have data that is not properly grouped
groups.handleIdentsWithoutGroup(idents);

module.exports = {
  platforms: platforms.map,
  columns: platforms.columns,
  browsers: platforms.browsers,
  data: aggregated,
  notes: notes,
  groups: groups.list,
};
