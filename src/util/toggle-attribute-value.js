
// helper to turn
//  <div some-attribute="original">
// into
//  <div some-attribute="new" data-cached-some-attribute="original">
// and back

export default function({element, attribute, temporaryValue, saveValue}) {
  const temporaryAttribute = 'data-cached-' + attribute;

  if (temporaryValue !== undefined) {
    const _value = saveValue || element.getAttribute(attribute);
    element.setAttribute(temporaryAttribute, _value || '');
    element.setAttribute(attribute, temporaryValue);
  } else {
    const _value = element.getAttribute(temporaryAttribute);
    element.removeAttribute(temporaryAttribute);
    if (_value === '') {
      element.removeAttribute(attribute);
    } else {
      element.setAttribute(attribute, _value);
    }
  }
}
