
const expected = require('../../../tests/focusable/data/meta.expected.json');
const data = require('../../../tests/focusable/data/chrome-stable.json');

function findMissingIdents(_expected, _data, target) {
  if (!target) {
    target = {};
  }

  Object.keys(_data.tabIndex).forEach(function(ident) {
    if (_expected[ident] || ident.indexOf(' -> ') !== -1) {
      return;
    }

    target[ident] = {
      focusable: _data.focusable.indexOf(ident) !== -1,
      tabbable: _data.tabOrder.indexOf(ident) !== -1,
      index: _data.tabIndex[ident],
    };
  });

  return target;
}

findMissingIdents(expected, data, expected);
const result = {};
Object.keys(expected).sort().forEach(function(ident) {
  result[ident] = expected[ident];
});

/*eslint-disable no-console */
console.log(JSON.stringify(result, null, 2));
/*eslint-enable no-console */
