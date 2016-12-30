define([], function() {
  'use strict';

  // to ignore sorting for now, we'll simply use what the core.worker.test requires:
  // because all files are loaded in the same worker,
  // we'll load the ones with the fewest dependencies first,
  // so we don't hit timeouts caused by slow networks or VMs
  var source = {
    event: [
      'active-element',
      'shadow-focus',
    ],
    prototype: [
      'window.customevent',
    ],
    util: [
      'context-to-element',
      'decorate-context',
      'decorate-service',
      'merge-dom-order',
      'node-array',
      'tabindex-value',
      'visible-area',
    ],
    is: [
      'disabled',
      'active-element',
      'focus-relevant',
      'focusable',
      'native-disabled-supported',
      'only-tabbable',
      'shadowed',
      'tabbable',
      'valid-area',
      'valid-tabindex',
      'visible',
    ],
    get: [
      'active-element',
      'active-elements',
      'focus-redirect-target',
      'focus-target',
      'insignificant-branches',
      'parents',
      'shadow-host-parents',
      'shadow-host',
    ],
    element: [
      'blur',
      'disabled',
      'focus',
    ],
    observe: [
      'interaction-type',
      'shadow-mutations',
    ],
    query: [
      'first-tabbable',
      'focusable',
      'shadow-hosts',
      'tabbable',
      'tabsequence.sort-area',
      'tabsequence.sort-tabindex',
      'tabsequence',
    ],
    style: [
      'focus-within',
      'focus-source',
    ],
    when: [
      'focusable',
      'key',
      'visible-area',
    ],
    fix: [
      'pointer-focus-children',
      'pointer-focus-input',
      'pointer-focus-parent',
    ],
    maintain: [
      'disabled',
      'hidden',
      'tab-focus',
    ],
  };

  var internal = {
    prototype: [
      'element.prototype.matches',
      'window.customevent',
    ],
    util: [
      'context-to-element',
      'decorate-context',
      'decorate-service',
      'merge-dom-order',
      'node-array',
      'tabindex-value',
      'visible-area',
    ],
    is: [
      'native-disabled-supported',
    ],
    query: [
      'tabsequence.sort-area',
      'tabsequence.sort-tabindex',
    ],
  };

  function isInternal(namespace, name) {
    return Boolean(internal[namespace] && internal[namespace].indexOf(name) !== -1);
  }

  function map(callback) {
    var list = [];
    Object.keys(source).forEach(function(namespace) {
      source[namespace].forEach(function(name) {
        list.push(callback(namespace, name, isInternal(namespace, name)));
      });
    });

    list.push(callback(null, 'version'));
    list.push(callback(null, 'ally'));

    return list;
  }

  function camelCase(name) {
    return name.replace(/-([a-z])/g, function(m, c) {
      return c.toUpperCase();
    });
  }

  return {
    source: source,
    internal: internal,
    isInternal: isInternal,
    camelCase: camelCase,
    map: map,
  };
});
