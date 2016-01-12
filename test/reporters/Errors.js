define([
  'intern/dojo/node!charm',
  'intern/lib/util',
], function(charm, util) {

  function Errors(config) {
    config = config || {};
    this._failedUnits = {};
    this._failedFunctional = {};

    this.charm = charm();
    this.config = config;
  }

  Errors.prototype.testFail = function(test) {
    var p = test.id.split(' - ');
    var _env = p.shift();
    var _section = p.shift();
    var _test = p.join(' - ');
    var _map;

    if (_section === 'unit tests') {
      _map = this._failedUnits;
    } else {
      _map = this._failedFunctional;
    }

    if (!_map[_test]) {
      _map[_test] = {};
    }

    _map[_test][_env] = util.getErrorMessage(test.error);
  };

  Errors.prototype._mapToString = function(map) {
    var lines = [];
    Object.keys(map).forEach(function(_test) {
      var _lines = [];
      var _environments = Object.keys(map[_test]);
      _lines.push('× ' + _test + ' failing in ' + _environments.join(', '));
      _environments.forEach(function(_env) {
        var _error = map[_test][_env];
        _lines.push(_env + ': ' + _error);
      });

      lines.push(_lines.join('\n'));
    });

    return lines.join('\n\n');
  };

  Errors.prototype.runEnd = function() {
    var report = [
      this._mapToString(this._failedUnits),
      this._mapToString(this._failedFunctional),
    ].filter(Boolean).join('\n\n');

    if (!report) {
      return;
    }

    this.output = this.config.output;

    this.charm
      .display('reset')
      .write('\n\nCollected Errors\n')
      .write(report)
      .write('\n\n');

    this.output.end(report);
  };

  return Errors;
});
