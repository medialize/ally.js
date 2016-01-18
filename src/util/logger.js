
const noop = function() {};
const _console = {
  log: noop,
  debug: noop,
  info: noop,
  warn: noop,
  error: noop,
};

export default typeof console !== 'undefined' ? console : _console;
