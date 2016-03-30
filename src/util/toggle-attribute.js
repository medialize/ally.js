
// helper to turn
//  <div some-attribute="original">
// into
//  <div data-cached-some-attribute="original">
// and back

export default function({element, attribute}) {
  const temporaryAttribute = 'data-cached-' + attribute;
  const temporaryAttributeValue = element.getAttribute(temporaryAttribute);

  if (temporaryAttributeValue === null) {
    const _value = element.getAttribute(attribute);
    if (_value === null) {
      // can't remove what's not there
      return;
    }

    element.setAttribute(temporaryAttribute, _value || '');
    element.removeAttribute(attribute);
  } else {
    const _value = element.getAttribute(temporaryAttribute);
    element.removeAttribute(temporaryAttribute);
    element.setAttribute(attribute, _value);
  }
}
