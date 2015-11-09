
var fs = require('fs');
var path = require('path');

var Handlebars = require('handlebars');
var generateTable = require('./generate-table');

var cwd = process.cwd();
var prismCss = fs.readFileSync(path.resolve(cwd, 'node_modules/prismjs/themes/prism.css'), {encoding: 'utf8'});
var documentTemplate = fs.readFileSync(path.resolve(__dirname, '../templates/document.hbs'), {encoding: 'utf8'});
var _documentTemplate = Handlebars.compile(documentTemplate);

function resolveCellTemplate(cellTemplate) {
  if (!cellTemplate) {
    return null;
  }

  let content = fs.readFileSync(path.resolve(__dirname, '../templates/', cellTemplate), {encoding: 'utf8'});
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
  let _cellTemplate = resolveCellTemplate(cellTemplate);
  let skippedGroups = new Set();
  // generate one table per group to keep things organized
  let tables = source.groups.map(function(group) {
    let html = generateTable({
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
  var html = _documentTemplate({
    title,
    introduction,
    prismCss: prismCss,
    groups: source.groups.filter(group => !skippedGroups.has(group.id)),
    notes: source.notes.list,
    table: tables.join('\n'),
  });

  fs.writeFileSync(targetFile, html, {encoding: 'utf8'});
};
