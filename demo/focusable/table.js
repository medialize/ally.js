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
  var $versions = $table.find('.versions');
  // prepare template for actual data
  var $row = $versions.clone();
  $row.children().replaceWith(function(index) {
    var $this = $(this);
    return index ? $('<td></td>').prop('className', $this.prop('className')).attr('data-column', $this.attr('data-column')) : this;
  });

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

  // add rows of actual data
  selectors.sort().forEach(function(selector) {
    var $_row = $row.clone().attr('data-selector', selector);
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

  // prepare second table that shows support of libraries in given browser
  var $scriptTable = $('#script-focusable-table');
  $scriptTable.empty().append($table.children().clone());
  $scriptTable.find('[data-column="notes"]').remove();
  $scriptTable.find('thead td, thead th').not('.meta').attr('colspan', function() {
    return ($(this).attr('colspan') || 1) * 3;
  }).css('border', '3px solid black');

  var $subline = $scriptTable.find('thead tr').last().clone().appendTo($scriptTable.children('thead'));
  $subline.find('.meta').remove();
  $subline.prepend('<td colspan="2">');
  $subline.find('th').replaceWith(function() {
    return $('<th style="border-left: 3px solid black">Browser</th><th>a11y.js</th><th style="border-right: 3px solid black">jQuery UI</th>');
  });

  $scriptTable.find('tbody tr').each(function() {
    var $_row = $(this);
    var selector = $_row.attr('data-selector');
    $_row.children('td').not('.meta').each(function() {
      var $browserCell = $(this);
      var browser = $browserCell.attr('data-column');
      var browserSupported = $browserCell.attr('data-supported') === 'yes';
      var a11ySupported = data[browser].a11y.focusable.indexOf(selector) !== -1;
      var jquerySupported = data[browser].jquery.focusable.indexOf(selector) !== -1;

      var $a11yCell = $('<td>?</td>').insertAfter($browserCell)
        .text(a11ySupported ? 'yes' : 'no')
        .attr('data-supported', a11ySupported ? 'yes' : 'no')
        .attr('data-correct', browserSupported === a11ySupported ? 'yes' : 'no');

      var $jqueryCell = $('<td>!</td>').insertAfter($a11yCell)
        .text(jquerySupported ? 'yes' : 'no')
        .attr('data-supported', jquerySupported ? 'yes' : 'no')
        .attr('data-correct', browserSupported === jquerySupported ? 'yes' : 'no');

      // make browser versions distinguishable
      $browserCell.css('border-left', '3px solid black');
      $jqueryCell.css('border-right', '3px solid black');
    })
  });

});
