
const _hasElement = typeof Element !== 'undefined';
const _hasSVGElement = typeof SVGElement !== 'undefined';
const result = _hasElement && _hasSVGElement && (function() {
  return Boolean(SVGElement.prototype.focus && !SVGElement.prototype.focus._polyfill);
})();

export default function() {
  return result;
}
