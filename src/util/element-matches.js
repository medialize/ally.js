
// Element.prototype.matches may be available at a different name
// https://developer.mozilla.org/en/docs/Web/API/Element/matches

const names = ['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector'];
let name = null;

function findMethodName(element) {
  names.some(function(_name) {
    if (!element[_name]) {
      return false;
    }

    name = _name;
    return true;
  });
}

export default function elementMatches(element, selector) {
  if (!name) {
    findMethodName(element);
  }

  return element[name](selector);
}
