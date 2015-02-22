var table = document.querySelector('table');

var browsers = [
  'firefox-mac',
  'firefox-win',
  'chrome-mac',
  'chrome-win',
  'safari-mac',
  'ie11-win',
];
var data = {
  text: {
    'appearance-native.focus-native': 'text input with native appearance and native focus style',
    'appearance-native.focus-custom': 'text input with native appearance and custom focus style',
    'appearance-none.focus-native': 'text input with appearance:none and native focus style',
    'appearance-none.focus-custom': 'text input with appearance:none and custom focus style',
  },
  checkbox: {
    'appearance-native.focus-native': 'checkbox input with native appearance and native focus style',
    'appearance-native.focus-custom': 'checkbox input with native appearance and custom focus style',
    'appearance-custom.focus-native': 'checkbox input with custom appearance and native focus style',
    'appearance-custom.focus-custom': 'checkbox input with custom appearance and custom focus style',
  },
  radio: {
    'appearance-native.focus-native': 'radio input with native appearance and native focus style',
    'appearance-native.focus-custom': 'radio input with native appearance and custom focus style',
    'appearance-custom.focus-native': 'radio input with custom appearance and native focus style',
    'appearance-custom.focus-custom': 'radio input with custom appearance and custom focus style',
  },
  button: {
    'appearance-native.focus-native': 'button with native appearance and native focus style',
    'appearance-native.focus-custom': 'button with native appearance and custom focus style',
    'appearance-none.focus-native': 'button with appearance:none and native focus style',
    'appearance-none.focus-custom': 'button with appearance:none and native custom style',
    'appearance-custom.focus-native': 'button with custom appearance and native focus style',
    'appearance-custom.focus-custom': 'button with custom appearance and native custom style',
  },
  textarea: {
    'appearance-native.focus-native': 'textarea with native appearance and native focus style',
    'appearance-native.focus-custom': 'textarea with native appearance and custom focus style',
    'appearance-none.focus-native': 'textarea with appearance:none and native focus style',
    'appearance-none.focus-custom': 'textarea with appearance:none and custom focus style',
    'appearance-custom.focus-native': 'textarea with custom appearance and native focus style',
    'appearance-custom.focus-custom': 'textarea with custom appearance and custom focus style',
  },
  link: {
    'appearance-native.focus-native': 'link with native focus style',
    'appearance-native.focus-custom': 'link with custom focus style',
  },
  div: {
    'appearance-native.focus-native': 'div with native focus style',
    'appearance-native.focus-custom': 'div with custom focus style',
  },
};

Object.keys(data).forEach(function(key) {
  var tbody = document.createElement('tbody');
  tbody.id = key;

  Object.keys(data[key]).forEach(function(style) {
    var row = document.createElement('tr');
    row.id = key + '/' + style;
    tbody.appendChild(row);

    var title = document.createElement('th');
    title.textContent = data[key][style];
    row.appendChild(title);

    browsers.forEach(function(browser) {
      var base = browser + '/' + key + '/' + style;

      var cell = document.createElement('td');
      cell.id = base;
      cell.className = browser.replace('-', ' ');
      row.appendChild(cell);

      var normal = document.createElement('img');
      normal.src = base + '.normal.png';
      normal.className = 'normal';
      cell.appendChild(normal);

      var focus = document.createElement('img');
      focus.src = base + '.focus.png';
      focus.className = 'focus';
      cell.appendChild(focus);
    });
  });

  table.appendChild(tbody);
});