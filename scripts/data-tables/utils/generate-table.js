
// see http://usability.com.au/2005/06/accessible-data-tables-2005

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
// Prism is not properly checking if "self" actually exists
global.self = {};
var Prism = require('prismjs');

const tableTemplate = fs.readFileSync(path.resolve(__dirname, '../templates/table.hbs'), {encoding: 'utf8'});
const _tableTemplate = Handlebars.compile(tableTemplate);
const cellTemplateDefault = fs.readFileSync(path.resolve(__dirname, '../templates/table-cell.hbs'), {encoding: 'utf8'});
const _cellTemplateDefault = Handlebars.compile(cellTemplateDefault);
const rowTemplate = fs.readFileSync(path.resolve(__dirname, '../templates/table-row.hbs'), {encoding: 'utf8'});
const _rowTemplate = Handlebars.compile(rowTemplate);

function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

function beautifyIdentLabel(label, ident) {
  if (label === ident) {
    return '<code class="language-css">'
      + Prism.highlight(label, Prism.languages.css, 'css')
      + '</code>';
  }

  return '<code class="language-html">'
    + Prism.highlight(label, Prism.languages.markup, 'html')
    + '</code>';
}

var identCounter = 0;

module.exports = function({
  group,
  columns,
  source,
  browsers,
  skipIdents,
  skipExpected,
  cellTemplate,
  cellData,
}) {
  const _cellTemplate = cellTemplate || _cellTemplateDefault;
  var rows = [];

  var idents = group.idents;
  if (Array.isArray(group.idents)) {
    idents = {};
    group.idents.forEach(ident => idents[ident] = ident);
  }

  Object.keys(idents).forEach(function(ident) {
    var sourceIdent = source.data[ident];
    if (skipIdents && skipIdents(sourceIdent)) {
      return;
    }

    identCounter++;
    var identId = group.id + '-ident-' + identCounter;
    var cells = [];

    if (!skipExpected) {
      let expected = clone(sourceIdent.expected);
      expected.platform = source.browsers.expected;
      expected.groupId = group.id;
      expected.identId = identId;
      expected.ident = ident;

      expected.isInert = !expected.browser.focusable && !expected.browser.tabbable;
      cells.push(_cellTemplate(expected));
    }

    columns.forEach(function(browser) {
      var data = clone(sourceIdent[browser]);
      data.platform = source.browsers[browser];

      data.groupId = group.id;
      data.identId = identId;
      data.ident = ident;

      if (cellData) {
        data.cellData = cellData(data);
      }

      data.notes = source.notes.get(ident, browser);
      data.isInert = !data.browser.focusable && !data.browser.tabbable;
      cells.push(_cellTemplate(data));
    });

    const notes = source.notes.get(ident);
    rows.push(_rowTemplate({
      groupId: group.id,
      identId,
      ident,
      label: idents[ident],
      labelHtml: beautifyIdentLabel(idents[ident], ident),
      duplicates: group.duplicate[ident] || '',
      hasNotes: notes.length,
      notes: notes,
      cells: cells.join('\n'),
    }));
  });

  if (!rows.length) {
    return '';
  }

  return _tableTemplate({
    summary: 'columns represent browsers, rows represent HTML elements, '
      + 'cells show whether the browser thinks the HTML element is focusable, tabbable (keyboard focusable) or inert',
    caption: group.label,
    expectedColumn: !skipExpected,
    browsers: browsers,
    groupId: group.id,
    tbody: rows.join('\n'),
  });
};
