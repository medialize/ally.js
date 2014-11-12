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

  // TODO: present focusRedirection

  var selectors = _.chain([
    _.chain(data).values().pluck('focusable').value(),
    _.chain(data).values().pluck('focusEvent').value(),
    _.chain(data).values().pluck('noFocusMethod').value(),
    _.chain(data).values().pluck('tabOrder').value(),
    _.chain(data).values().pluck('a11y').filter().pluck('focusable').value(),
    _.chain(data).values().pluck('jquery').filter().pluck('focusable').value(),
  ]).flatten().unique().filter().value();

  var $table = $('#focusable-table');
  var $tbody = $table.find('.items')
  var $versions = $table.find('.versions');
  // prepare template for actual data
  var $row = $versions.clone();
  $row.children().replaceWith(function(index) {
    var $this = $(this);
    return index ? $('<td></td>').prop('className', $this.prop('className')).attr('data-column', $this.attr('data-column')) : this;
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

  setVersions($versions);

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
      var tabbable = data[browser].tabOrder.indexOf(selector) !== -1;
      var event = data[browser].focusEvents.indexOf(selector) !== -1;
      var noFocusMethod = data[browser].noFocusMethod.indexOf(selector) !== -1;

      $cell.text(supported ? 'yes' : 'no')
        .attr('data-supported', supported ? 'yes' : 'no')
        .attr('data-correct', expected === supported ? 'yes' : 'no')
        .attr('data-event', event ? 'yes' : 'no')
        .attr('data-method', !noFocusMethod ? 'yes' : 'no')
        .attr('data-tabbable', tabbable ? 'yes' : 'no');

      var title = [];
      !event && (title.push('No focus event dispatched.'))
      noFocusMethod && (title.push('Element does not know the .focus() method.'))
      !tabbable && (title.push('Not tabbable.'))
      tabbable && (title.push('Tabbable.'))
      $cell.attr('title', title.join('\n'));

      if (noFocusMethod) {
        $cell.text('method!');
      }

    });

    $_row.appendTo($tbody);
  });



  // prepare table that shows support of libraries in given browser
  var $scriptTable = $('#script-focusable-table');
  $scriptTable.empty().append($table.children().clone());
  $scriptTable.find('[data-column="notes"]').remove();
  $scriptTable.find('thead td, thead th').not('.meta').attr('colspan', function() {
    return ($(this).attr('colspan') || 1) * 2;
  }).css('border', '3px solid black');

  var $subline = $scriptTable.find('thead tr').last().clone().appendTo($scriptTable.children('thead'));
  $subline.find('.meta').remove();
  $subline.prepend('<td colspan="2">');
  $subline.find('th').replaceWith(function() {
    return $('<th style="border-left: 3px solid black">Browser</th><th style="border-right: 3px solid black">a11y.js</th>');
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

      // make browser versions distinguishable
      $browserCell.css('border-left', '3px solid black');
      $a11yCell.css('border-right', '3px solid black');
    })
  });



  $table = $('#focus-redirection-table');
  $tbody = $table.find('.items')
  $versions = $table.find('.versions');
  $row = $versions.clone();
  $row.children().replaceWith(function(index) {
    var $this = $(this);
    return index ? $('<td></td>').prop('className', $this.prop('className')).attr('data-column', $this.attr('data-column')) : this;
  });

  setVersions($versions)

  selectors = _.chain(data).values().pluck('focusRedirection').flatten().unique().filter().value();

  // add rows of actual data
  selectors.sort().forEach(function(selector) {
    var $_row = $row.clone().attr('data-selector', selector);
    var $cells = $_row.children('td').not('[data-column="target"]');
    var _selector = selector.split(' --- ');
    $_row.children('th').text(_selector[0]).next().text(_selector[1]);

    $cells.each(function() {
      var $cell = $(this);
      var browser = $cell.attr('data-column');
      var supported = data[browser].focusRedirection.indexOf(selector) !== -1;

      $cell.text(supported ? 'yes' : 'no')
        .attr('data-supported', supported ? 'yes' : 'no');
    });

    $_row.appendTo($tbody);
  });



  $table = $('#tabbable-table');
  $tbody = $table.find('.items')
  $versions = $table.find('.versions');
  $row = $versions.clone();
  $row.children().replaceWith(function(index) {
    var $this = $(this);
    return index ? $('<td></td>').prop('className', $this.prop('className')).attr('data-column', $this.attr('data-column')) : this;
  });

  setVersions($versions)

  selectors = _.chain([
    _.chain(data).values().pluck('focusable').value(),
    _.chain(data).values().pluck('tabOrder').value(),
  ]).flatten().unique().filter().value();


  // add rows of actual data
  selectors.sort().forEach(function(selector) {
    var $_row = $row.clone().attr('data-selector', selector);
    var $cells = $_row.children('td');
    var expectedFocusable = data.expected.focusable.indexOf(selector) !== -1 ? 10 : 0;
    var expectedTabbable = data.expected.tabOrder.indexOf(selector) !== -1 ? 1 : 0;
    var expected = expectedFocusable + expectedTabbable;

    $_row.children('th').text(selector);

    $cells.each(function() {
      var $cell = $(this);
      var browser = $cell.attr('data-column');
      var focusable = data[browser].focusable.indexOf(selector) !== -1;
      var tabbable = data[browser].tabOrder.indexOf(selector) !== -1;
      var supported = (focusable ? 10 : 0) + (tabbable ? 1 : 0);

      $cell.text(tabbable ? 'tabbable' : focusable ? 'focusable' : 'no')
        .attr('data-correct', expected === supported ? 'yes' : 'no')
        .attr('data-focusable', focusable ? 'yes' : 'no')
        .attr('data-tabbable', tabbable ? 'yes' : 'no');

      var title = [];
      !focusable && tabbable && (title.push('Not focusable but tabbable.'))
      $cell.attr('title', title.join('\n'));

    });

    $_row.appendTo($tbody);
  });



  $table = $('#taborder-table');
  $tbody = $table.find('.items')
  $versions = $table.find('.versions');
  $row = $versions.clone();
  $row.children().replaceWith(function(index) {
    var $this = $(this);
    return index ? $('<td></td>').prop('className', $this.prop('className')).attr('data-column', $this.attr('data-column')) : this;
  });

  setVersions($versions)

  function getArrayFoldingIterator(destination) {
    var offset = 0;
    return function(item, index) {
      var target = index + offset;
      var position;
      var _offset;

      if (destination[target] === item) {
        return;
      }

      position = destination.indexOf(item, target);
      _offset = position - target;
      if (position > -1 && _offset < 10) {
        offset += _offset;
        return;
      }

      position =  destination.lastIndexOf(item, target);
      _offset = position - target;
      if (position > -1 && _offset > -10) {
        offset += _offset;
        return;
      }

      destination.splice(index + offset, 0, item);
    };
  }

  function getFoldedArrayIndexMapper(master, list) {
    var offset = 0;
    return function(item, index) {
      var target = index + offset;
      if (item === list[target]) {
        return target;
      }

      var position = list.indexOf(item, target);
      var nextPosition = list.indexOf(master[index + 1], target);

      if (position !== -1) {
        if (nextPosition !== -1 && position > nextPosition) {
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

  selectors = data.expected.tabOrder.slice(0);
  // make HTML the first element of the list (because we splice things in *after* the current item)
  selectors.unshift('HTML');
  // flatten() but maintaining order
  Object.keys(data).forEach(function(browser) {
    data[browser].tabOrder.forEach(getArrayFoldingIterator(selectors));
  });

  // map holes in sequence
  Object.keys(data).forEach(function(browser) {
    var list = data[browser].tabOrder;
    data[browser].interlockedTabOrder = selectors.map(getFoldedArrayIndexMapper(selectors, list));
  });

  // add rows of actual data
  selectors.forEach(function(selector, index) {
    var $_row = $row.clone().attr('data-selector', selector);
    var $cells = $_row.children('td');
    var expected = data.expected.tabOrder.indexOf(selector) !== -1;

    $_row.children('th').text(selector);

    $cells.each(function() {
      var $cell = $(this);
      var browser = $cell.attr('data-column');
      var _index = data[browser].interlockedTabOrder[index];
      var focusable = data[browser].focusable.indexOf(selector) !== -1;

      $cell.text(_index !== null ? _index : '' )
        .attr('data-correct', expected === (_index !== null) ? 'yes' : 'no')
        .attr('data-tabbable', _index !== null  ? 'yes' : 'no')
        .attr('data-focusable', focusable ? 'yes' : 'no');
    });

    $_row.appendTo($tbody);
  });



  $table = $('#script-taborder-table');
  $tbody = $table.find('.items')
  $versions = $table.find('.versions');
  $row = $versions.clone();
  $row.children().replaceWith(function(index) {
    var $this = $(this);
    return index ? $('<td></td>').prop('className', $this.prop('className')).attr('data-column', $this.attr('data-column')) : this;
  });

  $table.find('thead td, thead th').not('.meta').attr('colspan', function() {
    return ($(this).attr('colspan') || 1) * 2;
  }).css('border', '3px solid black');

  $subline = $table.find('thead tr').last().clone().appendTo($table.children('thead'));
  $subline.find('.meta').remove();
  $subline.prepend('<td colspan="1">');
  $subline.find('th').replaceWith(function() {
    return $('<th style="border-left: 3px solid black">Browser</th><th style="border-right: 3px solid black">a11y.js</th>');
  });


  setVersions($versions);

  // flatten() but maintaining order
  Object.keys(data).forEach(function(browser) {
    data[browser].a11y.tabOrder.forEach(getArrayFoldingIterator(selectors));
  });

  // map holes in sequence
  Object.keys(data).forEach(function(browser) {
    var list = data[browser].tabOrder;
    data[browser].interlockedTabOrder = selectors.map(getFoldedArrayIndexMapper(selectors, list));
    var _list = data[browser].a11y.tabOrder;
    data[browser].a11y.interlockedTabOrder = selectors.map(getFoldedArrayIndexMapper(selectors, _list));
  });

  // add rows of actual data
  selectors.forEach(function(selector, index) {
    var $_row = $row.clone().attr('data-selector', selector);
    var $cells = $_row.children('td');
    var expected = data.expected.tabOrder.indexOf(selector) !== -1;

    $_row.children('th').text(selector);

    $cells.each(function() {
      var $cell = $(this);
      var browser = $cell.attr('data-column');
      var _index = data[browser].interlockedTabOrder[index];
      var _aIndex = data[browser].a11y.interlockedTabOrder[index];
      var focusable = data[browser].focusable.indexOf(selector) !== -1;
      var aFocusable = data[browser].a11y.focusable.indexOf(selector) !== -1;

      $cell.text(_index !== null ? _index : '')
         .attr('data-tabbable', _index !== null  ? 'yes' : 'no')
         .attr('data-focusable', focusable ? 'yes' : 'no')
         .css('border-left', '3px solid black');

      $('<td></td>')
        .text(_aIndex !== null ? _aIndex : '')
        .attr('data-tabbable', _aIndex !== null  ? 'yes' : 'no')
        .attr('data-focusable', aFocusable ? 'yes' : 'no')
        .attr('data-correct', _index === _aIndex ? 'yes' : 'no')
        .css('border-right', '3px solid black')
        .insertAfter($cell);
    });

    $_row.appendTo($tbody);
  });

});
