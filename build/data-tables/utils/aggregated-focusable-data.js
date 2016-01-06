
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
    data.elements[ident] = {
      tabindexProperty: is.index,
      hasFocusMethod: true,
      focusable: is.focusable,
      tabbable: is.tabbable,
      scriptFocus: {
        documentActiveElement: is.focusable,
        contextActiveElement: is.focusable,
        cssFocus: is.focusable,
        event: is.focusable,
        redirected: is.redirect || null,
        encapsulated: is.encapsulated || null,
      },
    };
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

// hold all the keys we know
const idents = new Set(groups.idents);
const registerIdent = ident => idents.add(ident);
const registerIdents = list => list.forEach(registerIdent);

// prepare the data for lookups
Object.keys(source).forEach(function(browser) {
  const sourceData = source[browser];
  const sourceIdents = Object.keys(sourceData.elements);

  // register redirections and encapsulations
  sourceIdents.forEach(function(ident) {
    registerIdent(ident);
    const element = sourceData.elements[ident];
    const scriptFocus = element.scriptFocus || {};
    const target = scriptFocus.redirected || scriptFocus.encapsulated;
    if (target) {
      registerIdent(target);
      notes.registerRedirection(browser, ident, target);
    }

    const ally = element.ally || {};
    if (ally.focusTarget) {
      registerIdent(ally.focusTarget);
      notes.registerRedirection('ally:' + browser, ident, ally.focusTarget);
    }
  });

  // simplify lookups
  sourceData.ally.focusableQuick = new Set(sourceData.ally.focusableQuick);
  sourceData.ally.focusableStrict = new Set(sourceData.ally.focusableStrict);
  sourceData.ally.tabbableQuick = new Set(sourceData.ally.tabbableQuick);
  sourceData.ally.tabbableStrict = new Set(sourceData.ally.tabbableStrict);

  // register all other idents
  registerIdents(sourceData.tabsequence || []);
  registerIdents(sourceData.ally.focusableQuick || []);
  registerIdents(sourceData.ally.focusableStrict || []);
  registerIdents(sourceData.ally.tabbableQuick || []);
  registerIdents(sourceData.ally.tabbableStrict || []);
  registerIdents(sourceData.ally.tabsequence || []);
  registerIdents(sourceData.jquery.focusable || []);
  registerIdents(sourceData.jquery.tabbable || []);
});

function readableLabel(focusable, tabbable, onlyTabbable, redirecting) {
  return (redirecting && 'redirecting')
    || (focusable && tabbable && 'tabbable')
    || (focusable && !tabbable && 'focusable')
    || (!focusable && tabbable && 'only tabbable')
    || (onlyTabbable && 'only tabbable')
    || 'inert';
}

function generateBrowserStructure(ident, browserData, browser) {
  const element = browserData.elements[ident] || {};
  const scriptFocus = element.scriptFocus || {};
  const ally = element.ally || {};
  const jquery = element.jquery || {};

  if (!browserData.elements[ident]) {
    element.tabindexProperty = 'null';
    element.hasFocusMethod = true;
    if (ident.slice(0, 13) !== 'inert-in-ally') {
      notes.registerMissing(browser, ident);
    }
  }

  return {
    browser: {
      focusable: Boolean(element.focusable),
      tabbable: Boolean(element.tabbable),
      focusEvent: Boolean(scriptFocus.event),
      focusMethod: Boolean(element.hasFocusMethod),
      redirecting: scriptFocus.redirected || null,
      encapsulated: scriptFocus.encapsulated || null,
      tabIndex: element.tabindexProperty !== undefined ? element.tabindexProperty : 'null',
      label: null,
    },
    ally: {
      focusable: Boolean(ally.focusable),
      focusableStrict: browserData.ally.focusableStrict.has(ident),
      focusableQuick: browserData.ally.focusableQuick.has(ident),
      labelQuick: null,
      tabbable: Boolean(ally.tabbable),
      tabbableStrict: browserData.ally.tabbableStrict.has(ident),
      tabbableQuick: browserData.ally.tabbableQuick.has(ident),
      labelStrict: null,
      onlyTabbable: Boolean(ally.onlyTabbable),
      redirecting: ally.focusTarget || null,
    },
    jquery: {
      focusable: Boolean(jquery.focusable),
      tabbable: Boolean(jquery.focusable),
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
  Object.keys(source).forEach(function(browser) {
    const browserData = source[browser];
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
