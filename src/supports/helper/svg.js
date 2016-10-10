
import focusSvgForeignObjectHack from '../../element/focus.svg-foreign-object-hack';

export function generate(element) {
  return '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">'
    + element + '</svg>';
}

export function focus(element) {
  if (element.focus) {
    return;
  }

  try {
    HTMLElement.prototype.focus.call(element);
  } catch (e) {
    focusSvgForeignObjectHack(element);
  }
}

export function validate(element, focusTarget, _document) {
  focus(focusTarget);
  return _document.activeElement === focusTarget;
}
