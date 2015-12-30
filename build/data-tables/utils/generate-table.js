
// see http://usability.com.au/2005/06/accessible-data-tables-2005

const fs = require('fs');
const path = require('path');
const Handlebars = require('handlebars');
const highlightLabel = require('./highlight-label');

const tableTemplate = fs.readFileSync(path.resolve(__dirname, '../templates/table.hbs'), {encoding: 'utf8'});
const _tableTemplate = Handlebars.compile(tableTemplate);
const cellTemplateDefault = fs.readFileSync(path.resolve(__dirname, '../templates/table-cell.hbs'), {encoding: 'utf8'});
const _cellTemplateDefault = Handlebars.compile(cellTemplateDefault);
const rowTemplate = fs.readFileSync(path.resolve(__dirname, '../templates/table-row.hbs'), {encoding: 'utf8'});
const _rowTemplate = Handlebars.compile(rowTemplate);

function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

let identCounter = 0;

module.exports = function({
  group,
  columns,
  source,
  browsers,
  skipIdents,
  skipExpected,
  referencedNotes,
  cellTemplate,
  cellData,
  rowData,
}) {
  const _cellTemplate = cellTemplate || _cellTemplateDefault;
  const rows = [];

  let idents = group.idents;
  if (Array.isArray(group.idents)) {
    idents = {};
    group.idents.forEach(ident => idents[ident] = ident);
  }

  Object.keys(idents).forEach(function(ident) {
    const sourceIdent = source.data[ident];
    const duplicateIdent = group.duplicate[ident] && source.data[group.duplicate[ident]];
    if (skipIdents && skipIdents(ident, sourceIdent, duplicateIdent)) {
      return;
    }

    identCounter++;
    const identId = group.id + '-ident-' + identCounter;
    const cells = [];

    if (!skipExpected) {
      const expected = clone(sourceIdent.expected);
      expected.platform = source.browsers.expected;
      expected.groupId = group.id;
      expected.identId = identId;
      expected.ident = ident;

      expected.notes = source.notes.getBrowser(ident, 'expected');
      expected.redirectTarget = source.notes.getTarget(ident, 'expected');
      expected.isInert = !expected.browser.focusable && !expected.browser.tabbable;
      cells.push(_cellTemplate(expected));

      expected.redirectTarget && referencedNotes.add(String(expected.redirectTarget));
      expected.notes.forEach(key => referencedNotes.add(String(key)));
    }

    columns.forEach(function(browser) {
      const data = clone(sourceIdent[browser]);
      data.platform = source.browsers[browser];

      data.groupId = group.id;
      data.identId = identId;
      data.ident = ident;

      if (cellData) {
        data.cellData = cellData(data);
      }

      data.notes = source.notes.getBrowser(ident, browser);
      data.redirectTarget = source.notes.getTarget(ident, browser);
      data.isInert = !data.browser.focusable && !data.browser.tabbable;
      cells.push(_cellTemplate(data));

      data.redirectTarget && referencedNotes.add(String(data.redirectTarget));
      data.notes.forEach(key => referencedNotes.add(String(key)));
    });

    const notes = source.notes.getIdent(ident);
    notes.forEach(key => referencedNotes.add(String(key)));

    const row = _rowTemplate({
      groupId: group.id,
      identId,
      ident,
      label: idents[ident],
      labelHtml: highlightLabel(idents[ident], ident),
      notes: notes,
      rowData: rowData && rowData(ident, sourceIdent, referencedNotes) || {},
      cells: cells.join('\n'),
    });
    rows.push(row);
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
