require.config({
  paths: {
    ally: '../../src',
    // shims required by ally.js
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
  'sequence-comparison-table/sequence-table',
  './data/all'
], function (_, $, sequenceTable, data) {

  var eventMap = {};
  var numberOfSequences = 0;
  Object.keys(data).forEach(function(browser) {
    data[browser].sequences = [];
    numberOfSequences = Math.max(data[browser].events.length, numberOfSequences);
    data[browser].events.forEach(function(sequence) {
      var _sequence = sequence.map(function(event) {
        var key = event.key = event.event + ': ' + event.target + ' (' + event.related + ')';
        eventMap[key] = event;
        return key;
      });

      data[browser].sequences.push(_sequence);
    });
  });

  var sequenceTableOptions = {
    columns: [
      'expected',
      'firefox-stable',
      'ie-10',
      'ie-11',
      'ie-12',
      'chrome-stable',
      'safari-6_2',
      'safari-iphone',
    ],
    columnNames: function(th, key) {
      if (key === '') {
        th.textContent = 'Element';

        var from = document.createElement('th');
        from.textContent = 'target';
        th.parentNode.appendChild(from);

        var to = document.createElement('th');
        to.textContent = 'related';
        th.parentNode.appendChild(to);
        return;
      }

      if (!data[key] || !data[key].platform) {
        th.textContent = key;
        return;
      }

      var version =  data[key].platform.version && data[key].platform.version.split('.').slice(0, 2).join('.') || key;
      th.textContent = version;
      th.title = data[key].platform.ua;
    },
    columnGroups: {
      '': ['', '', '', 'expected'],
      'Firefox': ['firefox-stable'],
      'Internet Explorer': ['ie-10', 'ie-11', 'ie-12'],
      'Chrome': ['chrome-stable'],
      'Safari': ['safari-6_2', 'safari-iphone'],
    },
    titleCell: function(th, options) {
      var event = eventMap[options.sequenceItem];
      th.textContent = event.event;

      var from = document.createElement('th');
      from.textContent = event.target;
      th.parentNode.appendChild(from);

      var to = document.createElement('th');
      to.textContent = event.related;
      th.parentNode.appendChild(to);
    }
  };

  function renderSequenceTable(sequenceIndex) {
    // flatten and merge first sequence
    var _data = {};
    Object.keys(data).forEach(function(browser) {
      _data[browser] = data[browser].sequences[sequenceIndex] || [];
    });

    var table = sequenceTable(_data, sequenceTableOptions);
    $(document.body).append(table);
  }

  for (var i = 0; i < numberOfSequences; i++) {
    renderSequenceTable(i);
  }
});
