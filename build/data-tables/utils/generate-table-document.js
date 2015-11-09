
const fs = require('fs');
const path = require('path');

const Handlebars = require('handlebars');
const generateTable = require('./generate-table');

const cwd = process.cwd();
const prismCss = fs.readFileSync(path.resolve(cwd, 'node_modules/prismjs/themes/prism.css'), {encoding: 'utf8'});
const documentTemplate = fs.readFileSync(path.resolve(__dirname, '../templates/document.hbs'), {encoding: 'utf8'});
const _documentTemplate = Handlebars.compile(documentTemplate);

function resolveCellTemplate(cellTemplate) {
  if (!cellTemplate) {
    return null;
  }

  const content = fs.readFileSync(path.resolve(__dirname, '../templates/', cellTemplate), {encoding: 'utf8'});
  return Handlebars.compile(content);
}

module.exports = function({
  targetFile,
  source,
  browsers,
  title,
  introduction,
  skipIdents,
  skipExpected,
  cellTemplate,
  cellData,
  rowData,
}) {
  const _cellTemplate = resolveCellTemplate(cellTemplate);
  const skippedGroups = new Set();
  // generate one table per group to keep things organized
  const tables = source.groups.map(function(group) {
    const html = generateTable({
      // ignore rows that are completely "inert"
      skipIdents,
      // do not print the expected column
      skipExpected,
      // custom handlebars template to make a <td>
      cellTemplate: _cellTemplate,
      cellData,
      rowData,

      // original data to transform
      source,
      // ident-group to create table for
      // { id: 'group-id', label: 'group label', idents: [ 'a', 'b' ] }
      // { id: 'group-id', label: 'group label', idents: {'a' : 'label for a', 'b': 'label for b' ] }
      group,
      // sequence to iterate browsers per ident
      columns: source.columns,
      // browser metadata for table header
      browsers,
    });

    if (!html) {
      skippedGroups.add(group.id);
    }

    return html;
  });

  // generate table document
  const html = _documentTemplate({
    title,
    introduction,
    prismCss: prismCss,
    groups: source.groups.filter(group => !skippedGroups.has(group.id)),
    notes: source.notes.list,
    table: tables.join('\n'),
  });

  fs.writeFileSync(targetFile, html, {encoding: 'utf8'});
};
