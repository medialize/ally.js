/*globals document */
define(function defineSequenceTableBody(require) {
  'use strict';

  var sequenceTableBody = require('./sequence-table-body');

  function addColumnGroups(row, data) {
    var groups = Object.keys(data);
    var map = {};
    groups.forEach(function(key) {
      Array.isArray(data[key]) && data[key].forEach(function(column) {
        map[column] = key;
      });
    });

    if (groups[0] !== '') {
      groups.unshift('');
    }
    groups.forEach(function(key) {
      var colspan = data[key] && data[key].length || 1;
      var previous = row.children[row.children.length -1];
      if (previous && previous.textContent === key) {
        previous.colSpan += colspan;
        return;
      }

      var th = document.createElement('th');
      th.textContent = key;
      th.colSpan = colspan;
      th.setAttribute('data-group', key);
      row.appendChild(th);
    });

    return map;
  }

  function sequenceTable(data, options) {
    if (!options) {
      options = {};
    }

    var columnOrder = options.columns && options.columns.slice(0) || Object.keys(data);
      /*jshint laxbreak: true */
    var columnCallback = typeof options.columnNames === 'function' && options.columnNames || function(th, key) {
      th.textContent = options.columnNames && options.columnNames[key] || key;
    };

    var table = document.createElement('table');
    var thead = document.createElement('thead');
    table.appendChild(thead);
    var row = document.createElement('tr');
    thead.appendChild(row);

    if (options.columnGroups) {
      options.groups = addColumnGroups(row, options.columnGroups);
      row.className = 'groups';
      row = document.createElement('tr');
      thead.appendChild(row);
    }

    columnOrder.unshift('');
    columnOrder.forEach(function(key) {
      var group = options.groups && options.groups[key];
      var th = document.createElement('th');
      th.setAttribute('data-key', key);
      th.setAttribute('data-group', group);
      row.appendChild(th);
      columnCallback(th, key);
    });

    var tbody = sequenceTableBody(data, options);
    table.appendChild(tbody);

    return table;
  }

  return sequenceTable;
});