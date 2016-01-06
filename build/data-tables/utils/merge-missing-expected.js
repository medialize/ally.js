
const expected = require('../../../tests/focusable/data/meta.expected.json');
const data = require('../../../tests/focusable/data/chrome-stable.json');

function findMissingIdents(_expected, _data, target) {
  if (!target) {
    target = {};
  }

  Object.keys(_data.elements).forEach(function(ident) {
    const element = _data.elements[ident];
    if (_expected[ident]) {
      return;
    }

    target[ident] = {
      focusable: Boolean(element.focusable),
      tabbable: Boolean(element.tabbable),
      index: element.tabindexProperty,
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
