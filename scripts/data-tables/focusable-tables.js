
var path = require('path');
var mkdirp = require('mkdirp');

var targetDirectory = path.resolve(__dirname, '../../dist/docs/data-tables/');
mkdirp.sync(targetDirectory);

var generateTableDocument = require('./utils/generate-table-document');

// actual browser compatibility data
var source = require('./utils/aggregated-focusable-data');
// convert source.browsers to a strcture suitable for table.hbs
var browsers = source.platforms;
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
    The tables are based on the <a href="http://medialize.github.io/test/focusable/test.html">focusable test document</a>.</p>`,
  skipExpected: false,
  skipIdents: function(sourceIdent) {
    // skip rows that are completely inert
    return !source.columns.some(function(browser) {
      let data = sourceIdent[browser];
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
    and what ally.js identifies using <a href="../api/query/focusable.html"><code>strategy: quick</code></a>.</p>`,
  skipExpected: true,
  skipIdents: function(sourceIdent) {
    // skip rows where every browser-cell equals the ally-cell
    return !source.columns.some(function(browser) {
      let data = sourceIdent[browser];
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
});

generateTableDocument({
  source,
  browsers,
  targetFile: path.resolve(targetDirectory, 'focusable.strict.html'),
  title: 'Focusable Elements (Strict) - ally.js Compatibility Table',
  introduction: `<p>The following tables show the differences between what browsers consider <a href="./focusable.html">focusable</a>
    and what ally.js identifies using <a href="../api/query/focusable.html"><code>strategy: strict</code></a>.</p>`,
  skipExpected: true,
  skipIdents: function(sourceIdent) {
    // skip rows where every browser-cell equals the ally-cell
    return !source.columns.some(function(browser) {
      let data = sourceIdent[browser];
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
});

generateTableDocument({
  source,
  browsers,
  targetFile: path.resolve(targetDirectory, 'focusable.jquery.html'),
  title: 'Focusable Elements - jQuery UI Compatibility Table',
  introduction: `<p>The following tables show the differences between what browsers consider <a href="./focusable.html">focusable</a>
    and what <a href="http://api.jqueryui.com/focusable-selector/">jQuery UI</a> identifies.</p>`,
  skipExpected: true,
  skipIdents: function(sourceIdent) {
    // skip rows where every browser-cell equals the ally-cell
    return !source.columns.some(function(browser) {
      let data = sourceIdent[browser];
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
