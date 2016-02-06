
const result = typeof Element !== 'undefined' && (function() {
  return Boolean(SVGElement.prototype.focus && !SVGElement.prototype.focus._polyfill);
})();

export default function() {
  return result;
}
