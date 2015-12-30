
const path = require('path');
const glob = require('glob');

const cwd = process.cwd();
const notes = require('./focusable.notes');
const groups = require('./focusable.groups');
const platforms = require('./platforms');

function convertExpectedStructure(content) {
  const data = content['@structure'];
  delete content['@structure'];
  Object.keys(content).forEach(function(ident) {
    const is = content[ident];
    if (is.focusable) {
      data.focusable.push(ident);
      data.focusEvents.push(ident);
    }

    if (is.tabbable) {
      data.tabOrder.push(ident);
    }

    if (is.redirect) {
      data.focusRedirection.push(ident + ' --- ' + is.redirect);
    }

    if (is.encapsulated) {
      data.focusEncapsulation.push(ident + ' --- ' + is.encapsulated);
    }

    data.tabIndex[ident] = is.index;
  });

  return data;
}

// import data from tests/focusable
const source = {};
glob.sync('*.json', {
  cwd: path.resolve(cwd, 'tests/focusable/data/'),
  realpath: true,
}).sort().forEach(function(file) {
  let name = path.basename(file, '.json');
  let content = require(file);

  if (name === 'meta.expected') {
    name = 'expected';
    content = convertExpectedStructure(content);
  }

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
        "focusEncapsulation": [],
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
          "focusRedirection": {},
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
  // 'from --- to' refering to a redirection within the same document
  mappedData.redirections = new Map();
  (sourceData.focusRedirection || []).forEach(function(key) {
    const _key = key.split(' --- ');
    mappedData.redirections.set(_key[0], _key[1]);
    notes.registerRedirection(browser, _key[0], _key[1]);
    idents.add(_key[0]);
    idents.add(_key[1]);
  });
  // focusEncapsulation is a list of maps
  // 'from --- to' referring to an encapsulation of a nested document
  mappedData.encapsulations = new Map();
  (sourceData.focusEncapsulation || []).forEach(function(key) {
    const _key = key.split(' --- ');
    mappedData.encapsulations.set(_key[0], _key[1]);
    notes.registerRedirection(browser, _key[0], _key[1]);
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

  mappedData.ally.redirections = new Map();
  (Object.keys(sourceData.ally.focusRedirection || {})).forEach(function(key) {
    const target = sourceData.ally.focusRedirection[key];
    mappedData.ally.redirections.set(key, target);
    notes.registerRedirection('ally:' + browser, key, target);
    idents.add(key);
    idents.add(target);
  });

  mappedData.jquery = {};
  ['focusable', 'tabOrder'].forEach(function(key) {
    mappedData.jquery[key] = new Set(sourceData.jquery[key]);
    mappedData.jquery[key].forEach(ident => idents.add(ident));
  });
});

function readableLabel(focusable, tabbable, onlyTabbable, redirecting) {
  return (redirecting && 'redirecting')
    || (focusable && tabbable && 'tabbable')
    || (focusable && !tabbable && 'focusable')
    || (!focusable && tabbable && 'only tabbable')
    || (onlyTabbable && 'only tabbable')
    || 'inert';
}

function generateBrowserStructure(ident, browserData) {
  const tabindex = browserData.tabIndex.get(ident);
  return {
    browser: {
      focusable: browserData.focusable.has(ident),
      tabbable: browserData.tabOrder.has(ident),
      focusEvent: browserData.focusEvents.has(ident),
      focusMethod: !browserData.noFocusMethod.has(ident),
      redirecting: browserData.redirections.get(ident) || null,
      encapsulated: browserData.encapsulations.get(ident) || null,
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
      redirecting: browserData.ally.redirections.get(ident) || null,
    },
    jquery: {
      focusable: browserData.jquery.focusable.has(ident),
      tabbable: browserData.jquery.tabOrder.has(ident),
      label: null,
    },
  };
}

function addReadableLabels(src) {
  src.browser.label = readableLabel(
    src.browser.focusable,
    src.browser.tabbable,
    null, // onlyTabbable
    src.browser.redirecting
  );
  src.jquery.label = readableLabel(
    src.jquery.focusable,
    src.jquery.tabbable,
    null, // onlyTabbable
    null // redirecting
  );
  src.ally.labelQuick = readableLabel(
    src.ally.focusableQuick,
    src.ally.tabbableQuick,
    src.ally.onlyTabbable,
    src.ally.redirecting
  );
  src.ally.labelStrict = readableLabel(
    src.ally.focusableStrict,
    src.ally.tabbableStrict,
    src.ally.onlyTabbable,
    src.ally.redirecting
  );
}

function calculateBrowserChecksum(data, callback) {
  return Object.keys(data).sort().map(function(browser) {
    const _data = data[browser];
    return browser + ':' + callback(_data).join('|');
  }).join('#');
}

// aggregate source data
const aggregated = {};
Array.from(idents).sort().forEach(function(ident) {
  const result = {};

  aggregated[ident] = result;
  mapped.forEach(function(browserData, browser) {
    result[browser] = generateBrowserStructure(ident, browserData, browser);
    addReadableLabels(result[browser]);
  });

  result.checksum = {
    browser: calculateBrowserChecksum(result, function(data) {
      return [data.browser.label];
    }),
    jquery: calculateBrowserChecksum(result, function(data) {
      return [data.browser.label, data.jquery.label];
    }),
    allyStrict: calculateBrowserChecksum(result, function(data) {
      return [data.browser.label, data.ally.labelStrict];
    }),
    allyQuick: calculateBrowserChecksum(result, function(data) {
      return [data.browser.label, data.ally.labelQuick];
    }),
  };
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
  notes,
  groups: groups.list,
  inertIdents: groups.inertIdents,
};
