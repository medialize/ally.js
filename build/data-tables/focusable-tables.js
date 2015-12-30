
const path = require('path');
const mkdirp = require('mkdirp');

const cwd = process.cwd();
const targetDirectory = path.resolve(cwd, 'web/data-tables/');
mkdirp.sync(targetDirectory);

const generateTableDocument = require('./utils/generate-table-document');

// actual browser compatibility data
const source = require('./utils/aggregated-focusable-data');
// convert source.browsers to a strcture suitable for table.hbs
const browsers = source.platforms;
// replace browser-keys by their objects
Object.keys(browsers).forEach(function(browser) {
  browsers[browser].versions = browsers[browser].browsers.map(key => source.browsers[key]);
});

function rowDataAllyNotes(ident, sourceIdent, referencedNotes) {
  const notes = source.notes.getAlly(ident);
  notes.forEach(key => referencedNotes.add(String(key)));
  return {
    notes,
  };
}

function skipIdentsIfMatches(labelGroup, labelName) {
  return function(ident, sourceIdent) {
    if (ident.slice(0, 14) === 'inert-in-ally{') {
      return false;
    } else if (source.inertIdents.has(ident)) {
      return true;
    }

    // skip rows where every browser-cell equals the ally-cell
    return !source.columns.some(function(browser) {
      const data = sourceIdent[browser];
      return data.browser.label !== data[labelGroup][labelName];
    });
  };
}

generateTableDocument({
  source,
  browsers,
  targetFile: path.resolve(targetDirectory, 'focusable.html'),
  title: 'Focusable Elements - Browser Compatibility Table',
  introduction: `<p>The following tables show which elements individual browsers consider focusable or tabbable (keyboard focusable).
    The tables are based on the <a href="http://allyjs.io/tests/focusable/test.html">focusable test document</a>.</p>
    <p>Note that touch devices (without a physical keyboard) only show elements as tabbable (keyboard focusable),
    that can be navigated to through the on-screen keyboard (or "virtual keyboard").</p>`,
  skipExpected: false,
  skipIdents: function(ident, sourceIdent) {
    // skip rows that are completely inert
    return !source.columns.some(function(browser) {
      const data = sourceIdent[browser];
      return data.browser.label !== 'inert';
    });
  },
  cellData: null,
});

generateTableDocument({
  source,
  browsers,
  targetFile: path.resolve(targetDirectory, 'focusable.quick.html'),
  title: 'Focusable Elements (Quick) - ally.js Compatibility Table',
  introduction: `<p>The following tables show the differences between what browsers consider <a href="./focusable.html">focusable</a>
    and what ally.js identifies using <a href="../api/query/focusable.html"><code>strategy: quick</code></a>.</p>
    <p>Note that touch devices (without a physical keyboard) only show elements as tabbable (keyboard focusable),
    that can be navigated to through the on-screen keyboard (or "virtual keyboard").</p>`,
  skipExpected: true,
  skipIdents: skipIdentsIfMatches('ally', 'labelQuick'),
  cellTemplate: 'table-cell.compare.hbs',
  cellData: function(data) {
    return {
      libraryName: 'ally.js',
      match: data.browser.label === data.ally.labelQuick && data.browser.redirecting === data.ally.redirecting,
      label: data.ally.labelQuick,
      focusable: data.ally.focusableQuick,
      tabbable: !data.ally.focusableQuick && data.ally.onlyTabbable || data.ally.tabbableQuick,
      redirecting: data.ally.redirecting,
    };
  },
  rowData: rowDataAllyNotes,
});

generateTableDocument({
  source,
  browsers,
  targetFile: path.resolve(targetDirectory, 'focusable.strict.html'),
  title: 'Focusable Elements (Strict) - ally.js Compatibility Table',
  introduction: `<p>The following tables show the differences between what browsers consider <a href="./focusable.html">focusable</a>
    and what ally.js identifies using <a href="../api/query/focusable.html"><code>strategy: strict</code></a>.</p>
    <p>Note that touch devices (without a physical keyboard) only show elements as tabbable (keyboard focusable),
    that can be navigated to through the on-screen keyboard (or "virtual keyboard").</p>`,
  skipExpected: true,
  skipIdents: skipIdentsIfMatches('ally', 'labelStrict'),
  cellTemplate: 'table-cell.compare.hbs',
  cellData: function(data) {
    return {
      libraryName: 'ally.js',
      match: data.browser.label === data.ally.labelStrict && data.browser.redirecting === data.ally.redirecting,
      label: data.ally.labelStrict,
      focusable: data.ally.focusableStrict,
      tabbable: !data.ally.focusableStrict && data.ally.onlyTabbable || data.ally.tabbableStrict,
      redirecting: data.ally.redirecting,
    };
  },
  rowData: rowDataAllyNotes,
});

generateTableDocument({
  source,
  browsers,
  targetFile: path.resolve(targetDirectory, 'focusable.jquery.html'),
  title: 'Focusable Elements - jQuery UI Compatibility Table',
  introduction: `<p>The following tables show the differences between what browsers consider <a href="./focusable.html">focusable</a>
    and what <a href="http://api.jqueryui.com/focusable-selector/">jQuery UI</a> identifies.</p>
    <p>Note that touch devices (without a physical keyboard) only show elements as tabbable (keyboard focusable),
    that can be navigated to through the on-screen keyboard (or "virtual keyboard").</p>`,
  skipExpected: true,
  skipIdents: skipIdentsIfMatches('jquery', 'label'),
  cellTemplate: 'table-cell.compare.hbs',
  cellData: function(data) {
    return {
      libraryName: 'jQuery UI',
      match: data.browser.label === data.jquery.label,
      label: data.jquery.label,
      focusable: data.jquery.focusable,
      tabbable: data.jquery.focusable,
    };
  },
});
