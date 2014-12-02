require.config({
  paths: {
    a11y: '../../src',
    // shims required by a11y.js
    'array.prototype.findindex': '../../bower_components/array.prototype.findindex/index',
    'CSS.escape': '../../bower_components/CSS.escape/css.escape',
    // stuff used for testing and co
    'underscore': '../../bower_components/underscore/underscore',
    'jquery': '../../bower_components/jquery/dist/jquery',
    'sequence-comparison-table': '../../bower_components/sequence-comparison-table/src',
  }
});

require([
  'underscore',
  'jquery',
  'sequence-comparison-table/sequence-table-body',
  './data/all'
], function (_, $, sequenceTableBody, data) {

  Object.keys(data).forEach(function(browser) {
    data[browser].sequences = [];
    data[browser].events.forEach(function(sequence) {
      var _sequence = sequence.map(function(event) {
        return event.key = event.event + ': ' + event.target + ' (' + event.related + ')';
      });

      data[browser].sequences.push(_sequence);
    });
  });


  function setVersions($versions) {
    // fill in proper versions for each browser column
    $versions.children().each(function() {
      var $cell = $(this);
      var key = $cell.attr('data-column');
      var version = data[key] && data[key].platform && data[key].platform.version;
      if (!version) {
        return;
      }

      $cell
        .text(version.split('.').slice(0, 2).join('.'))
        .attr('title', data[key].platform.ua);
    });
  }

  var $table = $('#event-sequence-table');
  var $versions = $table.find('.versions');
  setVersions($versions);
  
  // flatten and merge first sequence
  var _data = {};
  Object.keys(data).forEach(function(browser) {
    _data[browser] = data[browser].sequences[1];
  });

  var tbody = sequenceTableBody(_data, {
    columns: $versions.children().toArray().slice(1).map(function(element) {
      return element.getAttribute('data-column');
    }),
  });
  
  $table.find('.items').replaceWith(tbody);

});
