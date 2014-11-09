define(function defineA11y(require) {
  'use strict';

  return {
    query: {
      focusable: require('./dom/query-focusable'),
      tabbable: require('./dom/query-tabbable'),
    },
    is: {
      focusable: require('./dom/is-focusable'),
      tabbable: require('./dom/is-tabbable'),
    },
    containFocus: require('./focus/contain'),
    map: {
      keycode: require('./map/keycode'),
    },
  };
});