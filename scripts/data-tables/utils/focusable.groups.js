
const path = require('path');
const file = path.resolve(__dirname, '../../../tests/focusable/data/meta.groups.json');
const source = require(file);

const idents = new Set();
source.forEach(function(group) {
  // add a key to be used for referencing the group in a data-table
  group.id = group.label.replace(/[^a-z0-9]+/ig, '-').toLowerCase();

  // flattened list of idents known to groups
  Object.keys(group.idents).forEach(ident => idents.add(ident));

  // remove entries that are simply irrelevant
  // (but keep them in the idents set so we don't add them to "elements without group" later)
  group.irrelevant && group.irrelevant.forEach(function(ident) {
    delete group.idents[ident];
  });

  // create lookup table for redundant entries
  // basically flipping and merging the entries in group.redundant
  group.duplicate = {};
  Object.keys(group.redundant || {}).forEach(function(targetIdent) {
    group.redundant[targetIdent].forEach(function(sourceIdent) {
      group.duplicate[sourceIdent] = targetIdent;
    });
  });
});

function identsToUnknownGroup(_idents) {
  // create missing group
  const identsWithoutGroup = Array.from(_idents).filter(ident => !idents.has(ident));
  if (!identsWithoutGroup.length) {
    return;
  }

  source.unshift({
    label: 'Elements Without Group',
    idents: identsWithoutGroup,
    id: 'elements-without-group',
    duplicate: [],
  });
}

module.exports = {
  idents,
  list: source,
  handleIdentsWithoutGroup: identsToUnknownGroup,
};
