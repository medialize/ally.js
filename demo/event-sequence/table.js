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

  function getFoldedArrayIndexMapper(master, list) {
    var offset = 0;
    return function(item, index) {
      var target = index + offset;
      if (item === list[target]) {
        return target;
      }

      var position = list.indexOf(item, target);
      var nextPosition = master.indexOf(list[target + 1], index);

      if (position !== -1) {
        if (nextPosition !== -1) {
          offset--;
          return null;
        }

        offset += position - target;
        return index + offset;
      }

      offset--;
      return null
    };
  }

  var $table = $('#event-sequence-table');
  var $tbody = $table.find('.items')
  var $versions = $table.find('.versions');
  var $row = $versions.clone();
  $row.children().replaceWith(function(index) {
    var $this = $(this);
    return index ? $('<td></td>').prop('className', $this.prop('className')).attr('data-column', $this.attr('data-column')) : this;
  });
  
  setVersions($versions);
  


  // flatten and merge first sequence
  var sequences = Object.keys(data).map(function(browser) {
    return data[browser].sequences[1];
  });
  var sequence = mergeArrays.apply(null, sequences);
  // map holes in sequence
  Object.keys(data).forEach(function(browser) {
    data[browser].interlockedSequences = [];
    var list = data[browser].sequences[1];
    data[browser].interlockedSequences[1] = sequence.map(getFoldedArrayIndexMapper(sequence, list));
  });

  // add rows of actual data
  sequence.forEach(function(event, index) {
    var $_row = $row.clone().attr('data-event', event);
    var $cells = $_row.children('td');
    //var expected = data.expected.tabOrder.indexOf(selector) !== -1;

    $_row.children('th').text(event);

    $cells.each(function() {
      var $cell = $(this);
      var browser = $cell.attr('data-column');
      var _index = data[browser].interlockedSequences[1][index];
      // var focusable = data[browser].focusable.indexOf(selector) !== -1;

      $cell.text(_index !== null ? _index : '' )
      //   .attr('data-correct', expected === (_index !== null) ? 'yes' : 'no')
      //   .attr('data-tabbable', _index !== null  ? 'yes' : 'no')
      //   .attr('data-focusable', focusable ? 'yes' : 'no');
    });

    $_row.appendTo($tbody);
  });
  

});
