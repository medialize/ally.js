require.config({
  paths: {
    a11y: '../../src',
    // shims required by a11y.js
    'array.prototype.findindex': '../../bower_components/array.prototype.findindex/index',
    'CSS.escape': '../../bower_components/CSS.escape/css.escape',
    // stuff used for testing and co
    'underscore': '../../bower_components/underscore/underscore',
    'jquery': '../../bower_components/jquery/dist/jquery',
  }
});

require([
  'underscore',
  'jquery',
  '../js/merge-arrays',
  './data/all'
], function (_, $, mergeArrays, data) {

  var sequences = [];

  Object.keys(data).forEach(function(browser) {
    data[browser].sequences = [];
    data[browser].events.forEach(function(sequence) {
      var _sequence = sequence.map(function(event) {
        return event.key = event.event + ': ' + event.target + ' (' + event.relatedTarget + ')';
      });

      data[browser].sequences.push(_sequence);
    });
  });

  // flatten and merge first sequence
  var sequences = Object.keys(data).map(function(browser) {
    return data[browser].sequences[1];
  });
  var sequence = mergeArrays.apply(null, sequences);

  console.log(sequence);
  console.log(data['firefox-stable'].sequences[1]);
  console.log(data['chrome-stable'].sequences[1]);
  console.log(data['ie-11'].sequences[1]);

});
