
const path = require('path');
const mkdirp = require('mkdirp');

const cwd = process.cwd();
const targetDirectory = path.resolve(cwd, 'web/data-tables/');
mkdirp.sync(targetDirectory);

const generateTableDocument = require('./utils/generate-table-document');
const highlightLabel = require('./utils/highlight-label');

// actual browser compatibility data
const source = require('./utils/aggregated-focusable-data');
// convert source.browsers to a strcture suitable for table.hbs
const browsers = source.platforms;
// replace browser-keys by their objects
Object.keys(browsers).forEach(function(browser) {
  browsers[browser].versions = browsers[browser].browsers.map(key => source.browsers[key]);
});

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
  skipIdents: function(sourceIdent) {
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
  skipIdents: function(sourceIdent) {
    // skip rows where every browser-cell equals the ally-cell
    return !source.columns.some(function(browser) {
      const data = sourceIdent[browser];
      return data.browser.label !== data.ally.labelQuick;
    });
  },
  cellTemplate: 'table-cell.compare.hbs',
  cellData: function(data) {
    return {
      libraryName: 'ally.js',
      match: data.browser.label === data.ally.labelQuick,
      label: data.ally.labelQuick,
      focusable: data.ally.focusableQuick,
      tabbable: !data.ally.focusableQuick && data.ally.onlyTabbable || data.ally.tabbableQuick,
    };
  },
  rowData: function(ident) {
    return {
      notes: source.notes.getAlly(ident),
    };
  },
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
  skipIdents: function(sourceIdent) {
    // skip rows where every browser-cell equals the ally-cell
    return !source.columns.some(function(browser) {
      const data = sourceIdent[browser];
      return data.browser.label !== data.ally.labelStrict;
    });
  },
  cellTemplate: 'table-cell.compare.hbs',
  cellData: function(data) {
    return {
      libraryName: 'ally.js',
      match: data.browser.label === data.ally.labelStrict,
      label: data.ally.labelStrict,
      focusable: data.ally.focusableStrict,
      tabbable: !data.ally.focusableStrict && data.ally.onlyTabbable || data.ally.tabbableStrict,
    };
  },
  rowData: function(ident) {
    return {
      notes: source.notes.getAlly(ident),
    };
  },
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
  skipIdents: function(sourceIdent) {
    // skip rows where every browser-cell equals the ally-cell
    return !source.columns.some(function(browser) {
      const data = sourceIdent[browser];
      return data.browser.label !== data.jquery.label;
    });
  },
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

generateTableDocument({
  source: source,
  browsers,
  targetFile: path.resolve(targetDirectory, 'focusable.redirect.html'),
  title: 'Focus Redirecting Elements - Browser Compatibility Table',
  introduction: `<p>The following tables show which elements forward focus to another element in individual browsers
    The tables are based on the <a href="http://allyjs.io/tests/focusable/test.html">focusable test document</a>.</p>`,
  skipExpected: true,
  skipIdents: function(sourceIdent) {
    // skip rows without redirections
    return !source.columns.some(function(browser) {
      const data = sourceIdent[browser];
      return data.browser.redirecting;
    });
  },
  cellTemplate: 'table-cell.redirect.hbs',
  cellData: function(data) {
    const label = data.browser.redirecting && source.redirects[data.browser.redirecting];
    return {
      label: label && highlightLabel(label) || data.browser.redirecting || '',
    };
  },
});
