/*globals document */
define(function defineSequenceTableBody(require) {
  'use strict';

  var mapSequences = require('./map-sequences');

  function defaultTitleCell(th, options) {
    th.textContent = options.sequenceItem;
  }

  function sequenceTableBody(data, options) {
    if (!options) {
      options = {};
    }

    var mapped = mapSequences(data);
    var columnOrder = options && options.columns || Object.keys(data);
    var tbody = document.createElement('tbody');

    mapped.sequence.forEach(function(item, index) {
      var row = document.createElement('tr');
      row.setAttribute('data-item', item);
      tbody.appendChild(row);

      var th = document.createElement('th');
      row.appendChild(th);
      (options.titleCell || defaultTitleCell)(th, {
        sequence: mapped.sequence,
        indexes: mapped.indexes,
        sequenceIndex: index,
        sequenceItem: item,
        data: data,
      });

      var columns = columnOrder.map(function(key) {
        var group = options.groups && options.groups[key] || '';
        var value = mapped.indexes[key][index];
        var td = document.createElement('td');
        td.textContent = value;
        td.setAttribute('data-group', group);
        td.setAttribute('data-key', key);
        td.setAttribute('data-index', value !== null ? value : -1);
        row.appendChild(td);

        options.cell && options.cell(td, {
          sequence: mapped.sequence,
          indexes: mapped.indexes,
          sequenceIndex: index,
          sequenceItem: item,
          data: data,
          dataIndex: value,
          dataKey: key,
        });

        return value;
      });

      options.row && options.row(row, {
        sequence: mapped.sequence,
        indexes: mapped.indexes,
        sequenceIndex: index,
        sequenceItem: item,
        data: data,
        columns: columns,
      });
    });

    return tbody;
  }

  return sequenceTableBody;
});