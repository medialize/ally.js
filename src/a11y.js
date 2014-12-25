define(function defineAlly(require) {
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
    trapFocus: require('./focus/trap'),
    map: {
      keycode: require('./map/keycode'),
    },
  };
});