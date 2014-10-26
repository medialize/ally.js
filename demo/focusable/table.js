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
  './data/all',
  './data/notes'
], function (_, $, data, notes) {

  var selectors = _.chain(data).values().pluck('focusable').flatten().unique().value();

  var $table = $('#focusable-table');
  var $tbody = $table.find('.items')
  var $row = $table.find('.row').clone();
  $row.children().replaceWith(function(index) {
    return index ? $('<td></td>').attr('data-column', $(this).attr('data-column')) : this;
  });

  selectors.sort().forEach(function(selector) {
    var $_row = $row.clone().attr('data-row', selector);
    var $cells = $_row.children('td').not('[data-column="notes"]');
    var expected = data.expected.focusable.indexOf(selector) !== -1;

    $_row.children('th').text(selector);
    notes[selector] && $_row.children('[data-column="notes"]').html(notes[selector]);

    $cells.each(function() {
      var $cell = $(this);
      var browser = $cell.attr('data-column');
      var supported = data[browser].focusable.indexOf(selector) !== -1;
      $cell.text(supported ? 'yes' : 'no')
        .attr('data-supported', supported ? 'yes' : 'no')
        .attr('data-correct', expected === supported ? 'yes' : 'no');
    });

    $_row.appendTo($tbody);
  });

});
