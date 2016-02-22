
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

  // convert hostElementFocus to childElementFocus
  sourceIdents.forEach(function(ident) {
    const element = sourceData.elements[ident];
    if (!element.hostElementFocus) {
      return;
    }

    const hostIdent = element.scriptFocus.encapsulated;
    const hostElement = sourceData.elements[hostIdent];
    if (!hostElement) {
      return;
    }

    if (hostElement.childElementFocus && hostElement.childElementFocus.contextActiveElement) {
      // we already have the positive case
      return;
    }

    hostElement.childElementFocus = element.hostElementFocus;
  });

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

function generateBrowserStructure(ident, browser, browserData) {
  const element = browserData.elements[ident] || {};
  const scriptFocus = element.scriptFocus || {};
  const ally = element.ally || {};
  const jquery = element.jquery || {};

  const focusHost = element.childElementFocus;
  const isHostElement = focusHost && (focusHost.documentActiveElement || focusHost.contextActiveElement);

  return {
    browser: {
      focusable: Boolean(element.focusable),
      tabbable: Boolean(element.tabbable),
      focusEvent: Boolean(scriptFocus.event),
      focusStyle: Boolean(scriptFocus.cssFocus),
      focusMethod: Boolean(element.hasFocusMethod),
      redirecting: scriptFocus.redirected || null,
      encapsulated: scriptFocus.encapsulated || null,
      focusHost: isHostElement,
      tabIndex: element.tabindexProperty !== undefined ? element.tabindexProperty : 'null',
      label: null,
    },
    ally: {
      label: null,
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

function readableLabel(focusable, tabbable, onlyTabbable, redirecting, focusHost) {
  return (redirecting && 'redirecting')
    || (focusable && tabbable && 'tabbable')
    || (focusable && !tabbable && 'focusable')
    || (!focusable && tabbable && 'only tabbable')
    || (onlyTabbable && 'only tabbable')
    || (focusHost && 'inert host')
    || 'inert';
}

function addReadableLabels(src) {
  src.browser.label = readableLabel(
    src.browser.focusable,
    src.browser.tabbable,
    null, // onlyTabbable
    src.browser.redirecting,
    src.browser.focusHost
  );
  src.jquery.label = readableLabel(
    src.jquery.focusable,
    src.jquery.tabbable,
    null, // onlyTabbable
    null, // redirecting
    null // focusHost
  );
  src.ally.label = readableLabel(
    src.ally.focusable,
    src.ally.tabbable,
    src.ally.onlyTabbable,
    src.ally.redirecting,
    null // focusHost
  );
  src.ally.labelQuick = readableLabel(
    src.ally.focusableQuick,
    src.ally.tabbableQuick,
    src.ally.onlyTabbable,
    src.ally.redirecting,
    null // focusHost
  );
  src.ally.labelStrict = readableLabel(
    src.ally.focusableStrict,
    src.ally.tabbableStrict,
    src.ally.onlyTabbable,
    src.ally.redirecting,
    null // focusHost
  );
}

function addGeneratedNotes(ident, browser, browserData, data) {
  let element = browserData.elements[ident];
  if (!element) {
    element = {
      tabindexProperty: 'null',
      hasFocusMethod: true,
    };

    if (ident.slice(0, 13) !== 'inert-in-ally') {
      notes.registerMissing(browser, ident);
    }

    return;
  }

  if (data.label === 'inert') {
    return;
  } else if (element.referenceElementFocus) {
    notes.registerRelatedElement(browser, ident, element.referenceElementFocus);
  } else if (element.hostElementFocus) {
    notes.registerRelatedElement(browser, ident, element.hostElementFocus);
  }
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
    result[browser] = generateBrowserStructure(ident, browser, browserData);
    addReadableLabels(result[browser]);
    addGeneratedNotes(ident, browser, browserData, result[browser]);
  });

  result.checksum = {
    browser: calculateBrowserChecksum(result, function(data) {
      return [data.browser.label];
    }),
    jquery: calculateBrowserChecksum(result, function(data) {
      return [data.browser.label, data.jquery.label];
    }),
    ally: calculateBrowserChecksum(result, function(data) {
      return [data.browser.label, data.ally.label];
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
